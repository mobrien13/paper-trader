import { useEffect, useState } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { usersDatabase } from '../../fakeDatabase.js';
import { getUserWatchList, setUserWatchList } from '../../firebase';


const ScrollListItem = (props) => {
    //fake database
    // const user = usersDatabase[0];
    // const watchlist = user.watchlist;

    //real database
    const [watchlist, setWatchlist] = useState([]);

     // Watchlist data
     const [price,setPrice] = useState(0);
     const [upDown, setUpDown] = useState(0);
     const [closes] = useState([]);


    //function to remove item from watchlist
    async function removeItem()  {
        // watchlist = removeByValue(props.stockName);

        //get watchlist (async)
        await getUserWatchList().then(result => {
            //setting watchlist to watchlist vaslue, changes app state and will reload component with new watchlist
            setWatchlist(result)
        });

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

    useEffect(() => {
        // Grapbs last 10 days of data for upDown and sparkline and upDown
        fetch("https://api.tdameritrade.com/v1/marketdata/"+props.stockName+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=month&period=1&frequencyType=daily&frequency=1&needExtendedHoursData=false")
        .then(res => res.json())
        .then(
        (data) => {
                for (let i = data.candles.length -1; i >= data.candles.length-10; i--) {
                    closes.push(Number(data.candles[i].close));
                    
                }

                Array.prototype.reverse.call(closes);

                setUpDown((((closes[closes.length-1]-closes[0]) / closes[0]) * 100 ).toFixed(2));
            }
        )

        //Price is current minutes close
        fetch("https://api.tdameritrade.com/v1/marketdata/"+props.stockName+"/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=day&period=3&frequencyType=minute&frequency=1&needExtendedHoursData=false")
        .then(res => res.json())
        .then(
            (data) => {
                setPrice((Number(data.candles[data.candles.length-1].close)).toFixed(2));
            }
        )
      },[]);
    
    
   

    return (
        <>

            <div className='list-body'>
                {/* // gives name and price to stock  */}
                <div>{props.stockName} <br></br>{"$"+price}</div>
                {/* //up and down prices */}
                <div>Up/Down<br></br>{upDown+"%"}</div>
                {/* //generates graph */}
                <Sparklines data={closes} width={100} height={30} limit={8}>
                    <SparklinesLine color="black" style={{ fill: "none}" }} />
                </Sparklines>
                <div><i onClick={() => removeItem()} className="fa fa-minus-circle" aria-hidden="true"></i></div>
            </div>

        </>
    )
}

export default ScrollListItem;