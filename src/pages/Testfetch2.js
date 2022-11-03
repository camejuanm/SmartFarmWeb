import React from 'react'
import { useState, useEffect } from 'react';
import LineChart from '../components/Chart/LineChart';
import './Visualize.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Testfetch2() {
  
  //status
  let token = window.localStorage.getItem("token");
  const [datasets, setDatasets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [chartstatus, setChartStatus] = useState('airhum');
  const [nodestate, setNodeState] = useState(102);
  const [lastDate, setLastDate] = useState();
  const [datedef, setDatedef] = useState();
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

   
}, [] )

useEffect(() =>{
    var datex = datasets.map(function(elem) {
        return new Date(elem.timestamp)
    })
    setLastDate(datex[datex.length -1])
    console.log(datex)
    chartData();
}, [datasets])
// useEffect(() => {
// console.log
// setLastDate(new Date(datasets[datasets.length -1].timestamp))
// }, [datasets])

useEffect(() => {
    chartData();
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [nodestate, chartstatus, lastDate]);


    const chartData = () => {

      const datex = datasets.map(function(elem) {
        return new Date(elem.timestamp)
      })
        var filteredData = datasets.filter(function(a){
            var aDate = new Date(a.timestamp);
            var aNode = a.idNode
            return aDate <= lastDate && aNode == nodestate;
        });

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
                ticks:{
                    maxTicksLimit: 5.1
                }
            }
        }});

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
                ticks:{
                    maxTicksLimit: 5.1
                }
            }
        }});
        }
    }

    //Click & OnChange function
    const airHumClick = () => {
      setChartStatus('airhum');
      chartData();
    }

    const airTempClick = () => {
      setChartStatus('airtemp'); 
      chartData();
    }

    const onChangeChart = (e) => {

      setLastDate(new Date(e.target.value));
      setDatedef(e.target.values);
      chartData();
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
        <button onClick={chartData}></button>

        <Dropdown>
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

export default Testfetch2