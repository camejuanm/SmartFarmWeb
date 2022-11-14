import React from 'react'
import { useState, useEffect } from 'react';
import LineChart from '../components/Chart/LineChart';
import './Visualize.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chartjs-plugin-annotation';

function Testfetch2() {
  
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
  const [dateEditor, setDateEditor] = useState(false);
  
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

  // const [annotationData, setAnnotationData] = useState()

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
      const backgroundcolor = []
      for (let i = 0; i < fHum.length; i++ ) {
        if(fHum[i] >= 55) {backgroundcolor.push('red')}
        else if (fHum[i] < 70 && fHum[i] > 45) {backgroundcolor.push('black')}
        else {backgroundcolor.push('green')}
      }

      if (chartstatus == 'airhum') {

        for (let i = 0; i < fHum.length; i++ ) {
          if(fHum[i] >= 55) {backgroundcolor.push('red')}
          else if (fHum[i] < 70 && fHum[i] > 45) {backgroundcolor.push('black')}
          else {backgroundcolor.push('green')}
        }

        setUserData({
          labels: fDate,
          datasets: [
            {
              label: "% of Humidity",
              data: fHum,
              backgroundColor: backgroundcolor,
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
                // type: 'time', // menampilkan grafik perjam
                // time: {
                //   displayFormats: {hour: 'DD HH:mm'}
                // },
              grid:{
                display:false
              },
                ticks:{
                    maxTicksLimit: 5.4  
                    // maxTicksLimit: 6  
                    // source: 'labels' //pake kalo data udah rapi
                }
            }
          },
          plugins :{
            annotation: {
              annotations: [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y',
                value: 70,
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  enabled: false,
                  content: 'Test label'
                }
              },{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y',
                value: 40,
                borderColor: 'green',
                borderWidth: 2,
                label: {
                  enabled: false,
                  content: 'Test label'
                }
              },
              {
                type: 'label',
                xValue: 210,
                yValue: 75,
                content: ['Maximum Threshold'],
                color: 'red',
                font: {
                  size: 12

                }
              },
              {
                type: 'label',
                xValue: 210,
                yValue: 35,
                content: ['Minimum Threshold'],
                color: 'green',
                font: {
                  size: 12

                }
              }]
          }
          
          }
    });

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
      console.log(blastDate)
      setDateEditor(true)
    }

    // data harian max dan min
    const buttonDailyMax = () => {
      const maxdata = []
      const mindata = []
      const daily = []
      const maxtime= []
      const mintime = []

      const date1 = new Date(blastDate)
      date1.setDate(date1.getDate() + 1)
      date1.setHours(0,0,0,0)
      console.log(date1)
      const date2 = new Date(blastDate)
      const dateadd = new Date(blastDate)
      console.log(dateadd)
      date2.setHours(0,0,0,0)

      if(dateEditor == true) {
        var dayzero = 5
      } else {
        var dayzero = 3
      }
      console.log(dayzero)
      

      for(let i = 0 ; i < 5; i++) {
        
        var datelast = new Date()
        datelast.setDate(date1.getDate() - dayzero)
        datelast.setHours(0,0,0,0)
        
        var datefirst = new Date()
        var dateadds = new Date()

        datefirst.setDate(date2.getDate() - dayzero)
        dateadds.setDate(dateadd.getDate() - dayzero)
        datefirst.setHours(0,0,0,0)
        
        daily.push(dateadds.toDateString())
        console.log(datefirst)
        console.log(datelast)
        var max = datasets.filter((a) => {
          var aDate = new Date(a.timestamp);
          var aNode = a.idNode
          return aDate <= datelast && aDate >= datefirst;
        })


        const datamax = max.map((e) => {
          return e.airHum
        })
        
        
        console.log(Math.max(...datamax))
        const maxdatax = Math.max(...datamax)
        console.log(maxdatax)
        console.log(max)

        maxdata.push(Math.max(...datamax))
        mindata.push(Math.min(...datamax))
        
        const datey = max.filter((e) => {
          return e.airHum === Math.max(...datamax)
        })  
        const datem = max.filter((e) => {
          return e.airHum === Math.min(...datamax)
        })  

        console.log(datey)
        maxtime.push(datey.map((e) => {
          return new Date(e.timestamp).getHours()
        }))

        mintime.push(datey.map((e) => {
          return new Date(e.timestamp).getHours()
        }))

        dayzero = dayzero - 1 

      }
      console.log(maxdata)
      console.log(mindata)
      console.log(daily)
      console.log(maxtime)
      console.log(mintime)
      
      // const titleTooltip = () => {
      //   let sum = [''];
      //   timestamps.forEach(month => {
      //     sum.push(month);
      //   });    
      //   return sum;
      // }


      setUserData({
        labels: daily,
        datasets: [
          {
            label: "Max % of Humidity",
            data: maxdata,
            backgroundColor: [
              "purple",
            ],
            borderWidth: 1,
            showLine: false
          },
          // {
          //   label: "Time",
          //   data: timestamps,
          //   backgroundColor: [
          //     "purple",
          //   ],
          //   borderWidth: 1,
          //   showLine: false
          // },
          {
            label: "Minimum % of Humidity",
            data: mindata,
            backgroundColor: [
              "green",
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
              // type: 'time', // menampilkan grafik perjam
              // time: {
              //   displayFormats: {hour: 'DD HH:mm'}
              // },
            grid:{
              display:false
            },
              ticks:{
                  maxTicksLimit: 5.4  
                  // maxTicksLimit: 6  
                  // source: 'labels' //pake kalo data udah rapi
              }
          }
        },
        plugins :{
          tooltip: {

            callbacks: {
              title: ((tooltipItem) => {

                  // menentukan isi tooltip berdasarkan dari index datasets
                  if (tooltipItem[0].datasetIndex === 0) { 
                    return`${tooltipItem[0].label} ${maxtime[tooltipItem[0].dataIndex]}.00`; //mereturn label dan juga waktu jam dari max value
                  }
                  if (tooltipItem[0].datasetIndex === 1) {
                    return`${tooltipItem[0].label} ${mintime[tooltipItem[0].dataIndex]}.00`;
                  }
                  
                
                
               
              })
      }
    },
          annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y',
              value: 70,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            },{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y',
              value: 40,
              borderColor: 'yellow',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            }]
        }
        
        }
  });
    }

    const onChangeHandler = event => {
      setNodeState(event.target.value);
   };


  return (
    <>
    <div className='container-chart'>Visualize
      <div className='chart'>
        <LineChart chartData={userData} chartOption={optionData}/>
      </div>
      <div className='button-chart'>
        <input onChange={onChangeChart} type="date" className='enddate' value={datedef}></input>
        <button className='btn-humid'onClick={airHumClick} >Humidity</button>
        <button className='btn-temp' onClick={airTempClick}>Temp</button>
        <button className='btn-maxmindaily' onClick={buttonDailyMax}>Daily</button>
        <input type="text" name="name" onChange={onChangeHandler} value={nodestate} style={{width: "60px"}}/>
        {/* <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {dropdown}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item key='102' onClick={() => {setNodeState(102);setDropdown('102');}}>102
        </Dropdown.Item>  
        <Dropdown.Item key='202' onClick={() => {setNodeState(202);setDropdown('202');}}>202
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      </div> 
    </div>
    </>
  )
}

export default Testfetch2