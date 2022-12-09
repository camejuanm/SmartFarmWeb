import React from 'react'
import { useState, useEffect, useRef } from 'react';
import LineChart from '../components/Chart/LineChart';
import './Visualize.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';

function Testfetch2() {
  
  //status
  let token = window.sessionStorage.getItem("token");
  const [datasets, setDatasets] = useState([]);
  const [dailyswitch, setDailySwitch] = useState('Daily');
  const [filtered, setFiltered] = useState([]);
  const [chartstatus, setChartStatus] = useState('airhum');
  const [charttype, setChartType] = useState('normal');
  const [nodestate, setNodeState] = useState(102);
  const [lastDate, setLastDate] = useState();
  const [blastDate, setblastDate] = useState(null);
  const [datedef, setDatedef] = useState();
  const [datePicker, setDatePicker] = useState();
  const [dropdown, setDropdown] = useState();
  const [dateEditor, setDateEditor] = useState(false);
  const [chartchange, setChartChange] = useState('Change to Max & Min Chart');
  
  //datastate
  const [fDate, setfDate] = useState([]);
  const [fData, setfData] = useState([]);
  //data
  const [dataDate, setDataDate] = useState([])
  const [dataairhum, setAirHum] = useState([])
  const [dataairtemp, setairTemp] = useState([])
  const [datasoilhum, setSoilHum] = useState([])


  const nodelist = [
    {node : 102},
    {node : 202},
    {node : 103},
    {node : 203},
    {node : 104},
    {node : 204},
    {node : 105},
    {node : 205}
  ]
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

      var datenow = 0;
      if (lastdate.getDate() > 9) {
        datenow = lastdate.getFullYear() + "-" + (lastdate.getMonth()+1) + "-" + lastdate.getDate();
      }
      else {
        datenow = lastdate.getFullYear() + "-" + (lastdate.getMonth()+1) + "-0" + lastdate.getDate();
      }

      setDatedef(datenow);
      console.log(datenow);
      console.log(lastdate);
  }, [datasets])


  // Render the ChartData function when nodestate, chartstatus, lastDate, blastDate is change
  useEffect(() => {
      chartData();
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [nodestate, chartstatus, lastDate, blastDate, charttype]);


  useEffect(() => {
    console.log(datedef)
  }, [datedef])
  // Function to set the Chart Value with some parameter






  const chartData = () => {
    
    var titlechart = '';
    var chartlabel = '';
    var maxthres = 0;
    var minthres = 0;
    var fData = [];
    var maxyaxes = 0;
    var symbol = '';

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
   
      

      // const fDate = filteredData.map(function(elem) {
      //   const times = new Date(elem.timestamp).toString()
      //   const first = times.substr(0,10)
      //   const second = times.substr(11,5)
      //   return first + " " + second
      // })

      // const fDate = filteredData.map(function(elem) {
      //   return new Date(elem.timestamp).toString().substr(4,17);
      // })

      const fDate = filteredData.map(function(elem) {
        return new Date(elem.timestamp).toISOString();
      })
    

    
      const fHum = filteredData.map(function(elem) {
          return elem.airHum
          })

      const fTemp = filteredData.map(function(elem) {
          return elem.airTemp
          })

        const fSoil = filteredData.map(function(elem) {
          return elem.soilHum
          })

      
      
      if (charttype === 'normal') {
// console.log(filteredData)
const backgroundcolor = []

  titlechart = 'Daily Data Between ' + new Date(lastDate).toDateString().substr(4,12) + ' - ' + new Date(blastDate).toDateString().substr(4,12)

if (chartstatus == 'airhum') {

  maxthres = 55
  minthres = 30

  maxyaxes = 80

  chartlabel = "% of Air Humidity"
  symbol ="%"

  fData = filteredData.map(function(elem) {
    return elem.airHum
    })

}

else if (chartstatus == 'airtemp') {

  maxthres = 30
  minthres = 20
  
  maxyaxes = 50

  chartlabel = "°C of Temperature"
  symbol = "°C"

  fData = filteredData.map(function(elem) {
    return elem.airTemp
    })

 
}

else if (chartstatus == 'soilhum') {

  maxthres = 35
  minthres = 10

  maxyaxes = 50

  chartlabel = "% of Soil Humidity"
  symbol = "%"

  fData = filteredData.map(function(elem) {
    return elem.soilHum
    })

}

for (let i = 0; i < fData.length; i++ ) {
  if(fData[i] > maxthres) {backgroundcolor.push('red')}
  else if (fData[i] <= maxthres && fData[i] >= minthres) {backgroundcolor.push('black')}
  else {backgroundcolor.push('red')}
}

setUserData({
  labels: fDate,
  datasets: [
    {
      label: chartlabel,
      data: fData,
      borderDash: [],
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
        max: maxyaxes,
        ticks : {
            callback: function(value, index, ticks) {
                return  value + symbol;
        }  
    }
    },
    x: {
      bounds: 'ticks',
      offset: true,
      type: 'time',
          time: {
              unit: 'day',  
          },
      // grid:{
      //   display:false
      // },  
        
          ticks: {
            callback: function(value, index, ticks) {
              return value + ', 12 AM';
          }
            // maxTicksLimit: 5.1
          },
          adapters: {
              date: {
                  zone: 'UTC+7'
              }
          }
    },
    // x2: {
    //   offset: true,
    //   position: 'top',
    //   type: 'time',
    //   time: {
    //     unit: 'day'
    //   },
    //   adapters: {
    //     date: {
    //         zone: 'UTC+7'
    //     }
    //   },
    //   grid:{
    //       tickColor: 'black',
    //       borderColor: 'black',
    //       tickLength: 10
    //     },
        
    //     ticks:{
          
    //       // maxTicksLimit: 5.4  
    //      source: 'labels'
    //       // source: 'labels' //pake kalo data udah rapi
    //   },
      
    //   gridLines: {
    //     offsetGridLines : true
    // }
    // }
  },
  plugins :{
    title: {
      display:true,
      text: titlechart
    },
    annotation: {
      annotations: [
        {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y',
        value: maxthres,
        borderColor: 'red',
        borderWidth: 2,
        // label: {
        //   enabled: false,
        //   content: 'Test label'
        // }
      },{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y',
        value: minthres,
        borderColor: 'green',
        borderWidth: 2,
        // label: {
        //   enabled: false,
        //   content: 'Test label'
        // }
      },
      // {
      //   type: 'label',
      //   xValue: 12  ,
      //   yValue: maxthres + 5,
      //   content: ['Maximum Threshold'],
      //   color: 'red',
      //   font: {
      //     size: 12

      //   }
      // },
      // {
      //   type: 'label',
      //   xValue: 12,
      //   yValue: minthres - 5,
      //   content: ['Minimum Threshold'],
      //   color: 'green',
      //   font: {
      //     size: 12
      //   }
      // }
    ]
  }
  
  }
});
      }
    else if (charttype === 'daily') {
      buttonDailyMax()
    }
      
      
  }

  const buttonDailyMax = () => {

    // data yang nantinya akan dipakai
    const maxdata = []
    const mindata = []
    const daily = []
    const maxtime= []
    const mintime = []

    // data date yang diambil dari blastDate
    const date1 = new Date(blastDate)
    date1.setDate(date1.getDate() + 1)
    date1.setHours(0,0,0,0)
    console.log(date1)
    const date2 = new Date(blastDate)
    console.log(date2)
    const dateadd = new Date(blastDate)
    console.log(dateadd)
    date2.setHours(0,0,0,0)

    const date3 = new Date(blastDate)
    date3.setHours(0,0,0,0)

    // karena data blastDate ditambahkan satu harus ada konfigurasi
    if(dateEditor == true) {
      var dayzero = 5
    } else {
      var dayzero = 3
    }
    // var dayzero = 5;
    

    // looping untuk melakukan push pada data2 yang diperlukan
    for(let i = 0 ; i < 5; i++) {
      var datefirst = new Date();
      var dateadds = new Date();
      var datelast = new Date();

      datelast.setDate(date1.getDate() - dayzero)
      datelast.setMonth(date1.getMonth())
      datelast.setHours(0,0,0,0)

      datefirst.setDate(date2.getDate() - dayzero)
      datefirst.setMonth(date2.getMonth())
      datefirst.setHours(0,0,0,0)
      dateadds.setDate(dateadd.getDate() - dayzero)
      dateadds.setMonth(dateadd.getMonth())
      
      
      daily.push(dateadds.toDateString())
      
      console.log(datelast)
      console.log(datefirst)
      console.log(dayzero)


      var maxmin = datasets.filter((a) => {
        var aDate = new Date(a.timestamp);
        var aNode = a.idNode
        return aDate <= datelast && aDate >= datefirst && aNode == nodestate;
      })

      if (chartstatus === 'airhum') {
        const dataairHum = maxmin.map((e) => {
          return e.airHum
        })

        const maxdatax = Math.max(...dataairHum)

        maxdata.push(Math.max(...dataairHum))
        mindata.push(Math.min(...dataairHum))

        const datey = maxmin.filter((e) => {
          return e.airHum === Math.max(...dataairHum)
        })  

        const datem = maxmin.filter((e) => {
          return e.airHum === Math.min(...dataairHum)
        })  

        maxtime.push(datey.slice(0, 1).map((e) => {
          return new Date(e.timestamp).getHours()
        }))

        mintime.push(datem.slice(0, 1).map((e) => {
          return new Date(e.timestamp).getHours()
        }))

      }
      else if (chartstatus === 'airtemp') {
        const dataairTemp = maxmin.map((e) => {
          return e.airTemp
        })

        const maxdatax = Math.max(...dataairTemp)

        maxdata.push(Math.max(...dataairTemp))
        mindata.push(Math.min(...dataairTemp))

        const datey = maxmin.filter((e) => {
          return e.airTemp === Math.max(...dataairTemp)
        })  

        const datem = maxmin.filter((e) => {
          return e.airTemp === Math.min(...dataairTemp)
        })  

        maxtime.push(datey.slice(0, 1).map((e) => {
          return new Date(e.timestamp).getHours()
        }))

        mintime.push(datem.slice(0, 1).map((e) => {
          return new Date(e.timestamp).getHours()
        }))
        
      }
      else if (chartstatus === 'soilhum') {
        const datasoilHum= maxmin.map((e) => {
          return e.soilHum
        })

        const maxdatax = Math.max(...datasoilHum)

        maxdata.push(Math.max(...datasoilHum))
        mindata.push(Math.min(...datasoilHum))

        const datey = maxmin.filter((e) => {
          return e.soilHum === Math.max(...datasoilHum)
        })  

        const datem = maxmin.filter((e) => {
          return e.soilHum === Math.min(...datasoilHum)
        })  

        maxtime.push(datey.slice(0, 1).map((e) => {
          return new Date(e.timestamp).getHours() 
        }))

        mintime.push(datem.slice(0, 1).map((e) => {
          return new Date(e.timestamp).getHours() 
        }))
        
      }
      
      dayzero = dayzero - 1 

    }
    console.log(maxdata)
    console.log(mindata)
    console.log(daily)
    console.log(maxtime)
    console.log(mintime)

    var maxthres = 0;
    var minthres = 0;
    var maxdaily = 0;
    var labeldailymax = '';
    var labeldailymin = '';
    var symbol = '';
    var titlechart = 'Maximum & Minimum Data Between ' + new Date(lastDate).toDateString().substr(4,12) + ' - ' + new Date(blastDate).toDateString().substr(4,12)


    if (chartstatus=='airhum') {
      maxthres = 55
      minthres = 30
      maxdaily = 80
      symbol = "%"
      labeldailymax = "Max % of Air Humidity"
      labeldailymin = "Min % of Air Humidity"
    }
    else if (chartstatus =='airtemp') {
      maxthres = 30
      minthres = 20
      maxdaily = 50
      symbol = "°C"
      labeldailymax = "Max °C of Air Temperature"
      labeldailymin = "Min °C of Air Temperature"
    }
    else if (chartstatus =='soilhum') {
      maxthres = 35
      minthres = 10
      maxdaily = 50
      symbol = "%"
      labeldailymax = "Max % of Soil Humidity"
      labeldailymin = "Min % of Soil Humidity"
    }


    setUserData({
      labels: daily,
      datasets: [
        {
          label: labeldailymax,
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
          label: labeldailymin,
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
            max:maxdaily,
            ticks : {
                callback: function(value, index, ticks) {
                    return  value + symbol;
            }  
        }
        },
        x: {
          offset: true,
            // type: 'time', // menampilkan grafik perjam
            // time: {
            //   displayFormats: {hour: 'DD HH:mm'}
            // },
            // offset: true,
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

                // menentukan isi tooltip berdasarkan dari index datasets (problem : array lebih dari satu)
                if (tooltipItem[0].datasetIndex === 0) { 
                  return`${tooltipItem[0].label} ${maxtime[tooltipItem[0].dataIndex]}.00`; //mereturn label dan juga waktu jam dari max value
                }
                if (tooltipItem[0].datasetIndex === 1) {
                  return`${tooltipItem[0].label} ${mintime[tooltipItem[0].dataIndex]}.00`;
                }
                
              
              
             
            })
    }
  },
        title: {
          display:true,
          text: titlechart
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y',
            value: maxthres,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: false,
              content: 'Test label'
            }
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y',
            value: minthres,
            borderColor: 'green',
            borderWidth: 2,
            label: {
              enabled: false,
              content: 'Test label'
            }
          },
          {
            type: 'label',
            xValue: 4,
            yValue: maxthres + 5,
            content: ['Maximum Threshold'],
            color: 'red',
            font: {
              size: 12
      
            }
          },
          {
            type: 'label',
            xValue: 4,
            yValue: minthres - 5,
            content: ['Minimum Threshold'],
            color: 'green',
            font: {
              size: 12
      
            }
          }
        ]
      }
      
      }
});
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

    const soilHumClick = () => {
      setChartStatus('soilhum'); 
      chartData();
    }

    //set the blastDate and lastDate with the date picker
    const onChangeChart = (e) => {
      console.log(new Date(e.target.value))
      setDatedef(e.target.values)
      const lastdate = new Date(e.target.value)
      const blastDate = new Date(e.target.value)
      lastdate.setDate(lastdate.getDate() + 1)
      setblastDate(lastdate.setHours(0,0,0,0))
      console.log(lastdate)
      setLastDate(blastDate.setDate(lastdate.getDate() - 5));
      console.log(blastDate)
      setDateEditor(true)
    }

    // data harian max dan min
    

    const onChangeHandler = event => {
      setNodeState(event.target.value);
   };

   const test = useRef(null)
   const charttypebutton = (event) => {
    if (charttype === 'normal') {
        setChartType('daily');
        event.target.style.backgroundColor = 'red';
        setChartChange('Change to Daily Data Chart')
    }
    else if (charttype === 'daily') {
      setChartType('normal')
      event.target.style.backgroundColor = 'blue';
      setChartChange('Change to Min & Max Chart')
    }
    
   }

  return (
    <>
    <div className='chart-page'>
      <div className='container-chart'>
        <div className='chart'>
          <LineChart chartData={userData} chartOption={optionData}/>
        </div>
        <div className='button-chart'>
          <div>
          <input onChange={onChangeChart} type="date" className='enddate' value={datedef}></input>
          <button className='btn-temp' onClick={airTempClick}>Air Temperature</button>
          <button className='btn-humid'onClick={airHumClick} >Air Humidity</button>
          <button className='btn-soil' onClick={soilHumClick}>Soil Humidity</button>
          <div className='node-input'>
          {nodelist.map((item, index) => {
                        return (
                            <button className='input-node' key={index} value={item.node} onClick={onChangeHandler}>{item.node} </button>
                        )
                    })}
          {/* <input className='input-node' type="text" name="name" onChange={onChangeHandler} value={nodestate} /> */}

          </div>
          
          <button className='btn-maxmindaily' onClick={charttypebutton}>{chartchange}</button>
          </div>
          
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
    </div>
    
    </>
  )
}

export default Testfetch2