import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 //https://canvasjs.com/data/gallery/jquery/samsung-electronics-stock-price.json
 
 
class StockGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false };
  }
 
  componentDidMount() {

    fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
      .then(res => res.json())
      .then(
        (data) => {
          var dps1 = [], dps2 = [];
          for (var i = 0; i < data.length; i++) {
            dps1.push({
              x: new Date(data[i].date),
              y: [
                Number(data[i].open),
                Number(data[i].high),
                Number(data[i].low),
                Number(data[i].close)
              ]
            });
        
            dps2.push({x: new Date(data[i].date), y: Number(data[i].close)});
          }
          
          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2
          });
        }
      )
  }
 
  render() {
    const options = {
       theme: "light1",
      title:{
        text: `${ this.props.title }`
      },
      animationEnabled: "True",
      animationDuration: 1450,
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
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints : this.state.dataPoints1
        }]
      }],
     
      
      navigator: {
        //backgroundColor: "#707C8F",
        data: [{
          dataPoints: this.state.dataPoints2
        }],
        slider: {
          minimum: new Date("2018-05-01"),
          maximum: new Date("2018-07-01")
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