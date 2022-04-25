import { useEffect, useState } from 'react';
import { login, logout, useAuth, getAuth, firebaseConfig, signup, getUserWatchList, getHoldings } from '../../firebase.js';




/*
---------UNIT TESTS-------TESTUSER@PAPERTRADER.COM------TEST12--------
    firebase does not allow for firestore requests inside of jest testing environment, as far as we have been able to find. Without mocking the database. So we made our own testing environment, the test page.
*/

function Test() {

  //watchlist setup
  const [watchlist, setWatchlist] = useState([]);
  const [testingWatchList, setTestingWatchList] = useState(true);
  const [watchListPass, setWatchListPass] = useState(true);
  const [watchListPass2, setWatchListPass2] = useState(true);
  let knownWatchList = ["TSLA", "BDX", "AAPL"];
  let incorrectWatchList = ["TSLA"];

  getUserWatchList().then(result => {
    //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
    setWatchlist(result)
    watchlistTest()
    watchlistTest2()
    setTestingWatchList(false)
  });

  //getUserWatchList Test - All WatchList Items Should Exist
  function watchlistTest() {
    for (let i = 0; i < 3; i++) {
      if (watchlist[i].toUpperCase() !== knownWatchList[i]) {
        setWatchListPass(false)
      }
    }
    if (watchlist.length != knownWatchList.length) {
      setWatchListPass(false)
    }
  }

  //second watchlist - WatchList Is Missing Items
  function watchlistTest2() {
    for (let i = 0; i < 3; i++) {
      if (watchlist[i].toUpperCase() !== incorrectWatchList[i]) {
        setWatchListPass2(false)
      }
    }
    if (watchlist.length != incorrectWatchList.length) {
      setWatchListPass2(true)
    }
  }

  //Holdings Tests
  const [holdings, setHoldings] = useState([]);
  const [holdingsPass, setHoldingsPass] = useState(true);
  const [testingHoldings, setTestingHoldings] = useState(true);

  getHoldings().then(result => {
    //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
    setHoldings(result)
    holdingsTest()
    setTestingHoldings(false)
  });

  function holdingsTest() {
    if (1004.94 != holdings[0].buyPrice) {
      setHoldingsPass(false);
    }
    if (holdings[0].isSold !== false) {
      setHoldingsPass(false);
    }
    if (holdings[0].quantity != 10) {
      setHoldingsPass(false);
    }
    if (holdings[0].sellPrice !== 0) {
      setHoldingsPass(false);
    }
    if (holdings[0].ticker !== 'tsla') {
      setHoldingsPass(false);
    }
  }

  return (
    <>
      <div className="container">

        <h1>Watchlist</h1>

        <div>

          {testingWatchList && <p>Watchlist test is currently running</p>}

          {!testingWatchList && watchListPass && <p style={{ color: 'green' }}>Firebase.js: getUserWatchList() Test - All WatchList Items Should Exist Passes</p>}

          {!testingWatchList && !watchListPass && <p style={{ color: 'red' }}>Firebase.js: getUserWatchList() Test - All WatchList Items Should Exist Fails</p>}

          {!testingWatchList && watchListPass2 && <p style={{ color: 'green' }}>Firebase.js: getUserWatchList() Test - Incorrect Compare to Incorrect WatchList Passes</p>}

          {!testingWatchList && !watchListPass2 && <p style={{ color: 'red' }}>Firebase.js: getUserWatchList() Test - Incorrect Compare to Incorrect WatchList Fails</p>}

        </div>

        <h1>Holdings</h1>

        <div>

          {testingHoldings && <p>Holdings test is currently running</p>}

          {!testingHoldings && holdingsPass && <p style={{ color: 'green' }}>Firebase.js: getHoldings() Test - Passes</p>}

          {!testingHoldings && !holdingsPass && <p style={{ color: 'red' }}>Firebase.js: getHoldings() Test - Fails</p>}

        </div>

        {/* <h1>Buy/Sell</h1>

        <div>

          {testingWatchList && <p>Watchlist test is currently running</p>}

          {!testingWatchList && watchListPass && <p style={{ color: 'green' }}>Firebase.js: getUserWatchList() Test - All WatchList Items Should Exist Passes</p>}

          {!testingWatchList && !watchListPass && <p style={{ color: 'red' }}>Firebase.js: getUserWatchList() Test - All WatchList Items Should Exist Fails</p>}

        </div> */}


      </div>
    </>
  );
}

export default Test;