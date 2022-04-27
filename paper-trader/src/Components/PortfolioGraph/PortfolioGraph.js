import React, {Component} from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;



class PortfolioGraph extends Component {
  render() {
    const options = {
      theme:"light1",
      animationEnabled: "True",
      animationDuration: 1200,
      

      charts: [{
          xaxis:{
            lineThickness: 3,
            tickLength: 0,
            
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
            }
          },
         
          axisY: {
            lineThickness: 3,
            title: "Portfolio Value USD",
            prefix: "$",
            tickLength: 0
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },


          data: [{
            //"CSS" like settigns for graph
            type: "spline",
            markerType:"none",
            lineThickness: "2.8",
            lineColor:"#707C8F",
            fillOpacity: .3,
            dataPoints: [
	      { x: new Date("2018-01-01"), y: 100 },
	      { x: new Date("2018-02-01"), y: 340 },
	      { x: new Date("2018-03-01"), y: 220 },
	      { x: new Date("2018-04-01"), y: 270 },
	      { x: new Date("2018-05-01"), y: 300 },
	      { x: new Date("2018-06-01"), y: 370 },
	      { x: new Date("2018-07-01"), y: 290 },
	      { x: new Date("2018-08-01"), y: 290 },
	      { x: new Date("2018-09-01"), y: 300 },
	      { x: new Date("2018-10-01"), y: 140 },
	      { x: new Date("2018-11-01"), y: 300 },
	      { x: new Date("2018-12-01"), y: 290 },
	      { x: new Date("2019-01-01"), y: 270 },
	      { x: new Date("2019-02-01"), y: 190 },
	      { x: new Date("2019-03-01"), y: 140 },
	      { x: new Date("2019-04-01"), y: 290 },
	      { x: new Date("2019-05-01"), y: 140 },
	      { x: new Date("2019-06-01"), y: 360 },
	      { x: new Date("2019-07-01"), y: 290 },
	      { x: new Date("2019-08-01"), y: 300 },
	      { x: new Date("2019-09-01"), y: 200 },
	      { x: new Date("2019-10-01"), y: 300 },
	      { x: new Date("2019-11-01"), y: 140 },
	      { x: new Date("2019-12-01"), y: 190 }
	  ]
         }]
      }],
      navigator: {
        slider: {
          //minimum: new Date("2018-07-01"),
          //maximum: new Date("2019-06-30")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "60vh",
      margin: "auto"
    };
    return (
      <div>
        <CanvasJSStockChart
          options={options}
          containerProps = {containerProps}
          onRef={ref => this.stockChart = ref}
        />
      </div>
    );
  }
}

export default PortfolioGraph;