import React, { Component } from "react";
import Chart from "react-apexcharts";

class Graph extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      


        /* Y: [Open, High, Low, Close]  x: [Year, month, day, hours] */ 
        /* Month is zero indexed  0 = january */
        series: [{
          data: [{
              x: new Date(2020,6,1,0),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(2020,6,2,0),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
                x: new Date(2020,6,3,0),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
                x: new Date(2020,6,4,0),
              y: [6635.65, 6651, 6629.67, 6638.24]
            },
            {
                x: new Date(2020,6,5,0),
              y: [6638.24, 6640, 6620, 6624.47]
            },
            {
                x: new Date(2020,6,6,0),
              y: [6624.53, 6636.03, 6621.68, 6624.31]
            },
            {
                x: new Date(2020,6,7,0),
              y: [6624.61, 6632.2, 6617, 6626.02]
            },
            {
                x: new Date(2020,6,8,0),
              y: [6627, 6627.62, 6584.22, 6603.02]
            },
            {
                x: new Date(2020,6,9,0),
              y: [6605, 6608.03, 6598.95, 6604.01]
            },
            {
                x: new Date(2020,6,10,0),
              y: [6604.5, 6614.4, 6602.26, 6608.02]
            },
            {
                x: new Date(2020,6,11,0),
              y: [6608.02, 6610.68, 6601.99, 6608.91]
            },
            {
                x: new Date(2020,6,12,0),
              y: [6608.91, 6618.99, 6608.01, 6612]
            },
            {
                x: new Date(2020,6,13,0),
              y: [6612, 6615.13, 6605.09, 6612]
            },
            {
                x: new Date(2020,6,14,0),
              y: [6612, 6624.12, 6608.43, 6622.95]
            },
            {
                x: new Date(2020,6,15,0),
              y: [6623.91, 6623.91, 6615, 6615.67]
            },
            {
                x: new Date(2020,6,16,0),
              y: [6618.69, 6618.74, 6610, 6610.4]
            },
            {
                x: new Date(2020,6,17,0),
              y: [6611, 6622.78, 6610.4, 6614.9]
            },
            {
                x: new Date(2020,6,18,0),
              y: [6614.9, 6626.2, 6613.33, 6623.45]
            },
            {
                x: new Date(2020,6,19,0),
              y: [6623.48, 6627, 6618.38, 6620.35]
            },
            {
                x: new Date(2020,6,20,0),
              y: [6619.43, 6620.35, 6610.05, 6615.53]
            },
            {
                x: new Date(2020,6,21,0),
              y: [6615.53, 6617.93, 6610, 6615.19]
            },
            {
                x: new Date(2020,6,22,0),
              y: [6615.19, 6621.6, 6608.2, 6620]
            },
            {
                x: new Date(2020,6,23,0),
              y: [6619.54, 6625.17, 6614.15, 6620]
            },
            {
                x: new Date(2020,6,24,0),
              y: [6620.33, 6634.15, 6617.24, 6624.61]
            },
            {
                x: new Date(2020,6,25,0),
              y: [6625.95, 6626, 6611.66, 6617.58]
            },
            {
                x: new Date(2020,6,26,0),
              y: [6619, 6625.97, 6595.27, 6598.86]
            },
            {
                x: new Date(2020,6,27,0),
              y: [6598.86, 6598.88, 6570, 6587.16]
            },
            {
                x: new Date(2020,6,28,0),
              y: [6588.86, 6600, 6580, 6593.4]
            },
            {
                x: new Date(2020,6,29,0),
              y: [6593.99, 6598.89, 6585, 6587.81]
            },
            {
                x: new Date(2020,6,30,0),
              y: [6587.81, 6592.73, 6567.14, 6578]
            },
          ]
        }],
        options: {
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      
      
      };
    }

  render() {
    return (
      <div className="chart">
         <Chart
             options={this.state.options}
              series={this.state.series}
              type="candlestick"
              width="100%"
              height="auto"

            />
      </div>
    );
  }
}

export default Graph;