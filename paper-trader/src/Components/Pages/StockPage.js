import { React, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './StockPage.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ScrollList from '../ScrollList/ScrollList';
import Button from '../Button/Button.js';
import Modal from '../Modal/Modal';

const StockPage = (props) => {

    const modalRef = useRef();

    const location = useLocation();
    const ticker = location.pathname.substring(7);

    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);

    return (
        <>
            {/* Page Title */}
            <h1 id='ticker'>{ticker.toUpperCase()}</h1>

            {/* Graph and Watchlist Div */}
            <div className='graphAndWatchlist'>


                {/*generates graph from sparkline data, this will need to be changed for graph */}
                <div className='graph-box'>
                    <div className='graph'>
                        <Sparklines data={[5, 10, 5, 18, 20, 8, 15, 12]} width={100} height={30} margin={5} >
                            <SparklinesLine color="black" style={{ fill: "none}" }} />
                        </Sparklines>
                    </div>
                </div>


                {/* Watchlist placeholder*/}
                <ScrollList title="Watch List" stockName="APPL" price="$135" upDown="+4%" data={[5, 10, 5, 18, 20, 8, 15, 12, 4, 21]}> </ScrollList>

            </div>




            {/* Stock Details and Order Button */}
            <div className='buyStockBox'>
                <div className='buyStockItem'>
                    <h2>{ticker.toUpperCase()} $135.00</h2>
                    <Button buttonSize='btn--medium' buttonStyle='btn--primary--solid' onClick={() => modalRef.current.open()}>New Order</Button>
                </div>
                <div className='buyStockItem buyStockItemRight'>
                    <p>Day High: $140.00</p>
                    <p>Day Low: $130.00</p>
                </div>
            </div>


            {/* Order Popup */}

            <Modal ref={modalRef}>

                {!buy && !sell &&
                    <>
                        <h2>{ticker.toUpperCase()}</h2>
                        <p>Select Order Type</p>
                        <Button buttonStyle='btn--primary--outline' onClick={() => setBuy(true)}>Buy</Button>
                        <Button buttonStyle='btn--primary--outline' onClick={() => setSell(true)}>Sell</Button>
                    </>
                }

                {buy && !sell &&
                    <>
                        <h2>{ticker.toUpperCase()} - Buy Order</h2>
                        <input autoFocus id='quantity' className='signInFields' placeholder="Quantity" /><br />
                        <Button buttonStyle='btn--primary--outline'>Execute Market Order</Button>
                        <br />
                        <Button buttonStyle='btn--primary--solid' onClick={() => { setSell(false); setBuy(false) }}>Back</Button>
                    </>
                }

                {!buy && sell &&
                    <>
                        <h2>{ticker.toUpperCase()} - Sell Order</h2>
                        <input autoFocus id='quantity' className='signInFields' placeholder="Quantity" /><br />
                        <Button buttonStyle='btn--primary--outline'>Execute Market Order</Button>
                        <p className='buySellParagraph'>Warning: if you sell a quantity more than what you currently own, you will be entering a short position. Shorting a stock is risky</p>
                        <Button buttonStyle='btn--primary--solid' onClick={() => { setSell(false); setBuy(false) }}>Back</Button>
                    </>
                }

            </Modal>


        </>
    )
}

export default StockPage