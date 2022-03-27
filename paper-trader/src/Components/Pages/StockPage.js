import { React, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './StockPage.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ScrollList from '../ScrollList/ScrollList';
import Button from '../Button/Button.js';
import Modal from '../Modal/Modal';
import StockGraph from '../StockGraph/StockGraph';
import { AnimatePresence, motion } from 'framer-motion';
import News from '../News/News';
import Box from '../Box/Box';

const StockPage = (props) => {

    const modalRef = useRef();

    const location = useLocation();
    const ticker = location.pathname.substring(7);

    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);

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

    Stock.ticker = ticker

    return (
        <>
            <div className='stockPageContent'>


                {/* Page Title */}
                <div className='stockPageTop'>
                    <h1 id='ticker'>{Stock.name} ({Stock.ticker.toUpperCase()})</h1>
                    <Button buttonStyle='btn--primary--outline'>Add to Watch List</Button>
                </div>


                {/* Graph and Watchlist Div */}
                <div className='graphAndWatchlist'>

                    <div className='graph-box'>

                        {/*generates graph from test data this will need to be changed for graph */}
                        <StockGraph title={ Stock.ticker.toUpperCase() }></StockGraph>

                    </div>


                    {/* Watchlist placeholder*/}
                    <ScrollList title="Watch List" stockName="APPL" price="$135" upDown="+4%" data={[5, 10, 5, 18, 20, 8, 15, 12, 4, 21]}> </ScrollList>

                </div>




                {/* Stock Details and Order Button */}
                <Box>
                    <div className='buyStockItem'>
                        <h3>{Stock.ticker.toUpperCase()}: ${Stock.price}</h3>
                        <Button buttonSize='btn--medium' buttonStyle='btn--primary--solid' onClick={() => modalRef.current.open()}>New Order</Button>
                    </div>
                    <div className='buyStockItem'>
                        <h3>Current Holdings: </h3>
                        <p>None</p>
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

                {/* <div className='buyStockBox'>

                </div> */}


                {/* News Component with Dummy Values */}
                <News></News>


                {/* Order Popup */}

                <Modal ref={modalRef} type='order'>

                    {!buy && !sell &&
                        <>
                            <h2>{Stock.name.toUpperCase()}</h2>
                            <p>Select Order Type</p>
                            <Button buttonStyle='btn--primary--outline' onClick={() => setBuy(true)}>Buy</Button>
                            <Button buttonStyle='btn--primary--outline' onClick={() => setSell(true)}>Sell</Button>
                        </>
                    }

                    {buy && !sell &&
                        <>
                            <h2>{Stock.name.toUpperCase()} - Buy Order</h2>
                            <input autoFocus id='quantity' className='signInFields' placeholder="Quantity" /><br />
                            <Button buttonStyle='btn--primary--outline'>Execute Market Order</Button>
                            <br />
                            <Button buttonStyle='btn--primary--solid' onClick={() => { setSell(false); setBuy(false) }}>Back</Button>
                        </>
                    }

                    {!buy && sell &&
                        <>
                            <h2>{Stock.name.toUpperCase()} - Sell Order</h2>
                            <input autoFocus id='quantity' className='signInFields' placeholder="Quantity" /><br />
                            <Button buttonStyle='btn--primary--outline'>Execute Market Order</Button>
                            <p className='buySellParagraph'>Warning: if you sell a quantity more than what you currently own, you will be entering a short position. Shorting a stock is risky</p>
                            <Button buttonStyle='btn--primary--solid' onClick={() => { setSell(false); setBuy(false) }}>Back</Button>
                        </>
                    }


                </Modal>


            </div>
        </>
    )
}

export default StockPage