import React, { Component} from "react";
import CanvasJSReact from '../../canvasjs.stock.react';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const currentTime =  Date.now() -  86400000 - (3600000 * 8)

var data1 = [], data2 = []


class StockGraph extends Component {
  constructor() {
    super();
    this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false};
    this.updateChart = this.updateChart.bind(this);
  }


  
  componentDidMount() {
      fetch("https://api.tdameritrade.com/v1/marketdata/"+this.props.ticker+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=day&period=1&frequency=1&needExtendedHoursData=false")
      .then(res => res.json())
      .then(
        (data) => {
          var dps1 = [], dps2 = [];


          for (var i = 0; i < data.candles.length; i++) {
            if(new Date(data.candles[i].datetime) < currentTime){
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
            
          }

          for (var i = 0; i < data.candles.length; i++) {
            if(new Date(data.candles[i].datetime)){
              data1.push({
                x: new Date(data.candles[i].datetime),
                y: [
                  Number(data.candles[i].open),
                  Number(data.candles[i].high),
                  Number(data.candles[i].low),
                  Number(data.candles[i].close)
                ]
              });
  
              data2.push({x: new Date(data.candles[i].datetime), y: Number(data.candles[i].close)});
            }
            
          }

          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
          });
        }
      )
    setInterval(this.updateChart, 10000);
  }

  
  updateChart() {
  // for (var i = 0; i < data.candles.length; i++) {
  //   if(new Date(data.candles[i].datetime) < currentTime){
  //      dps1.push({
  //      x: new Date(data.candles[i].datetime),
  //       y: [
  //         Number(data.candles[i].open),
  //         Number(data.candles[i].high),
  //         Number(data.candles[i].low),
  //         Number(data.candles[i].close)
  //         ]
  //         });
  
  //         dps2.push({x: new Date(data.candles[i].datetime), y: Number(data.candles[i].close)});
  //       }
  //     }
            
    this.setState({
      isLoaded: true,
      //dataPoints1: dps1,
      //dataPoints2: dps2,
    });
      
    this.chart.render();
    console.log("updated");
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
          // labelFormatter: function(e) {
          //   return "";
          // },
          valueFormatString: "h:mm",
        
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            // labelFormatter: function(e) {
            //   return "";
            // }
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
          borderColor:"black",
          fallingColor: "#DD7E86",
          risingColor:"#33FF4C",
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints : this.state.dataPoints1
        }]
      }],

      rangeSelector: {
        buttons: [{              
          rangeType: "all",
          label: "All" 
        },
        {
          range: 1, 
          rangeType: "hour",
          label: "1 Hour"
        },{            
          range: 30,
          rangeType: "minute",
          label: "30 Min"
        },{     
          range: 10,
          rangeType: "minute",
          label: "10 Min"
        },],
      },
    
     
      
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
            onRef={ref => this.chart = ref}
            />
          }
        </div>
      </div>
    );
  }
}
export default StockGraph;  