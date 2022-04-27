import { React, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './StockPage.css';
import ScrollList from '../ScrollList/ScrollList';
import Button from '../Button/Button.js';
import Modal from '../Modal/Modal';
import StockGraph from '../StockGraph/StockGraph';
import StockGraphLive from '../StockGraph/StockGraphLive';
import { AnimatePresence, motion } from 'framer-motion';
import News from '../News/News';
import Box from '../Box/Box';
import { addToWatchlist, getUserWatchList, buyStock, getHoldings, sellStock } from '../../firebase';


const StockPage = (props) => {
    const modalRef = useRef();

    const location = useLocation();
    const ticker = location.pathname.substring(7);

    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    // Data defines whether StockGraph is defining live or historical data (0 = historical, 1 = live)
    const [data, setData] = useState(0);

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    //Name of company
    const [name, setName] = useState(null);

    // Used for rendering data if ticker exists
    const [exists, setExists] = useState(0);

    //creates stock object within stock page
    const Stock = {
        price: 1.0,
        percentUp: 1.0,
        dayHigh: 1.0,
        dayLow: 1.0,
        fiftyTwoHigh: 1.0,
        fiftyTwoLow: 1.0,
        name: "Name",
        ticker: "MMMM",
        marketCap: 1.0
    }

    //sets data to 0 whenever the location changes
    useEffect(() => {
        setData(0);
    }, [location]);


    // Gets Stock Price From Ameritrade API for Current price, day high and day low
    Stock.ticker = ticker.toUpperCase()
    useEffect(() => {
        let currentTime =  Date.now() -  (86400000)
        fetch("https://api.tdameritrade.com/v1/marketdata/" + Stock.ticker + "/pricehistory?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD&periodType=day&period=3&frequencyType=minute&frequency=1&needExtendedHoursData=false")
            .then(res => res.json())
            .then(
                (data) => {
                    let ary = [], close = []
                    let min = 0, max = 0
        
                    for (var i = 0; i < data.candles.length; i++) {
                        if(new Date(data.candles[i].datetime) <= currentTime){
                            ary.push(Number(data.candles[i].high))
                            ary.push(Number(data.candles[i].low))
                            close.push(Number(data.candles[i].close))
                        }   
                    }

                    for(let x = 0; x < ary.length; x++){
                        if(ary[x] > max && x === 0){
                            max = ary[x]
                            min = ary[x]
                        }

                        if(ary[x] > max){
                            max = ary[x]
                        }

                        if(ary[x] < min){
                            min = ary[x]
                        }
                    }

                    setMax(max)
                    setMin(min)
                    setPrice((Number(close[close.length - 1])).toFixed(2));
                }
            )
    }, [ticker]);
    Stock.price = price
    Stock.dayHigh = max
    Stock.dayLow = min
 
    //Gets Stock name from Ameritrade API and cuts off uneeded characters and checks if stock exists
    useEffect(() => {
        fetch("https://api.tdameritrade.com/v1/marketdata/" + Stock.ticker + "/quotes?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD")
            .then(res => res.json())
            .then(
                (data) => {

                    const isEmpty = Object.keys(data).length

                    if (isEmpty !== 0) {
                        //renders page
                        setExists(1);
                    }
                    else {
                        setExists(2);
                    }

                    try {
                        let n = data[Stock.ticker].description
                        n = n.replaceAll(" - Common Stock","")

                        if(n.length > 35){
                            n = n.substring(0,32)
                            let c = "..."
                            n = n.concat(c)
                        }
                        else{
                            n = n.substring(0,35)
                        }
                        setName(n)
                       
                    }
                    catch (e){
                        setName("failed to load")
                    }  
                }
            )
    }, [ticker]);
    Stock.name = name
/////////////////////////////////////////////////////////////////END FETCH CALLS//////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    useEffect(() => {
        getHoldings().then(result => {
            setUserHoldings(result)})
    }, [ticker])
    
    //set holdings whenever the ticker changes - in the future we will need this to update whenever something is bought or sold aswell
    const [userHoldings, setUserHoldings] = useState([])
 

    return (
        <>
            <div className='stockPageContent container'>

                {/* Page Title */}
                {exists === 1 && <div className='stockPageTop'>
                    <h1 id='ticker'>{Stock.name}</h1>
                    <Button onClick={() => addToWatchlist(ticker)} buttonStyle='btn--primary--outline'>Add to Watch List</Button>
                    <Button onClick={() => setData(0)} buttonStyle='btn--primary--outline'>Historical</Button>
                    <Button onClick={() => setData(1)} buttonStyle='btn--primary--outline'>Live</Button>
                </div>
                }

                {/* Graph and Watchlist Div */}
                {exists === 1 &&
                    <div className='graphAndWatchlist'>

                        <div className='graph-box'>

                            {/*generates graph from test data this will need to be changed for graph */}
                            {data === 0 && <StockGraph title={Stock.ticker.toUpperCase()} ticker={Stock.ticker.toUpperCase()}></StockGraph>}

                            {data === 1 && <StockGraphLive title={Stock.ticker.toUpperCase()} ticker={Stock.ticker.toUpperCase()} data={data} ></StockGraphLive>}


                        </div>


                        {/* Watchlist placeholder*/}
                        <ScrollList title="Watch List"> </ScrollList>

                    </div>
                }



                {/* Stock Details and Order Button */}
                {exists === 1 &&
                    <Box>
                        <div className='buyStockItem'>
                            <h3>{Stock.ticker.toUpperCase()}: ${Stock.price}</h3>
                            <Button buttonSize='btn--medium' buttonStyle='btn--primary--solid' onClick={() => modalRef.current.open()}>New Order</Button>


                        </div>
                        <div className='buyStockItem'>
                            <h3>Current Holdings: </h3>
                            <ul>
                                {userHoldings.map((item) => !item.isSold && <li>{item.ticker.toUpperCase()}: {item.quantity} Shares @ ${item.buyPrice}/share</li>)}
                                {userHoldings.map((item) => item.isSold && <li>{item.ticker.toUpperCase()}: {item.quantity} Shares @ ${item.buyPrice}/share Sold @ ${item.sellPrice}/share</li>)}
                            </ul>
                        </div>
                        <div className='buyStockItem'>
                            <h3>Price History:</h3>
                            <p>Day High: ${Stock.dayHigh}</p>
                            <p>Day Low: ${Stock.dayLow}</p>
                        </div>
                        <div className='buyStockItem'>
                            <h3>Info:</h3>
                            <p>Market Cap: {Stock.marketCap}</p>
                            <p>52-Week Range: {Stock.fiftyTwoLow} - {Stock.fiftyTwoHigh}</p>
                        </div>
                    </Box>
                }
                {/* <div className='buyStockBox'>

                </div> */}


                {/* News Component with Dummy Values */}
                {exists === 1 &&
                    <News></News>
                }

                {/* Order Popup */}
                {exists === 1 &&
                    <Modal ref={modalRef} type='order'>

                        {!buy && !sell &&
                            <>
                                <h2>{Stock.ticker.toUpperCase()}</h2>
                                <p>Select Order Type</p>
                                <Button buttonStyle='btn--primary--outline' onClick={() => setBuy(true)}>Buy</Button>
                                <Button buttonStyle='btn--primary--outline' onClick={() => setSell(true)}>Sell</Button>
                            </>
                        }

                        {buy && !sell &&
                            <>
                                <h2>{Stock.ticker.toUpperCase()} - Buy Order</h2>
                                <input autoFocus id='quantity' className='signInFields' placeholder="Quantity" onChange={event => setAmount(event.target.value)} /><br />
                                <Button onClick={async () => {
                                    //waits for buy stock to complete and sets error message
                                    await buyStock(ticker, Stock.price, amount).then(result => {
                                        if (result === true) {
                                            //This is sent if the order successfully palces

                                            alert("Order placed")

                                        }
                                        if (result === false) {
                                            //This is sent if order fails

                                            alert("Order failed")
                                        }
                                    })
                                }} buttonStyle='btn--primary--outline'>Execute Market</Button>
                                <br />
                                <Button buttonStyle='btn--primary--solid' onClick={() => { setSell(false); setBuy(false) }}>Back</Button>
                            </>
                        }

                        {!buy && sell &&
                            <>
                                <h2>{Stock.ticker.toUpperCase()} - Sell Order</h2>
                                <input autoFocus id='quantity' className='signInFields' placeholder="Quantity" /><br />
                                <Button buttonStyle='btn--primary--outline' onClick={ async () => await sellStock(Stock.ticker, Stock.price)}>Execute Market Order</Button>
                                <p className='buySellParagraph'>Warning: if you sell a quantity more than what you currently own, you will be entering a short position. Shorting a stock is risky</p>
                                <Button buttonStyle='btn--primary--solid' onClick={() => { setSell(false); setBuy(false); console.log(getHoldings()) }}>Back</Button>
                            </>
                        }


                    </Modal>
                }

                {/* Stock Does Not Exist Error */}
                {exists === 2 &&
                    <h1>Stock Does Not Exist. Enter a Valid Ticker</h1>
                }

            </div>
        </>
    )
}
export default StockPage