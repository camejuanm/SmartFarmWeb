import React, { useState, useEffect, useMemo } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/landing_page";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Reset from "./components/reset";
import Forgot from "./components/forgot";
import Navbar from "./components/Navbar";
import Navigation from "./navbar/Navigation";
import Login1 from './navbar/Login';
import Dashboard from "./pages/Dashboard"
import Gateway from "./pages/Gateway"
import Token from "./pages/Token"
import AddUser from "./pages/AddUser"
import Visualize from "./pages/Visualize"
import "./components/Authentication.css"
import Testfetch from './pages/Testfetch';

function App() {
  const [isLogin, SetIsLogin] = useState(null);
  const value = useMemo(() => ({ isLogin, SetIsLogin }), [isLogin, SetIsLogin]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    SetIsLogin(false)
  };

  return (
    <>
      <Router>
        <Navbar></Navbar>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/home" element={<LandingPage />} />
              <Route exact path='/sign-up' element={<SignUp />} />
              <Route exact path='/sign-in' element={<Login />} />
              <Route path='/gateway' element={<Gateway/>}/>
              <Route path='/token' element={<Token/>}/>
              <Route path='/adduser' element={<AddUser/>}/>
              <Route exact path="/home" element={<LandingPage />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/visualize' element={<Visualize/>}/>
              <Route path='/testfetch' element={<Testfetch/>}/>
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/visualize' element={<Visualize/>}/>
              <Route path='/testfetch' element={<Testfetch/>}/>
            </Routes>
      </Router>
    </>
  );
}

export default App;
