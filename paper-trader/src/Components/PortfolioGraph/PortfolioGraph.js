import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
import {getHoldings, getPastOrders} from '../../firebase';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;



// { x: new Date("2018-02-01"), y: 340 },
// { x: new Date("2018-03-01"), y: 220 },
// { x: new Date("2018-04-01"), y: 270 },
// { x: new Date("2018-05-01"), y: 300 },
// { x: new Date("2018-06-01"), y: 370 },
// { x: new Date("2018-07-01"), y: 290 },
// { x: new Date("2018-08-01"), y: 290 },
// { x: new Date("2018-09-01"), y: 300 },
// { x: new Date("2018-10-01"), y: 140 },
// { x: new Date("2018-11-01"), y: 300 }

CanvasJS.addColorSet("colors",
  [//colorSet Array 
    "#06F",     //navigator integral color
  ]);


class PortfolioGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, data:[] };
  }

  componentDidMount() {
   let current = []
  // let past = []
   




    getHoldings().then((result) => {
      for (let i = 1; i <= result.length; i++){
        current.push({x: new Date((new Date (result[i].timebought)).setHours(0,0,0,0)), y: (result[i].buyPrice * result[i].quantity)})
      }

      let prev = current[0].x
      for(let i = 1; i <= current.length; i++){
        let next = current[i].x
        
        if(prev === next){
          current[i].y = current[i-1].y + current[i].y 
          current.splice(i-1,1)
        }

        prev = next
      }

     //.toDateString()
      
    })

  
    
    
    



    this.setState({
      isLoaded: true,
      data: current
    });
  }

  render() {
    const options = {
      theme: "light1",
      animationEnabled: "True",
      animationDuration: 1200,
      colorSet:"colors",



      charts: [{
        xaxis: {
          lineThickness: 3,
          tickLength: 0,
          lineColor: "#242526",
          tickColor: "#242526",
          titleFontColor: "#242526",
          gridColor: "#242526",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          }
        },
        axisY: {
          lineThickness: 1,
          title: "Portfolio Value USD",
          prefix: "$",
          tickLength: 0,
          lineColor: "#242526",
          tickColor: "#242526",
          titleFontColor: "#242526",
          gridColor: "#242526",
        },
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },


        data: [{
          //"CSS" like settigns for graph
          type: "spline",
          markerType: "none",
          lineThickness: "2.8",
          lineColor: "#06F",
          fillOpacity: .5,
          dataPoints: this.state.data
        }]
      }],


      navigator: {
        slider: {
          //minimum: new Date("2018-07-01"),
          //maximum: new Date("2019-06-30")
        }
      },

      rangeSelector: {
        selectedRangeButtonIndex: 5,
        buttonStyle: {
          backgroundColor: "#ffffff",
          backgroundColorOnHover: "#06f",
          backgroundColorOnSelect: "#06f",
          borderColor: "#06f",
          labelFontColor: "#242526",
          labelFontColorOnHover: "#ffffff",
        },
        inputFields: {
          style: {
            borderColor: "#06f",
            borderColorOnFocus: "#06f",
            fontColor: "#242526",
          }
        },
      }

    };


    const containerProps = {
      width: "100%",
      height: "60vh",
      margin: "auto"
    };
    return (
      <div>
        {this.state.isLoaded &&
          <CanvasJSStockChart
          options={options}
          containerProps={containerProps}
          onRef={ref => this.stockChart = ref}
        />
        }
        
      </div>
    );
  }
}

export default PortfolioGraph;