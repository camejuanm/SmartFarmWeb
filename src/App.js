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
import Testfetch2 from './pages/Testfetch2';
import Testfetch3 from './pages/Testfetch3';

import PrivateRoutes from './utils/PrivateRoutes';
import PrivateRoutesAdmin from './utils/PrivateRoutesAdmin';
import NavbarAlt from './components/NavbarAlt';
// import Navigation from "./navbar/Navigation"

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route element={<PrivateRoutes  />}>
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/visualize' element={<Visualize/>}/>
            <Route path='/testfetch' element={<Testfetch2/>}/>
            <Route path='/testfetch3' element={<Testfetch3/>}/>
            <Route element={<PrivateRoutesAdmin/>}>
              <Route path='/gateway' element={<Gateway/>}/>
              <Route path='/token' element={<Token/>}/>
              <Route path='/adduser' element={<AddUser/>}/>
            </Route>
          </Route>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/reset" element={<Reset />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
