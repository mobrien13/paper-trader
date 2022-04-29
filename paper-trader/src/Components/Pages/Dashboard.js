import { useState, useEffect } from 'react';
import ScrollList from '../ScrollList/ScrollList';
import './Dashboard.css';
import './Pages.css';
import PortfolioGraph from '../PortfolioGraph/PortfolioGraph';
import { usersDatabase } from '../../fakeDatabase.js';
import News from '../News/News';
import Trending from '../Trending/Trending'
import { getHoldings } from '../../firebase';
import Orders from '../Orders/Orders';



/*
----------THIS IS ALL PLACE HOLDER INFORMATION-------
    -this dashboard is currently being working on by 
          Mitch and Duncan
    -This will all be changed to take dummy stock data
*/

function Dashboard() {

  //fake database
  // const user = usersDatabase[0];
  // const userHoldings = user.holdings;

  const [userHoldings, setUserHoldings] = useState([])

  useEffect(() => {
    getHoldings().then(result => {
      setUserHoldings(result)
    }
    )
  }, [])

  return (
    <>
      <div className='backround container'>

        {/* <h1 id='dashboardHeading'>Dashboard</h1> */}

        <div className='graphAndWatchlist'>

          <div className='graph-box'>

            {/*generates graph from test data this will need to be changed for graph */}
            <PortfolioGraph title='Portfolio Performance'></PortfolioGraph>

          </div>

          {/* Watchlist placeholder*/}
          <ScrollList title="Watch List"> </ScrollList>

        </div>

        {/* holdings placeholder*/}
        {/* <div className='holdings'>
          <div className='holdings-title'>
            <h3>Holdings:</h3>
          </div>
          <div className='holdings-body'>
            <ul>
              {userHoldings.map((item) => !item.isSold && <li>{item.ticker.toUpperCase()}: {item.quantity} Shares @ ${item.buyPrice}/share</li>)}
              {userHoldings.map((item) => item.isSold && <li>{item.ticker.toUpperCase()}: {item.quantity} Shares @ ${item.buyPrice}/share Sold @ ${item.sellPrice}/share</li>)}
            </ul>
          </div>
        </div> */}


        {/* Orders/Holdings Component */}
        <Orders>
          {/* for now it has both open and closed orders. in the future, it should just show the open orders and have a separate menu to so the receipts */}
          <ul>
            {userHoldings.map((item) => !item.isSold && <li className='ordersItem'>{item.ticker.toUpperCase()}: {item.quantity} Shares @ ${item.buyPrice}/share</li>)}
            {userHoldings.map((item) => item.isSold && <li className='ordersItem'>{item.ticker.toUpperCase()}: {item.quantity} Shares @ ${item.buyPrice}/share Sold @ ${item.sellPrice}/share</li>)}
          </ul>
        </Orders>

        {/* News Componenet With Placeholders*/}

        <News></News>
        {//<Trending></Trending>
        }

      </div>

      {/* Footer */}
      <div className='footerDark' />

    </>
  );
}

export default Dashboard;
