import React, { Component } from "react";
import CanvasJSReact from '../../canvasjs.stock.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

//"#06F" bc (our blue color)
// "#484a4d" our bg accent (dark grey)
// "#242526" bg (darker gray)
// "#dc143c" crimson from login error
// "#33FF4C" green

CanvasJS.addColorSet("candleStickColors",
  [//colorSet Array 
    "#484a4d",  //candlestick outline
    "#06F",     //navigator integral color
  ]);

class StockGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false };
  }

  componentDidMount() {
    fetch("https://api.tdameritrade.com/v1/marketdata/" + this.props.ticker + "/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=3&frequencyType=daily&frequency=1&needExtendedHoursData=false")
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

            dps2.push({ x: new Date(data.candles[i].datetime), y: Number(data.candles[i].close) });
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
    if (prevProps.ticker !== this.props.ticker) {

      fetch("https://api.tdameritrade.com/v1/marketdata/" + this.props.ticker + "/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=year&period=3&frequencyType=daily&frequency=1&needExtendedHoursData=false")
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

              dps2.push({ x: new Date(data.candles[i].datetime), y: Number(data.candles[i].close) });
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
      animationEnabled: "true",
      animationDuration: 1300,
      colorSet: "candleStickColors",

      rangeSelector: {
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
      },

      charts: [{


        axisX: {
          lineThickness: 3,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          lineColor: "#242526",
          tickColor: "#242526",
          titleFontColor: "#242526",
          gridColor: "#242526",

          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            }
          }
        },
        axisY: {
          lineThickness: 3,
          title: "Price USD",
          prefix: "$",
          tickLength: 0,
          lineColor: "#242526",
          tickColor: "#242526",
          titleFontColor: "#242526",
          gridColor: "#242526",
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


      navigator: {
        backgroundColor: "#fff",
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
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded &&
            <CanvasJSStockChart containerProps={containerProps} options={options}
            /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}
export default StockGraph;  