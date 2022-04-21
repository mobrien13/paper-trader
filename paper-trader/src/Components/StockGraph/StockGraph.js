import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class StockGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false};
  }
  
  componentDidMount() {
      fetch("https://api.tdameritrade.com/v1/marketdata/"+this.props.ticker+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=3&frequencyType=daily&frequency=1&needExtendedHoursData=false")
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

  
  componentDidUpdate(prevProps) {
    if(prevProps.ticker !== this.props.ticker){
      
      fetch("https://api.tdameritrade.com/v1/marketdata/"+this.props.ticker+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=3&frequencyType=daily&frequency=1&needExtendedHoursData=false")
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
  }
 
  render() {
    const options = {
      theme: "light1",
      
      title:{
        text: `${ this.props.title }`,
        fontFamily: 'Arial',
        fontColor: '#484a4d'
      },
      animationEnabled: "true",
      animationDuration: 1300,
     
     

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