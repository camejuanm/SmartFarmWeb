import React, { useState, useEffect } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/landing_page";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Reset from "./components/reset";
import Navbar from "./components/Navbar";
// import Re5et from "./components/re5et";
// import passwordRequirement from "./components/passwordRequirement";
import Dashboard from"./pages/Dashboard"
import Gateway from"./pages/Gateway"
import Token from"./pages/Token"
import AddUser from"./pages/AddUser"
import Visualize from"./pages/Visualize"
import "./components/reset.css"
import Testfetch from './pages/Testfetch';
// import Navigation from "./navbar/Navigation"

function App() {
  // const [isLogin, SetIsLogin] = useState(false);

  // useEffect(() => {
  //   let token = localStorage.getItem('token');
  //   if (token) {
  //     SetIsLogin(true);
  //   } else {
  //     SetIsLogin(false);
  //   }
  // }, []);

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   SetIsLogin(false)
  // };

  return (
    <>
      <Router>
        
        {/* <div className="App"> */}
      
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path='/gateway' element={<Gateway/>}/>
          <Route path='/token' element={<Token/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route exact path="/home" element={<LandingPage />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/reset" element={<Reset />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/sign-in' element={<Login />} />
        </Routes>
        {/* <div className="auth-alternate"> */}
          <Routes>
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route path='/visualize' element={<Visualize/>}/>
            <Route path='/testfetch' element={<Testfetch/>}/>
          </Routes>
          {/* <div className="auth-wrapper">
            <div className="auth-inner"> */}
              <Routes>
                <Route path='/navbar' element={<Navbar/>}/>
                {/* <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/home" element={<LandingPage />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/reset" element={<Reset />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/sign-up' element={<SignUp />} />
                <Route exact path='/sign-in' element={<Login />} />
                <Route path='/visualize' element={<Visualize/>}/>
                <Route path='/navbar' element={<Navbar/>}/> */}
              </Routes>
            {/* </div>
          </div>
        </div> */}
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
