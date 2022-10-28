import React from 'react'
import './Dashboard.css'
import {Link} from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import { projectdata } from '../components/ProjectData'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [dropdown, setDropdown] = useState('Choose Project');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(); 
  const [pic, setPic] = useState();
  const handleChange = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    const filePreview = URL.createObjectURL(selectedFile)
    setPreview(filePreview)
  }

 
  return (
    <>
    {/* <Navbar></Navbar> */}
    <div className='dashboard'>
      <div className='project-picker'>
      <img src={pic} className='foto'/>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {dropdown}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        {projectdata.map((item,index) => {
      return (
        <Dropdown.Item key={index} onClick={() => {setDropdown(item.name);setPic(item.url);}}>
          {item.name}
        </Dropdown.Item>
        )
      }
       )}
        </Dropdown.Menu>
      </Dropdown>
      </div>
    
    {file && <img src={preview} alt={file.name} style={{width: "400px"}}/>}
    <div className='fileinput'>
    <input type="file" name="file" onChange={(e) => handleChange(e)}/>
    </div>
    <Link to='/visualize'>
    <button className='btn-viz' onClick=''>Visualize</button>
    </Link>
    {/* <Link to='/'>
    <button className='btn-viz' onClick={logout}>Visualize</button>
    </Link> */}
    </div>
    </>
  );
 
}

export default Dashboard