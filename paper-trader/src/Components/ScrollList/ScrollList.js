import './ScrollList.css';
import ScrollListItem from '../ScrollListItem/ScrollListItem';
import { usersDatabase } from '../../fakeDatabase.js';
import { useEffect, useState } from 'react';
import { getUserWatchList } from '../../firebase';
import { renderMatches } from 'react-router-dom';

function ScrollList(props) {

    //fake database
    // const user = usersDatabase[0];
    // const watchlist = user.watchlist;

    //real database
    const [watchlist, setWatchlist] = useState([]);
    const [loadState, setLoadState] = useState(false);

    //get watchlist (async)
    if (watchlist.length === 0 && loadState === false){
        getUserWatchList().then(result => {
            //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
            setWatchlist(result)
        });
    }

    return (
        <>
            <div className='scroll-list'>
                <div className='list-title'>{props.title}</div>
                {/* //list of all stocks within the scroll list */}

                {watchlist.map((item) =>

                    <ScrollListItem
                        // pulls stockname from users watchlist
                        stockName={item.toUpperCase()}

                        // dummy data
                        price="$135" upDown="+4%" data={[5, 10, 5, 18, 20, 8, 15, 12, 4, 21]}

                        //update parent list (this compoente) when child item (scrollListItem) is removed
                        changeWatchlist={(newList) => setWatchlist(newList)}
                        changeLoading={() => setLoadState(true)}

                    ></ScrollListItem>
                )
                }

            </div>
        </>

    );

}


export default ScrollList;