import React from 'react'
import { useState, useEffect } from 'react';
import LineChart from '../components/Chart/LineChart';
import './Visualize.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Testfetch() {
  
  //status
  let token = window.sessionStorage.getItem("token")
  const [datasets, setDatasets] = useState([])
  const [filtered, setFiltered] = useState([])
  const [chartstatus, setChartStatus] = useState('airhum')
  const [nodestate, setNodeState] = useState(1);
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
        // GET request using fetch inside useEffect React hook
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

      setFiltered(datasets.filter(Nonull))

      
    

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

   useEffect(() => {

    const fetchPrices = async () => {
      const res = await fetch('https://smart-farm-backend.vercel.app/api/data-logs', {
        method:"GET",
        headers: {
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2U5ZjU2ZTFiMDczY2Y0OGQ5ZjgxYyIsImlhdCI6MTY2NjgzODIxMywiZXhwIjoxNjY2OTI0NjEzfQ.6PwgceAoNqCPoWv5pZl526tEjNMV6puX3QpnPCH8CUQ' , 
        'Content-Type':'application/json'}
    })
      const data = await res.json()


    const datex = filtered.map(function(elem) {
      return new Date(elem.timestamp)
    })

    const lastdate = datex[datex.length -1]

    setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5))


      var filteredData = filtered.filter(function(a){
          var aDate = new Date(a.timestamp);
          var aNode = a.idNode
          return aDate >= lastdate && aNode == nodestate;
      });

      const fDate = filteredData.map(function(elem) {
        return new Date(elem.timestamp).toISOString()
      })

      const fHum = filteredData.map(function(elem) {
        return elem.airHum
      })

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

  }})

    // useEffect(() => {
    //   const datex = filtered.map(function(elem) {
    //     return new Date(elem.timestamp)
    //   })

    //   const airHum = filtered.map(function(elem) {
    //     return elem.airHum
    //   })

    //   const airTemp = filtered.map(function(elem) {
    //     return elem.airTemp
    //   })

    //   const soilHum = filtered.map(function(elem) {
    //     return elem.soilHum
    //   })
    //   setDataDate(datex)
    //   setAirHum(airHum)
    //   setairTemp(airTemp)
    //   setSoilHum(soilHum)
    // }, [])
    
    const setdefaultlastdate = () => {

      setFiltered(datasets.filter(Nonull))

        function Nonull(datasets) {
        return datasets.airTemp != null && datasets.airHum != null
      }
      console.log(filtered)


        var filteredData = filtered.filter(function(a){
          var aNode = a.idNode;
          return aNode == nodestate;
        })

        const datex = filteredData.map(function(elem) {
          return new Date(elem.timestamp)
        })

      // console.log(filteredData)

      const lastdate = datex[datex.length -1];

      setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5));

      console.log(lastDate)
    }
   

   


    const chartData = () => {

      const datex = filtered.map(function(elem) {
        return new Date(elem.timestamp)
      })

      // const lastdate = datex[datex.length -1]

      // setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5));
 
      // console.log(lastdate)
 
 
     
  
        var filteredData = filtered.filter(function(a){
            var aDate = new Date(a.timestamp);
            var aNode = a.idNode
            return aDate >= lastDate && aNode == nodestate;
        });

        const fDate = filteredData.map(function(elem) {
          return new Date(elem.timestamp)
        })

        const fHum = filteredData.map(function(elem) {
          return elem.airHum
        })
        const fTemp = filteredData.map(function(elem) {
        return elem.airTemp
        })

        // console.log(filteredData)

        if (chartstatus == 'airhum') {
          setfData(fHum)

          setUserData({
            labels: fDate,
            datasets: [
              {
                label: "% of Humidity",
                data: fData,
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
          setfData(fTemp)
          

        
          setUserData({
            labels: fDate,
            datasets: [
              {
                label: "°C of Temperature",
                data: fData,
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


        console.log(fData)

      

    }

    const humchart = () => {

      const datex = filtered.map(function(elem) {
        return new Date(elem.timestamp)
      })

      const lastdate = datex[datex.length -1]

      lastdate.setDate(datex[datex.length-1].getDate() - 5)


        var filteredData = filtered.filter(function(a){
            var aDate = new Date(a.timestamp);
            var aNode = a.idNode
            return aDate >= lastdate && aNode == nodestate;
        });

        const fDate = filteredData.map(function(elem) {
          return new Date(elem.timestamp).toISOString()
        })

        const fHum = filteredData.map(function(elem) {
          return elem.airHum
        })

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

      
 
      
 
 
     
      const tempchart = () => {
        const datex = filtered.map(function(elem) {
          return new Date(elem.timestamp);
        })

        const lastdate = datex[datex.length -1]

      lastdate.setDate(datex[datex.length-1].getDate() - 5);
      
        var filteredData = filtered.filter(function(a){
            var aDate = new Date(a.timestamp);
            var aNode = a.idNode
            return aDate >= lastdate && aNode == nodestate;
        });

        const fDate = filteredData.map(function(elem) {
          return new Date(elem.timestamp).toISOString()
        })

        const fTemp = filteredData.map(function(elem) {
          return elem.airTemp
        })

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
              max:50,
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

    //Click & OnChange function
    const airHumClick = () => {
      setdefaultlastdate();
      setChartStatus('airhum');
      chartData();
    }

    const airTempClick = () => {
      setdefaultlastdate();
      setChartStatus('airtemp'); 
      chartData();
    }

    const onChangeChart = (e) => {

      setLastDate(new Date(e.target.value));
      setDatedef(e.target.values);
      chartData();
    }
    
    const changenode1 = () => {
      setNodeState(1)
      
      if(chartstatus=='airhum') {
        airHumClick();
      }
      else {
        airTempClick();
      }
    }

    const changenode2 = () => {
      setNodeState(2)
      
      if(chartstatus=='airhum') {
        airHumClick();
      }
      else {
        airTempClick();
      }
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
        <Dropdown.Item key='1' onClick={() => {changenode1();setDropdown('1');}}>1
        </Dropdown.Item>  
        <Dropdown.Item key='2' onClick={() => {changenode2();setDropdown('2');}}>2
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div> 
    </div>
    </>
  )
}

export default Testfetch