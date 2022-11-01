import React from 'react'
import './Dashboard.css'
import {Link} from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import { projectdata } from '../components/ProjectData'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import PrivateRoutes from '../utils/PrivateRoutes';
import { data } from 'autoprefixer';

function Dashboard() {
  
  let token = window.localStorage.getItem("token");
  const [airHums, setAirHum] = useState();
  const [airTemps, setAirTemp] = useState();
  const [datax, setDatax] = useState();
  const [datasets, setDatasets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dropdown, setDropdown] = useState('Choose Project');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(); 
  const [pic, setPic] = useState();
  const [node, setNode] = useState(1);
  const handleChange = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    const filePreview = URL.createObjectURL(selectedFile)
    setPreview(filePreview)
  }

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    const fetchData =  async () => {

      fetch('https://smart-farm-backend.vercel.app/api/data-logs', {
        method:"GET",
        headers: {
        'x-access-token': token, 
        'Content-Type':'application/json'}
    })
        .then(response => response.json())
        .then(data => setDatasets(data));
        
        

    function Nonull(datasets) {
    return datasets.airTemp != null && datasets.airHum != null
  }

  setFiltered(datasets.filter(Nonull));

  setDatax(filtered[filtered.length - 1])
  setAirHum(datax.airHum);
  setAirTemp(Math.round(datax.airTemp, 2));

}
fetchData();
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
  

 
  return (
    <>
    <div className='dashboard'>
      <div className='cards'>
      
          <div className="nav-card">
                  <h1>{airHums}</h1>
                  <span>Air Humidity</span>
          </div>

          <div className='nav-card'>
              <h1>{airTemps}</h1>
            <span>Air Temperature</span>
          </div>

          <div className='nav-card'>
            
            <span>Soil Humidity</span>
          </div>
      
      </div>
      <div className='img-all'>
      <div className='project-picker'>
      <div className='image-container'>
      <img src={pic} className='foto' style={{width: "600px"}} useMap="#node-map"/>
      <map id="node-map" name='node-map'>
        <area shape='circle'
              coords='90,130,30'
             /> 
      </map>
      {file && <img src={preview} alt={file.name} style={{width: "400px"}}/>}
      </div>
      
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
    
    <div className='fileinput'>
    <input type="file" name="file" onChange={(e) => handleChange(e)}/>
    </div>
    <Link to='/visualize'>
    <button className='btn-viz' onClick=''>Visualize</button>
    </Link>
      </div>
      
    {/* <Link to='/'>
    <button className='btn-viz' onClick={logout}>Visualize</button>
    </Link> */}
    </div>
    </>
  );
 
}

export default Dashboard