import './ScrollList.css';
import ScrollListItem from '../ScrollListItem/ScrollListItem';
import { usersDatabase } from '../../fakeDatabase.js';
import { useEffect, useState } from 'react';
import { getUserWatchList } from '../../firebase';
import { renderMatches } from 'react-router-dom';
// import "react-toggle/style.css"
import Toggle from 'react-toggle';
import { stringify } from '@firebase/util';

function ScrollList(props) {

    //fake database
    // const user = usersDatabase[0];
    // const watchlist = user.watchlist;

    //real database
    const [watchlist, setWatchlist] = useState([]);
    // const [loadState, setLoadState] = useState(false);

    const [type, setType] = useState(true)

    //get watchlist (async)
    useEffect(() => {
        getUserWatchList().then(result => {
            //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
            if (watchlist !== null) {
                setWatchlist(result)
                console.log("get/set watchlist")
            }
        });
    }, [])

    var axios = require("axios").default;
    const [ary, setAry] = useState([])

    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v1/finance/trending/US',
        params: { modules: 'defaultKeyStatistics,assetProfile' },
        headers: {
            'x-api-key': 'VypvXxHoUD4phTAdK6H5xZvPWTcHzS9pn5jtCr90'
        }
    };

    /* --------------- GETS THE TRENDING DATA. UNCOMMMENT BEFORE PRESENTATION --------------- */

    // --------------- DO NOT DELETE ---------------

    
    useEffect(() => {
        axios.request(options).then(function (response) {
            console.log(response.data.finance.result[0].quotes);
            let trending = response.data.finance.result[0].quotes;
            for (let i = 0; i < trending.length; i++) {
                ary.push(response.data.finance.result[0].quotes[i]);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    





    //try making a function inn scrolllist that is called on stockpage button click 
    return (
        <>
            <div className='scroll-list-container'>

                <div className='list-title'>
                    <h2 className="list-title-name">
                        {type && props.title}
                        {!type && "Trending"}
                    </h2>
                    <label className="toggleSwitch">
                        <Toggle
                            icons={false}
                            onChange={() => setType(!type)} />
                        <span></span>
                    </label>
                </div>

                <div className='scroll-list'>

                    {!type &&

                        ary.map((item, i) => {
                            if (i < 10 && !item.symbol.includes('^') && !item.symbol.includes('=') && !item.symbol.includes('-')) {
                                return (
                                    <ScrollListItem
                                        // pulls stockname from trending
                                        stockName={item.symbol.toUpperCase()}

                                    ></ScrollListItem>
                                )
                            }
                        })

                    }
                    {/* //list of all stocks within the scroll list */}
                    {type &&


                        watchlist.length >= 1 && watchlist.map((item) =>

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