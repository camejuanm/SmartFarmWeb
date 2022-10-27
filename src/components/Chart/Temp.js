import React from "react";
import { useState, useEffect} from 'react';

function TempData() {
    useEffect(() => {
        const fetchTemp = async () => {
          const res = await fetch("https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-nvrgb/endpoint/get_testdata")
          const data = await res.json()

          const datex = data.map(function(elem) {
            return new Date(elem.date)
          })

          const lastdate = datex[datex.length -1]
 
          lastdate.setDate(datex[datex.length-1].getDate() - 5);
   
          console.log(lastdate)
   
   
          var filteredData = data.filter(function(a){
              var aDate = new Date(a.date);
              return aDate >= lastdate;
          });

          const fixdate = filteredData.map(function(elem) {
            return new Date(elem.date).toISOString()
          })

          const fixtemp = filteredData.map(function(elem){
            return elem.temp
          })
          console.log(fixtemp)
  
        };
        fetchTemp()
      }, []);

    }

    export default TempData;