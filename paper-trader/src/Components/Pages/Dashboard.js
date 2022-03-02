import React from 'react';
import ScrollList from '../ScrollList/ScrollList';
import './Dashboard.css';
import './Pages.css';




function Dashboard() {
    return (
      <>
        <div className='backround'>
          <div className='graph-box'>
            <div className='graph'>
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
              GRAPH  GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH GRAPH
            </div>
          </div>
        
           {/* Watchlist placeholder*/}
          <ScrollList title="Watch List" stockName="APPL" price = "$135"> </ScrollList>


          {/* Search placeholder*/}
          <ScrollList title="Search" stockName="APPL" price = "$135"> </ScrollList>
         
          {/* holdings placeholder*/}
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
          
          {/* News placeholder*/}
          <div className='news'>
            <div className='list-title'>News</div>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
              <li className='news-item'>APPL PPRICE: $135</li>
            </div>
        </div>   
        
       
        
      </>
    );
  }
  
  export default Dashboard;
