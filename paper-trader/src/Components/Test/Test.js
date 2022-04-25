import { useEffect, useState } from 'react';
import { login, logout, useAuth, getAuth, firebaseConfig, signup, getUserWatchList } from '../../firebase.js';




/*
----------THIS IS ALL PLACE HOLDER INFORMATION-------
    -this dashboard is currently being working on by 
          Mitch and Duncan
    -This will all be changed to take dummy stock data
*/

function Test() {

  const [watchlist, setWatchlist] = useState([]);
  const [testingWatchList, setTestingWatchList] = useState(true);
  const [watchListPass, setWatchListPass] = useState(true);
  let knownWatchList = ["TSLA", "BDX", "AAPL"];


  getUserWatchList().then(result => {
    //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
    setWatchlist(result)
    setTestingWatchList(false)
    test()
  });

  function test() {
    for (let i = 0; i < 3; i++) {
      if (watchlist[i].toUpperCase() !== knownWatchList[i]) {
        setWatchListPass(false)
      }
    }
  }

  // function useAsync(asyncFn, onSuccess) {
  //   useEffect(() => {
  //     let isActive = true;
  //     asyncFn().then(data => {
  //       if (isActive) onSuccess(data);
  //     });
  //     return () => { isActive = false };
  //   }, [asyncFn, onSuccess]);
  // }

  return (
    <>
      <div>

        <h1>Watchlist</h1>

        <div>

          {testingWatchList && <p>Watchlist test is currently running</p>}

          {!testingWatchList && watchListPass && <p>Watchlist test passes</p>}

          {!testingWatchList && !watchListPass && <p>Watchlist test fails</p>}

        </div>
      </div>
    </>
  );
}

export default Test;