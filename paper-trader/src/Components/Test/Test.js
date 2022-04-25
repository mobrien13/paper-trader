import { useEffect, useState } from 'react';
import { login, logout, useAuth, getAuth, firebaseConfig, signup, getUserWatchList } from '../../firebase.js';




/*
----------THIS IS ALL PLACE HOLDER INFORMATION-------
    firebase does not allow for firestore requests inside of jest testing environment, as far as we have been able to find. Without mocking the database. So we made our own testing environment, the test page.
*/

function Test() {

  const [watchlist, setWatchlist] = useState([]);
  const [testingWatchList, setTestingWatchList] = useState(true);
  const [watchListPass, setWatchListPass] = useState(true);
  let knownWatchList = ["TSLA", "BDX", "AAPL"];


  getUserWatchList().then(result => {
    //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
    setWatchlist(result)
    test()
    setTestingWatchList(false)
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
      <div className="container">

        <h1>Watchlist</h1>

        <div>

          {testingWatchList && <p>Watchlist test is currently running</p>}

          {!testingWatchList && watchListPass && <p style={{color: 'green'}}>Watchlist test passes</p>}

          {!testingWatchList && !watchListPass && <p style={{color: 'red'}}>Watchlist test fails</p>}

        </div>
      </div>
    </>
  );
}

export default Test;