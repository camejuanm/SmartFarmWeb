import React, { useState, useEffect, useMemo } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/landing_page";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import Profile from "./pages/profile";
import Reset from "./components/reset";
import Forgot from "./components/forgot";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Dashboard from "./pages/Dashboard"
import Gateway from "./pages/Gateway"
import Token from "./pages/Token"
import AddUser from "./pages/AddUser"
import UserVerification from "./components/userVerification";
import Visualize from "./pages/Visualize"
import Testfetch from './pages/Testfetch';
import Testfetch2 from './pages/Testfetch2';
import Page1 from './pages/page1';

import PrivateRoutes from './utils/PrivateRoutes';
import PrivateRoutesAdmin from './utils/PrivateRoutesAdmin';

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route element={<PrivateRoutes  />}>
            <Route path="/profile" element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/visualize' element={<Testfetch2/>}/>
            <Route path='/page1' element={<Page1/>}/>
            {/* <Route path='/testfetch' element={<Testfetch/>}/>
            <Route path='/testfetch2' element={<Testfetch2 />} /> */}
            <Route element={<PrivateRoutesAdmin/>}>
              <Route path='/gateway' element={<Gateway/>}/>
              <Route path='/token' element={<Token/>}/>
              <Route path='/adduser' element={<AddUser/>}/>
              <Route path="/userverification" element={<UserVerification />} />
            </Route>
          </Route>
          <Route exact path="/" element={<LandingPage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
