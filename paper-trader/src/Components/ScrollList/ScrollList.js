import './ScrollList.css';
import ScrollListItem from '../ScrollListItem/ScrollListItem';
import { usersDatabase } from '../../fakeDatabase.js';
import { useEffect } from 'react';
import { getUserWatchList } from '../../firebase';

//real database
let watchlist = [];
getUserWatchList().then(result => { watchlist = result });
console.log(watchlist);


function ScrollList(props) {

    //fake database
    // const user = usersDatabase[0];
    // const watchlist = user.watchlist;


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

                    ></ScrollListItem>
                )}


            </div>
        </>

    );

}


export default ScrollList;