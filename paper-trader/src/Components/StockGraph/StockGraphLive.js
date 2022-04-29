import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;



CanvasJS.addColorSet("candleStickColors",
  [//colorSet Array 
    "#484a4d",  //candlestick outline
    "#06F",     //navigator integral color
  ]);

class StockGraphLive extends Component {


  constructor() {
    super();
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false, times: null, temp1: [], temp2: [], tempy: []};
    this.updateChart = this.updateChart.bind(this);
  }


  componentDidMount() {
    const currentTime = Date.now() - (86400000) - (3600000*5)
    fetch("https://api.tdameritrade.com/v1/marketdata/" + this.props.ticker + "/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=day&period=1&frequencyType=minute&frequency=1&needExtendedHoursData=false")
      .then(res => res.json())
      .then(
        (data) => {
          let dps1 = [], dps2 = [], array = [];


          for (var i = 0; i < data.candles.length; i++) {
            if (new Date(data.candles[i].datetime) < currentTime) {
              dps1.push({
                x: new Date(data.candles[i].datetime),
                y: [
                  Number(data.candles[i].open),
                  Number(data.candles[i].high),
                  Number(data.candles[i].low),
                  Number(data.candles[i].close)
                ]
              });

              dps2.push({ x: new Date(data.candles[i].datetime), y: Number(data.candles[i].close) });

            }

            if (new Date(data.candles[i].datetime) > currentTime) {
              array.push({
                ary: [
                  new Date(data.candles[i].datetime),
                  Number(data.candles[i].open),
                  Number(data.candles[i].high),
                  Number(data.candles[i].low),
                  Number(data.candles[i].close)
                ]
              });
            }

          }

        

          let timer = setTimeout(() => {
            console.log(this.props.data)
            this.updateChart();
          }, 20000);

          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
            times: timer,
            temp1: dps1,
            temp2: dps2,
            tempy: array
          });
        }
      )
  }


  updateChart() {
    const Time = Date.now() - (86400000) - (3600000*5)


    for (var i = 0; i < this.state.tempy.length; i++) {
      if (new Date(this.state.tempy[i].ary[0]) < Time) {
        this.state.temp1.push({
          x: new Date(this.state.tempy[i].ary[0]),
          y: [
            Number(this.state.tempy[i].ary[1]),
            Number(this.state.tempy[i].ary[2]),
            Number(this.state.tempy[i].ary[3]),
            Number(this.state.tempy[i].ary[4])
          ]
        });

        this.state.temp2.push({ x: new Date(this.state.tempy[i].ary[0]), y: Number(this.state.tempy[i].ary[4]) });
      }
    }
    let timer = setTimeout(() => {
      console.log(this.props.data)
      this.updateChart();
    }, 20000);

    this.setState({
      isLoaded: true,
      dataPoints1: this.state.temp1,
      dataPoints2: this.state.temp2,
      times: timer
    });

    this.chart.render();
    console.log("updated");

  }

  componentWillUnmount() {
    clearTimeout(this.state.times);

    this.setState({
      isLoaded: false,
      dataPoints1: [],
      dataPoints2: [],
      times: null,
      temp1: null,
      temp2: null,
      tempy: null
    });

  }

  render() {
    const options = {
      theme: "light1",
      colorSet: "candleStickColors",

      charts: [{

        axisX: {
          lineThickness: 3,
          tickLength: 0,
          interval: 50,

          valueFormatString: "h:mm",

          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "h:mm",
          }
        },
        axisY: {
          lineThickness: 3,
          title: "Price USD",
          prefix: "$",
          tickLength: 0
        },

        data: [{
          borderColor: "black",
          fallingColor: "#dc143c",
          risingColor: "#33FF4C",
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints: this.state.dataPoints1
        }]
      }],

      rangeSelector: {
        selectedRangeButtonIndex: 2,
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
          rangeType: "hour",
          label: "1 Hour"
        }, {
          range: 30,
          rangeType: "minute",
          label: "30 Min"
        }, {
          range: 10,
          rangeType: "minute",
          label: "10 Min"
        },],
      },


      navigator: {
        data: [{
          lineColor: "#06F",
          fillOpacity: .5,
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
            this.state.isLoaded &&
            <CanvasJSStockChart containerProps={containerProps} options={options}
              onRef={ref => this.chart = ref}
            />
          }
        </div>
      </div>
    );
  }
}
export default StockGraphLive;  