import React from 'react';
import './Dashboard.css';
import './Pages.css';
import graph from './graph.svg';


function Dashboard() {
    return (
      <>
        <body className='backround'>
          <div className='graph-box'>
            <div className='graph'>
              <img src ={graph}></img>
            </div>
          </div>
        
        
          <div className='watchlist'>
          <div className='watchlist-title'>Watchlist</div>
            <ul>
              <li className='watchlist-body'>APPL PPRICE: $135</li>
              <li className='watchlist-body'>APPL PPRICE: $135</li>
              <li className='watchlist-body'>APPL PPRICE: $135</li>
              <li className='watchlist-body'>APPL PPRICE: $135</li>
            </ul>
          </div>
         

          <div className='holdings'>
            <div className='holdings-title'>
              Current Holdings:
            </div>
            <div className='holdings-body'>
              <ul>
                <li> COMPANY <span> PRICE </span><span> HOLDING </span></li>
                <li>COMPANY <span> PRICE </span><span> HOLDING </span></li>
                <li>COMPANY <span> PRICE </span><span> HOLDING </span></li>
              </ul>
            </div>
          </div>
        </body>
        
        
      </>
    );
  }
  
  export default Dashboard;
