import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
import { getHoldings, getPastOrders } from '../../firebase';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

CanvasJS.addColorSet("colors",
  [//colorSet Array 
    "#06F",     //navigator integral color
  ]);


class PortfolioGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, data: [] };
  }

  componentDidMount() {
    var aryx = []
    var aryy = []
    var ary = []
    let final = []
    let acum = 2000


    getHoldings().then((result) => {
      for (let i = 1; i < result.length; i++) {
        if (result[i].sellPrice !== 0 && result[i].sellPrice !== null) {
          aryx.push( new Date(result[i].timesold))
          aryy.push((result[i].quantitySold * result[i].sellPrice) - (result[i].buyPrice *  result[i].quantitySold))
        }
      }

    
      //bad splicing

      // let prev =  Date.parse(aryx[0])
      // prev = new Date(prev).setHours(0,0,0,0)
      // for(let i = 0; i <= aryx.length; i++){
      //   let next =  Date.parse(aryx[i])
      //   next = new Date(next).setHours(0,0,0,0)
        
      //   if(prev === next){
      //     aryy[i] = aryy[i-1] + aryy[i]
      //     aryy.splice(i-1,1)
      //     aryx.splice(i-1,1)
      //   }
      //   prev = next
      // }


      //fix splicing
      for(let i = 1 ; i < aryx.length; i++){

        //setup dates
        let currentDay = Date.parse(aryx[i]);
        currentDay = new Date(currentDay).setHours(0,0,0,0)
        let prevDay = Date.parse(aryx[i-1]);
        prevDay = new Date(prevDay).setHours(0,0,0,0);

        //splice out if undefined
        if(aryx[i] === undefined || aryx[i] === 0 || aryy[i] === undefined || aryy[i] === 0){
          aryx.splice(i, 1)
          aryy.splice(i, 1)
          i--;
        }
        
        //splice out if day matches
        else if(currentDay === prevDay){
          console.log("Splicing")
          aryx.splice(i, 1)
          aryy[i] = aryy[i] + aryy.splice(i, 1)
          i--
        }
      }



      //push results
      for (let i = 0; i < aryx.length; i++) {
        ary.push({ x: aryx[i], y: aryy[i] })
      }

      console.log(ary)
      this.setState({
        isLoaded: true,
        data: ary
      });
    })

  }

 
  render() {
    const options = {
      theme: "light1",
      animationEnabled: "True",
      animationDuration: 1200,
      colorSet: "colors",

      axisX: {
        minimum: 0,
      },

      charts: [{
        xaxis: {
          viewportMinimum: 0,
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
        selectedRangeButtonIndex: 3,
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
        buttons: [{
          rangeType: "all",
          label: "All",
        },
        {
          range: 1,
          rangeType: "year",
          label: "1 Year"
        }, {
          range: 1,
          rangeType: "month",
          label: "1 Month"
        }, {
          range: 1,
          rangeType: "week",
          label: "1 Week"
        },],
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