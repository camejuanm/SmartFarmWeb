import React from 'react'
import { useState, useEffect } from 'react';
import LineChart from '../components/Chart/LineChart';
import './Visualize.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chartjs-adapter-luxon';

function Testfetch3() {
  
  //status
  let token = window.localStorage.getItem("token");
  const [datasets, setDatasets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [chartstatus, setChartStatus] = useState('airhum');
  const [nodestate, setNodeState] = useState(102);
  const [lastDate, setLastDate] = useState();
  const [blastDate, setblastDate] = useState(null);
  const [datedef, setDatedef] = useState(new Date());
  const [datePicker, setDatePicker] = useState();
  const [dropdown, setDropdown] = useState();
  
  //datastate
  const [fDate, setfDate] = useState([]);
  const [fData, setfData] = useState([]);
  //data
  const [dataDate, setDataDate] = useState([])
  const [dataairhum, setAirHum] = useState([])
  const [dataairtemp, setairTemp] = useState([])
  const [datasoilhum, setSoilHum] = useState([])

  //chart setup
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)"
        ],
        borderWidth: 10,
        showLine: false
      }
    ]
  }, 
  );

  const [optionData, setOptionData] = useState({
    scales: {
      y: {
          beginAtZero: true,
          max:100,
          ticks : {
              callback: function(value, index, ticks) {
                  return  value + '%';
          }  
      }
      },
      x: {
          grid:{
            display:false
          },
          ticks:{
              maxTicksLimit: 5.1
          }
      }
  }
  })

  // FETCH Data 
  useEffect(() => {
      
      fetch('https://smart-farm-backend.vercel.app/api/data-logs', {
              method:"GET",
              headers: {
              'x-access-token': token, 
              'Content-Type':'application/json'}
          })
              .then(response => response.json())
              .then(data => setDatasets( data.filter((data) => {
                  return data.airHum != null && data.airTemp != null;
                } )));
  }, [])

  // Set lastDate and blastDate after datasets is set
  useEffect(() =>{

    console.log(datasets)
      var datex = datasets.map(function(elem) {
          return new Date(elem.timestamp)
      })
      let lastdate = new Date(datex[datex.length -1])
      let blastdate = new Date(datex[datex.length -1])
      console.log(lastdate)
      setblastDate(lastdate)
      setLastDate(blastdate.setDate(blastdate.getDate() - 5))
      console.log(lastdate)
  }, [datasets])


  // Render the ChartData function when nodestate, chartstatus, lastDate, blastDate is change
  useEffect(() => {
      chartData();
      console.log(lastDate)
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [nodestate, chartstatus, lastDate, blastDate]);


  useEffect(() => {
    console.log(datedef)
  }, [datedef])
  // Function to set the Chart Value with some parameter
  const chartData = () => {

    const datex = datasets.map(function(elem) {
      return new Date(elem.timestamp)
    })
    
      var filteredData = datasets.filter(function(a){
        var aDate = new Date(a.timestamp);
        var aNode = a.idNode
        return aDate <= blastDate && aDate >= lastDate  && aNode == nodestate;
    });
    console.log(new Date(blastDate))
    console.log(new Date(lastDate))
    console.log(filteredData)
    
      

      const fDate = filteredData.map(function(elem) {
        return new Date(elem.timestamp).toISOString()
      })

    
      const fHum = filteredData.map(function(elem) {
          return elem.airHum
          })

      const fTemp = filteredData.map(function(elem) {
          return elem.airTemp
          })
      
      // console.log(filteredData)

      if (chartstatus == 'airhum') {
        
        setUserData({
          labels: fDate,
          datasets: [
            {
              label: "% of Humidity",
              data: fHum,
              backgroundColor: [
                "#FF0000",
              ],
              borderWidth: 1,
              showLine: false
            }
          ]
        });

        setOptionData({
          scales: {
          y: {
              beginAtZero: true,
              max:100,
              ticks : {
                  callback: function(value, index, ticks) {
                      return  value + '%';
              }  
          }
          },
          x: {
            type: 'time',
            time: {
                displayFormats: {hour: 'HH:mm'}
            }
          },
          x2: {
            position: 'top',
            type: 'time',
            time: {
              unit: 'day'
            },
            grid:{
                tickColor: 'black',
                borderColor: 'black',
                tickLength: 15
              }
          },
          
          },
          plugins: {
            tooltip: {
                    displayColors: false
            }
          }
      }
     );

      }
      
      else if (chartstatus == 'airtemp') {
        setUserData({
          labels: fDate,
          datasets: [
            {
              label: "°C of Temperature",
              data: fTemp,
              backgroundColor: [
                "#FF0000",
              ],
              borderWidth: 1,
              showLine: false
            }
          ]
        });

        setOptionData({
          scales: {
          y: {
              beginAtZero: true,
              max:100,
              ticks : {
                  callback: function(value, index, ticks) {
                      return  value + '°C';
              }  
          }
          },
          x: {
            grid:{
              display:false
            },
              ticks:{
                  maxTicksLimit: 5.1
              }
          }
      }});
      }
  }

    //Handle click to change the chartstatus
    const airHumClick = () => {
      setChartStatus('airhum');
      chartData();
    }

    const airTempClick = () => {
      setChartStatus('airtemp'); 
      chartData();
    }

    //set the blastDate and lastDate with the date picker
    const onChangeChart = (e) => {
      setDatedef(e.target.values)
      const lastdate = new Date(e.target.value)
      const blastDate = new Date(e.target.value)
      setblastDate(lastdate.setDate(lastdate.getDate() + 1))
      console.log(lastdate)
      setLastDate(blastDate.setDate(lastdate.getDate() - 5));
    }

  return (
    <>
    <div className='container-chart'>Visualize
      <div className='chart'>
        <LineChart chartData={userData} chartOption={optionData} />
      </div>
      <div className='button-chart'>
        <input onChange={onChangeChart} type="date" className='enddate' value={datedef}></input>
        <button className='btn-humid'onClick={airHumClick} >Humidity</button>
        <button className='btn-temp' onClick={airTempClick}>Temp</button>
        <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {dropdown}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item key='1' onClick={() => {setNodeState(102);setDropdown('1');}}>1
        </Dropdown.Item>  
        <Dropdown.Item key='2' onClick={() => {setNodeState(202);setDropdown('2');}}>2
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div> 
    </div>
    </>
  )
}

export default Testfetch3