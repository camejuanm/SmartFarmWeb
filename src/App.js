import React, { useState, useEffect, useMemo } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/landing_page";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Reset from "./components/reset";
import Navbar from "./components/Navbar";
import Navigation from "./navbar/Navigation";
import Login1 from './navbar/Login';
import Dashboard from "./pages/Dashboard"
import Gateway from "./pages/Gateway"
import Token from "./pages/Token"
import AddUser from "./pages/AddUser"
import Visualize from "./pages/Visualize"
import "./components/reset.css"
import Testfetch from './pages/Testfetch';
import UserContext from './UserContext';
// import Index from './isLogin/index';
// import About from './isLogin/about';

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
    {/* <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <UserContext.Provider value={value}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/dashbaord" exact component={Dashboard} />
        </UserContext.Provider>
      </div>
    </Router> */}
      <Router>
        <Navbar></Navbar>
        {/* {isLogin ? (
            <Login1 />
          ) : (
            <Navigation />
          )} */}
          <>
          {/* <UserContext.Provider value={value}>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashbaord" exact component={Dashboard} /> */}
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
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/visualize' element={<Visualize/>}/>
              <Route path='/testfetch' element={<Testfetch/>}/>
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/visualize' element={<Visualize/>}/>
              <Route path='/testfetch' element={<Testfetch/>}/>
              <Route path='/userContext' element={<UserContext/>}/>
              {/* <Route path='/index' element={<Index/>}/>
              <Route path='/about' element={<About/>}/> */}
            </Routes>
          {/* </UserContext.Provider> */}
          </>
      </Router>
    </>
  );
}

export default App;
