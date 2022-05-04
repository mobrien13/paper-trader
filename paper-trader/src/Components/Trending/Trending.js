import React, { useEffect, useState} from "react";
import './Trending.css'

//Use axios to call trending method from yahoo finance API

 const Trending = () => {
  var axios = require("axios").default;
  const [ary, setAry] = useState([])

  var options = {
    method: 'GET',
    url: 'https://yfapi.net/v1/finance/trending/US',
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': 'VypvXxHoUD4phTAdK6H5xZvPWTcHzS9pn5jtCr90'
    }
  };
  
  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data.finance.result[0].quotes);
      let trending = response.data.finance.result[0].quotes;
    for( let i =0; i < trending.length; i++){
      ary.push(response.data.finance.result[0].quotes[i]);
    }
    console.log(ary[0].symbol)
    }).catch(function (error) {
      console.error(error);
    }); 
  },[])

   return (
     <>
          <div className='trendingContainer'>Trending
            <ol className='trender'>
              {ary.map((item, i) => {
                if (i<10){
                return(
                  <li>{item.symbol}</li>
                )
                }
              })}
            </ol>
          </div>  
     </>
   )
 }
export default Trending;