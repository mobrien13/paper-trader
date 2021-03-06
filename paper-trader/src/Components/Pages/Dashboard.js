import { useState, useEffect } from 'react';
import ScrollList from '../ScrollList/ScrollList';
import './Dashboard.css';
import './Pages.css';
import PortfolioGraph from '../PortfolioGraph/PortfolioGraph';
import News from '../News/News';
import Trending from '../Trending/Trending'
import { getHoldings, getUserName, getProfit } from '../../firebase';
import Orders from '../Orders/Orders';

function Dashboard() {
  const [userHoldings, setUserHoldings] = useState([])
  const [userName, setUserName] = useState("")
  const [daProfit, setDaProfit] = useState(0)

  useEffect(() => {
    getHoldings().then(result => {
      setUserHoldings(result)
    })

  }, [])

  useEffect(() => {
    getUserName().then(result => {
      setUserName(result[0])
    }
    )
  }, [])

  useEffect(() => {
    getProfit().then(result => {
      setDaProfit(result)
    }
    )
  }, [])


  return (
    <>
      <div className='backround container'>

        <div className='graphAndWatchlist'>


          <div className='headingAndGraph'>

            <div className='dashboardHeadingBox'>
              <h1 className='dashboardHeading'>Hello, {userName}</h1>
              <h1 className='dashboardHeading'>Total Profit: ${daProfit}</h1>
            </div>

            <div className='graph-box'>

              {/*generates graph from test data this will need to be changed for graph */}
              <PortfolioGraph title='Portfolio Performance' ></PortfolioGraph>

            </div>
          </div>

          {/* Watchlist*/}
          <ScrollList title="Watchlist"> </ScrollList>

        </div>

        {/* Orders/Holdings Component */}
        <Orders></Orders>

        {/* DO NOT DELETE  */}
        <News keyWord='stock market'></News>

      </div>

      {/* Footer */}
      <div className='spacer layer1' />

    </>
  );
}

export default Dashboard;
