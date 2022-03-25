import React from 'react';
import ScrollList from '../ScrollList/ScrollList';
import './Dashboard.css';
import './Pages.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';


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

        <div className='graphAndWatchlist'>

          <div className='graph-box'>

            {/*generates graph from sparkline data, this will need to be changed for graph */}


            <div className='graph'>
              <Sparklines data={[5, 10, 5, 18, 20, 8, 15, 12]} width={100} height={30} margin={5} >
                <SparklinesLine color="black" style={{ fill: "none}" }} />
              </Sparklines>
            </div>
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

        {/* News placeholder*/}
        <div className='news'>
          <div className='list-title'>News</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
          <div className='news-item'>APPL PPRICE: $135</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
