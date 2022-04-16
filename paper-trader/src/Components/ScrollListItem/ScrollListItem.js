import { useState } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { usersDatabase } from '../../fakeDatabase.js';
import { getUserWatchList, setUserWatchList } from '../../firebase';


const ScrollListItem = (props) => {
    //fake database
    // const user = usersDatabase[0];
    // const watchlist = user.watchlist;

    //real database
    const [watchlist, setWatchlist] = useState([]);

    //get watchlist (async)
    getUserWatchList().then(result => {
        //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
        setWatchlist(result)
    });

    //function to remove item from watchlist
    const removeItem = () => {
        // watchlist = removeByValue(props.stockName);
        for (let i = watchlist.length - 1; i >= 0; i--) {
            if (watchlist[i].toUpperCase() === props.stockName.toUpperCase()) {
                // console.log('splicing')
                watchlist.splice(i, 1);
                setUserWatchList(watchlist)

                //updates parent list
                props.changeWatchlist(watchlist)
                props.changeLoading()
            }
        }
    }

    return (
        <>

            <div className='list-body'>
                {/* // gives name and price to stock  */}
                <div>{props.stockName} <br></br>{props.price}</div>
                {/* //up and down prices */}
                <div>Up/Down<br></br>{props.upDown}</div>
                {/* //generates graph */}
                <Sparklines data={props.data} width={100} height={30} limit={8}>
                    <SparklinesLine color="black" style={{ fill: "none}" }} />
                </Sparklines>
                <div><i onClick={() => removeItem()} className="fa fa-minus-circle" aria-hidden="true"></i></div>
            </div>

        </>
    )
}

export default ScrollListItem