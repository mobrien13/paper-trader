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
    // const [loadState, setLoadState] = useState(false);

    //get watchlist (async)
    useEffect(() => {
        getUserWatchList().then(result => {
            //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
            if(watchlist!==null){
                setWatchlist(result)
                console.log("get/set watchlist")
            }
        });
    }, [])


    //try making a function inn scrolllist that is called on stockpage button click 

    return (
        <>
            <div className='scroll-list-container'>

                <div className='list-title'>{props.title}</div>

                <div className='scroll-list'>

                    {/* //list of all stocks within the scroll list */}


                    {watchlist.length>=1 && watchlist.map((item) =>

                        <ScrollListItem
                            // pulls stockname from users watchlist
                            stockName={item.toUpperCase()}

                            //update parent list (this compoente) when child item (scrollListItem) is removed
                            changeWatchlist={(newList) => setWatchlist(newList)}
                        // changeLoading={() => setLoadState(true)}

                        ></ScrollListItem>
                    )
                    }
                    
                    <div className='blankItem'>
                        
                    </div>


                </div>

            </div>
        </>

    );

}


export default ScrollList;