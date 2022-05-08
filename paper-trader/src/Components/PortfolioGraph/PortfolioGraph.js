import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
import { getHoldings, setProfit } from '../../firebase';
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
    let aryx = []
    let aryy = []
    let ary = []
    let final = []
    let acum = 0


    getHoldings().then((result) => {
      for (let i = 1; i < result.length; i++) {
        if (result[i].sellPrice !== 0 && result[i].sellPrice !== null) {
          aryx.push(new Date(result[i].timesold))
          aryy.push((result[i].quantitySold * result[i].sellPrice) - (result[i].buyPrice * result[i].quantitySold))
        }
      }

      //removes any zero or undefined values
      for (let i = 1; i < aryx.length; i++) {
        //splice out if undefined
        if (aryx[i] === undefined || aryx[i] === 0 || aryy[i] === undefined || aryy[i] === 0) {
          aryx.splice(i, 1)
          aryy.splice(i, 1)
          i--;
        }
      }

      //splices out the values that share dates and adds them
      for (let i = 1; i < aryx.length; i++) {

        //setup dates
        let currentDay = Date.parse(aryx[i]);
        currentDay = new Date(currentDay).setHours(0, 0, 0, 0)
        let prevDay = Date.parse(aryx[i - 1]);
        prevDay = new Date(prevDay).setHours(0, 0, 0, 0);

        //splice out if day matches
        if (currentDay === prevDay) {
          aryx.splice(i, 1)
          aryy[i - 1] = aryy[i - 1] * 1.0 + aryy[i] * 1.0
          aryy.splice(i, 1)
          i--
        }
      }

      //accumulator
      for (let i = 0; i < aryx.length; i++) {
        aryy[i] += acum;
        acum = aryy[i]
      }

      //push results
      for (let i = 0; i < aryx.length; i++) {
        ary.push({ x: aryx[i], y: aryy[i] })
      }

      //set state
      console.log(ary)
      this.setState({
        isLoaded: true,
        data: ary
      });

      //sets profit in firestore
      setProfit(aryy[aryy.length - 1]);

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
          title: "Total Profit USD",
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
        selectedRangeButtonIndex: 0,
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
      height: "65vh",
      margin: "auto",
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