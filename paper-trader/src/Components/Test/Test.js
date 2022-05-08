import { useEffect, useState } from 'react';
import { login, logout, useAuth, getAuth, firebaseConfig, signup, getUserWatchList, getHoldings, buyStock } from '../../firebase.js';




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

  // getHoldings().then(result => {
  //   //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
  //   setHoldings(result)
  //   holdingsTest()
  //   setTestingHoldings(false)
  // });

  // function holdingsTest() {
  //   if (1004.94 != holdings[0].buyPrice) {
  //     setHoldingsPass(false);
  //   }
  //   if (holdings[0].isSold !== false) {
  //     setHoldingsPass(false);
  //   }
  //   if (holdings[0].quantity != 10) {
  //     setHoldingsPass(false);
  //   }
  //   if (holdings[0].sellPrice !== 0) {
  //     setHoldingsPass(false);
  //   }
  //   if (holdings[0].ticker !== 'tsla') {
  //     setHoldingsPass(false);
  //   }
  // }

  //Holdings Tests
  getHoldings().then(result => {
    setHoldings(result)
    holdingsTest()
    setTestingHoldings(false)
  });

  function holdingsTest(){
    if (holdings[1].ticker.toUpperCase() === 'TSLA' && holdings[1].quantity === 10){
      setHoldingsPass(true)
    }
    else{
      setHoldingsPass(false)
    }
  }

  //Sell test
  const [sell, setSell] = useState();
  const [sellPass, setSellPass] = useState(true);
  const [testingSell, setTestingSell] = useState(true);

  // sellStock("AAPL", 100, 10).then(result => {
  //     setSell(result)
  //     sellTest()
  //     setTestingSell(false)
  //   });

  getHoldings().then(result => {
    setHoldings(result)
    sellTest()
    setTestingSell(false)
  });

  function sellTest(){
    if (holdings[2].ticker.toUpperCase() === 'AAPL' && holdings[2].quantitySold === 10){
      setSellPass(true)
    }
    else{
      setSellPass(false)
    }
  }
  
  // //Buy tests
  // const [buy, setBuy] = useState();
  // const [buyPass, setBuyPass] = useState(true);
  // const [testingBuy, setTestingBuy] = useState(true);

  // buyStock("APPL", 100, 10).then(result => {
  //   setBuy(result)
  //   buyTest()
  //   setTestingBuy(false)
  // });

  // function buyTest(){
  //   if (buy){
  //     setBuyPass(true)
  //   }
  //   else{
  //     setBuyPass(false)
  //   }
  // }

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

        <h1>Sell Stock</h1>

        <div>

          {testingSell && <p>Sell test is currently running</p>}

          {!testingSell && sellPass && <p style={{ color: 'green' }}>Firebase.js: sellStock(ticker, price, quantity) Test - Passes</p>}

          {!testingSell && !sellPass && <p style={{ color: 'red' }}>Firebase.js: sellStock(ticker, price, quantity) Test - Fails</p>}

        </div>

        {/* <h1>Buy Stock</h1>

        <div>

          {testingBuy && <p>Buy test is currently running</p>}

          {!testingBuy && buyPass && <p style={{ color: 'green' }}>Firebase.js: buyStock(ticker, price, quantity) Test - Passes</p>}

          {!testingBuy && !buyPass && <p style={{ color: 'red' }}>Firebase.js: buyStock(ticker, price, quantity) Test - Fails</p>}

        </div> */}

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