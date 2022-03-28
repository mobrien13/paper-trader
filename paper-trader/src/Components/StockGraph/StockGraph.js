import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 //https://canvasjs.com/data/gallery/jquery/samsung-electronics-stock-price.json
 
 //https://api.tdameritrade.com/v1/marketdata/`${props.ticker}`/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=2&frequencyType=daily&needExtendedHoursData=false
 
class StockGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false };
  }
 
  componentDidMount() {

    fetch("https://api.tdameritrade.com/v1/marketdata/"+this.props.ticker+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=2&frequencyType=daily&needExtendedHoursData=false")
      .then(res => res.json())
      .then(
        (data) => {
          var dps1 = [], dps2 = [];


          for (var i = 0; i < data.candles.length; i++) {
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

          


          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
          });
        }
      )
  }
 
  render() {
    const options = {
      theme: "light1",
      
      title:{
        text: `${ this.props.title }`,
        fontFamily: 'Arial',
        fontColor: '#484a4d'
      },
      animationEnabled: "True",
      animationDuration: 1300,
      //backgroundColor: "#707C8F",
     

      charts: [{
        
        axisX: {
          lineThickness: 3,
          tickLength: 0,
          labelFormatter: function(e) {
            return "";
          },
        
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function(e) {
              return "";
            }
          }
        },
        axisY: {
          lineThickness: 3,
          title: "Price USD",
          prefix: "$",
          tickLength: 0
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        
        
        data: [{
          borderColor:"black",
          fallingColor: "#DD7E86",
          risingColor:"#33FF4C",
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints : this.state.dataPoints1
        }]
      }],
     
      
      navigator: {
        //backgroundColor: "#707C8F",
        data: [{
          lineColor:"#707C8F",
          fillOpacity: .3,
          dataPoints: this.state.dataPoints2
        }],
        slider: {
          // Need to set max to curret date and min to 1 month ago 
          //minimum: new Date("2018-01-01"),
          //maximum: new Date("2018-12-31")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "60vh",
      margin: "auto",
     
    };
    return (
      <div> 
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
              /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}
export default StockGraph;  