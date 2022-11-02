import React from 'react'
import {useEffect, useState} from 'react'
import LineChart from '../components/Chart/LineChart';
import './Visualize.css'
import TempData from '../components/Chart/Temp';
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Visualize() {

    const [dataset, setDataset] = useState([])

    useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-nvrgb/endpoint/get_testdata')
          .then(response => response.json())
          .then(data => setDataset(data));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

    useEffect(() => {
      
      const fetchPrices = async () => {
        const res = await fetch("https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-nvrgb/endpoint/get_testdata")
        const data = await res.json()

        const datex = data.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = data.map(function(elem) {
          return elem.hum
        })

        const lastdate = datex[datex.length -1]

        setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5));
 
        console.log(lastdate)
 
 
        var filteredData = data.filter(function(a){
            var aDate = new Date(a.date);
            return aDate >= lastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.hum
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "% of Humidity",
              data: fixhum,
              backgroundColor: [
                "#FF0000",
              ],
              borderWidth: 1,
              showLine: false
            }
          ]
        });
      };
      fetchPrices()
    }, []);
  
       
    
    const handleClickTemp = () => {
      
        const datex = dataset.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = dataset.map(function(elem) {
          return elem.hum
        })

        const lastdate = datex[datex.length -1]

        setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5));
 
        console.log(lastdate)
 
 
        var filteredData = dataset.filter(function(a){
            var aDate = new Date(a.date);
            return aDate >= lastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.temp
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "°C of Temperature",
              data: fixhum,
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
            max:30,
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
    }})
  };


    const handleClickHum = () => {
     
        const datex = dataset.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = dataset.map(function(elem) {
          return elem.hum
        })

        const lastdate = datex[datex.length -1]

        setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5));
 
        console.log(lastdate)
 
 
        var filteredData = dataset.filter(function(a){
            var aDate = new Date(a.date);
            return aDate >= lastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.hum
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "% of Humidity",
              data: fixhum,
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
          grid:{
            display:false
          },
            ticks:{
                maxTicksLimit: 5.1
            }
        }
    }})
  };
      

    const handleClickWind = () => {

        const datex = dataset.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = dataset.map(function(elem) {
          return elem.hum
        })

        const lastdate = datex[datex.length -1]

        setLastDate(lastdate.setDate(datex[datex.length-1].getDate() - 5));
 
        console.log(lastdate)
 
 
        var filteredData = dataset.filter(function(a){
            var aDate = new Date(a.date);
            return aDate >= lastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.wind
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "km/s of Wind Speed",
              data: fixhum,
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
            max:25,
            ticks : {
                callback: function(value, index, ticks) {
                    return  value + 'km/s';
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
    }})
  };
      
    

    const handleClickFiltTemp = () => {

        const datex = dataset.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = dataset.map(function(elem) {
          return elem.hum
        })

        const lastdate = datePicker;
        const blastdate = new Date(datePicker);

        blastdate.setDate(datePicker.getDate() - 5)

        console.log(blastdate)
 
        var filteredData = dataset.filter(function(a){
            var aDate = new Date(a.date);
            return aDate <= lastdate && aDate >= blastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.temp
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "°C of Temperature",
              data: fixhum,
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
            max:30,
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
    }})
  };
      

    const handleClickFiltHum = () => {
      
        const datex = dataset.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = dataset.map(function(elem) {
          return elem.hum
        })

        const lastdate = datePicker;
        const blastdate = new Date(datePicker);

        blastdate.setDate(datePicker.getDate() - 5)

        console.log(blastdate)
 
        var filteredData = dataset.filter(function(a){
            var aDate = new Date(a.date);
            return aDate <= lastdate && aDate >= blastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.hum
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "% of Humidity",
              data: fixhum,
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
            grid:{
              display:false
            },
            ticks:{
                maxTicksLimit: 5.1
            }
        }
    }})
  };
      

    const handleClickFiltWind = () => {
     
        const datex = dataset.map(function(elem) {
          return new Date(elem.date)
        })

        const humid = dataset.map(function(elem) {
          return elem.hum
        })

        const lastdate = datePicker;
        const blastdate = new Date(datePicker);

        blastdate.setDate(datePicker.getDate() - 5)

        console.log(blastdate)
 
        var filteredData = dataset.filter(function(a){
            var aDate = new Date(a.date);
            return aDate <= lastdate && aDate >= blastdate;
        });

        const fixdate = filteredData.map(function(elem) {
          return new Date(elem.date).toISOString()
        })

        const fixhum = filteredData.map(function(elem){
          return elem.wind
        })

        setUserData({
          labels: fixdate,
          datasets: [
            {
              label: "km/s of Wind Speed",
              data: fixhum,
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
            max:30,
            ticks : {
                callback: function(value, index, ticks) {
                    return  value + 'km/s';
            }  
        }
        },
        x: {
            ticks:{
                maxTicksLimit: 5.1
            }
        }
    }})
  };
     
    const [chartState, setChartState] = useState('');
    const [lastDate, setLastDate] = useState();
    const [datePicker, setDatePicker] = useState('2006-04-20');
    const [datedef, setDatedef] = useState('2006-04-30');
    const [dropdown, setDropdown] = useState();
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


  const onChangeChart = (e) => {

    setDatePicker(new Date(e.target.value));
    setDatedef(e.target.values)
    if (chartState == "humid") {
      handleClickFiltHum();
    }
    else if (chartState == "temp") {
      handleClickFiltTemp();
    }
    else {
      handleClickFiltWind();
    }
  }
console.log(chartState)

  const onClickHum= (e) => {
    setDatedef('2006-04-30')
    handleClickHum();
    setChartState('humid')
  }

  const onClickTemp= (e) => {
    setDatedef('2006-04-30')
    handleClickTemp();
    setChartState('temp')
  }

  const onClickWind= (e) => {
    setDatedef('2006-04-30')
    handleClickWind();
    setChartState('wind')
  }
  
  return (
    <>
    <div className='container'>
    <Link to='/dashboard'>
          <button className='btn-back'>Back</button>
    </Link>
    <div className='container-chart'>Visualize
      <div className='chart'>
        <LineChart chartData={userData} chartOption={optionData} />
      </div>
      <div className='button-chart'>
      <input type="date" className='enddate' value="2022-10-31"></input>
      <button className='btn-humid'onClick={onClickHum} >Humidity</button>
      <button className='btn-temp' onClick={onClickTemp}>Temp</button>
      <button className='btn-wind' onClick={onClickWind}>Wind</button> 
      <Dropdown  className="d-inline mx-2">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {dropdown}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item key='1' onClick={(e) => {setDropdown("1")}}>1
        </Dropdown.Item>  
        <Dropdown.Item key='2' onClick={(e) => {setDropdown("2")}}>2
        </Dropdown.Item>
        <Dropdown.Item key='3' onClick={(e) => {setDropdown("3")}}>3
        </Dropdown.Item>  
        <Dropdown.Item key='4' onClick={(e) => {setDropdown("4")}}>4
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      </div>
      
    </div>
    </div>
    
    
    </>
    
  )
}

export default Visualize