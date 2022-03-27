import React from 'react';
import ScrollList from '../ScrollList/ScrollList';
import './Dashboard.css';
import './Pages.css';
import PortfolioGraph from '../PortfolioGraph/PortfolioGraph';
import News from '../News/News';



/*
----------THIS IS ALL PLACE HOLDER INFORMATION-------
    -this dashboard is currently being working on by 
          Mitch and Duncan
    -This will all be changed to take dummy stock data
*/

function Dashboard() {
  return (
    <>
      <div className='backround'>
        
        <h1 id='dashboardHeading'>Dashboard</h1>

        <div className='graphAndWatchlist'>

          <div className='graph-box'>

            {/*generates graph from test data this will need to be changed for graph */}
            <PortfolioGraph title='Portfolio Performance'></PortfolioGraph>
            
          </div>

          {/* Watchlist placeholder*/}
          <ScrollList title="Watch List" stockName="APPL" price="$135" upDown="+4%" data={[5, 10, 5, 18, 20, 8, 15, 12, 4, 21]}> </ScrollList>

        </div>

        {/* holdings placeholder*/}
        <div className='holdings'>
          <div className='holdings-title'>
            Current Holdings:
          </div>
          <div className='holdings-body'>
            <ul>
              <li>COMPANY <span> PRICE </span><span> HOLDING </span></li>
              <li>COMPANY <span> PRICE </span><span> HOLDING </span></li>
              <li>COMPANY <span> PRICE </span><span> HOLDING </span></li>
            </ul>
          </div>
        </div>

        {/* News Componenet With Placeholders*/}
        
        <News></News>

      </div>
    </>
  );
}

export default Dashboard;
