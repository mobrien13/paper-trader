import React, {Component} from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


class Graph extends Component {
  render() {
    const options = {
      title: {
          text: "CanvasJS StockChart"
      },
      charts: [{
          data: [{
            type: "line",
            dataPoints: [
	      { x: new Date("2018-01-01"), y: 71 },
	      { x: new Date("2018-02-01"), y: 55 },
	      { x: new Date("2018-03-01"), y: 50 },
	      { x: new Date("2018-04-01"), y: 65 },
	      { x: new Date("2018-05-01"), y: 95 },
	      { x: new Date("2018-06-01"), y: 68 },
	      { x: new Date("2018-07-01"), y: 28 },
	      { x: new Date("2018-08-01"), y: 34 },
	      { x: new Date("2018-09-01"), y: 14 },
	      { x: new Date("2018-10-01"), y: 71 },
	      { x: new Date("2018-11-01"), y: 55 },
	      { x: new Date("2018-12-01"), y: 50 },
	      { x: new Date("2019-01-01"), y: 34 },
	      { x: new Date("2019-02-01"), y: 50 },
	      { x: new Date("2019-03-01"), y: 50 },
	      { x: new Date("2019-04-01"), y: 95 },
	      { x: new Date("2019-05-01"), y: 68 },
	      { x: new Date("2019-06-01"), y: 28 },
	      { x: new Date("2019-07-01"), y: 34 },
	      { x: new Date("2019-08-01"), y: 65 },
	      { x: new Date("2019-09-01"), y: 55 },
	      { x: new Date("2019-10-01"), y: 71 },
	      { x: new Date("2019-11-01"), y: 55 },
	      { x: new Date("2019-12-01"), y: 50 }
	  ]
         }]
      }],
      navigator: {
        slider: {
          minimum: new Date("2018-07-01"),
          maximum: new Date("2019-06-30")
        }
      }
    };
    const containerProps = {
      width: "80%",
      height: "450px",
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

export default Graph;