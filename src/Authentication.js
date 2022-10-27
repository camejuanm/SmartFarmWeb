import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Data.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Navbar from './components/Navbar'
import Dashboard from"./pages/Dashboard"
import Gateway from"./pages/Gateway"
import Token from"./pages/Token"
import AddUser from"./pages/AddUser"
import Visualize from"./pages/Visualize"

function Authentication() {
  return (
    <Router>
      <div className="Authentication">
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/gateway' element={<Gateway/>}/>
          <Route path='/token' element={<Token/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route path='/visualize' element={<Visualize/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default Authentication;