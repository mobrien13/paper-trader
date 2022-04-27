import React from "react";

//Use axios to call trending method from yahoo finance API

 const Trending = () => {
  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://yfapi.net/v1/finance/trending/US',
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': 'PLqDQn3va62W9uCxdBpx1a5eQpJxc9NCatyBeWcW'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  }); 

   return (
     <div>Trending</div>
   )
 }
export default Trending;