import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

 //https://canvasjs.com/data/gallery/jquery/samsung-electronics-stock-price.json
 
 //https://api.tdameritrade.com/v1/marketdata/`${props.ticker}`/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=2&frequencyType=daily&needExtendedHoursData=false
 
class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false };
  }
}

/*var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://yfapi.net/v1/finance/trending/US',
  params: {modules: 'defaultKeyStatistics,assetProfile'},
  headers: {
    'x-api-key': 'PLqDQn3va62W9uCxdBpx1a5eQpJxc9NCatyBeWcW'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});*/
