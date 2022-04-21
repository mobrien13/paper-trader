
import React, { useState, useEffect } from 'react';
const currentTime =  Date.now() -  86400000 - (3600000 * 3)

useEffect(() => {
    setInterval(() => {
      fetch("https://api.tdameritrade.com/v1/marketdata/"+this.props.ticker+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=day&period=1&frequency=1&needExtendedHoursData=false")
          .then(res => res.json())
          .then(
            (data) => {
              var dps1 = [], dps2 = [];
  
  
              for (var i = 0; i < data.candles.length; i++) {
                if(new Date(data.candles[i].datetime) < currentTime){
                  dps1.push({
                    x: new Date(data.candles[i].datetime),
                    y: [
                      Number(data.candles[i].open),
                      Number(data.candles[i].high),
                      Number(data.candles[i].low),
                      Number(data.candles[i].close)
                    ]
                  });
      
                  dps2.push({x: new Date(data.candles[i].datetime), y: Number(data.candles[i].close)});
                }
                
              }
  
              this.setState({
                isLoaded: true,
                dataPoints1: dps1,
                dataPoints2: dps2,
                
              });
            }
          )
    }, 10000);
  }, []);