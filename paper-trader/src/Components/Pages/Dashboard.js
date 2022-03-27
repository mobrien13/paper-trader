import React from 'react';
import ScrollList from '../ScrollList/ScrollList';
import './Dashboard.css';
import './Pages.css';
import PortfolioGraph from '../PortfolioGraph/PortfolioGraph';
import { usersDatabase } from '../../fakeDatabase.js';
import News from '../News/News';



/*
----------THIS IS ALL PLACE HOLDER INFORMATION-------
    -this dashboard is currently being working on by 
          Mitch and Duncan
    -This will all be changed to take dummy stock data
*/

function Dashboard() {

  //fake database
  const user = usersDatabase[0];
  const userHoldings = user.holdings;

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
          <ScrollList title="Watch List"> </ScrollList>

        </div>

        {/* holdings placeholder*/}
        <div className='holdings'>
          <div className='holdings-title'>
            <h3>Holdings:</h3>
          </div>
          <div className='holdings-body'>
            <ul>
              {userHoldings.map((item) =>
                <li>{ item.ticker }: { item.quantity } shares @ ${ item.pricePerShare }/share</li>
              )}
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
