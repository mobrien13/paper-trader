import React, { useEffect, useState, useRef } from 'react';
import './Orders.css';
import { getHoldings, addUserToUsersData, buyStock, getPastOrders } from '../../firebase';
import Button from '../Button/Button';
import OrderItem from '../OrderItem/OrderItem';
import Modal from '../Modal/Modal';

const Orders = (props) => {
    //reference for modal
    const modalRef = useRef();

    //sets holdings initially to empty so it doesnt brick
    const [holdings, setHoldings] = useState([{
        ticker: "HOLDINGS IS EMPTY",
        quantity: 0,
        buyPrice: 0,
        isSold: false,
        sellPrice: null,
        timebought: Date.now(),
        timesold: null
    }]);

    //gets holdings from firestore
    useEffect(() => {
        getHoldings().then((result) => {
            if (result !== null && result.length >= 1) {
                setHoldings(result.reverse())
                console.log("setting holdings" + holdings);
            }
        })
    }, [])

    //past orders state array
    const [pastOrders, setPastOrders] = useState([])

    //gets the past orders array from firestore
    useEffect(() => {
        getPastOrders().then((result) => {
            if (result !== null && result.length >= 1) {
                setPastOrders(result.reverse())
            }
        })
    }, [])

    return (
        <>


            <div className='orders-container'>
                <h2 className='ordersHeading'>Holdings</h2>
                <button onClick={() => addUserToUsersData()}>add user</button>
                <br /><br />
                <div className='orders-grid'>

                    <h3>Ticker</h3>
                    <h3 className='hiddenOnMobile'>Purchase Price</h3>
                    <h3>Quantity</h3>
                    <h3 className='hiddenOnMobile'>Total Cost</h3>
                    <h3 className='hiddenOnMobile'>Purcahse Date</h3>
                    <h3>Quantity Sold</h3>
                    <h3 className='hiddenOnMobile'>Sell Price</h3>
                    <h3 className='hiddenOnMobile'>Sell Date</h3>

                    {holdings.length >= 1 && holdings.map((item, i) => {
                        if (i < (holdings.length - 1) && !holdings[i].isClosed) {

                            if(item.sellPrice === null){
                                return (
                                    <OrderItem type="order" key={i} ticker={item.ticker} buyPrice={item.buyPrice} quantity={item.quantity} cost={item.buyPrice * item.quantity} date={item.timebought} quantitySold={0} sellPrice={0} sellDate={null}></OrderItem>
                                )
                            }
                            else{
                                return (
                                    <OrderItem type="order" key={i} ticker={item.ticker} buyPrice={item.buyPrice} quantity={item.quantity} cost={item.buyPrice * item.quantity} date={item.timebought} quantitySold={item.quantitySold} sellPrice={item.sellPrice} sellDate={item.timesold}></OrderItem>
                                )
                            }
                        }
                    }
                    )}

                </div>

                <br />
                <Button onClick={() => modalRef.current.open()}>Show Past Orders</Button>
            </div>

            {/* Receipts Modal */}
            <Modal ref={modalRef} type='holdingsModal'>
                <h2 className='ordersHeading'>Past Orders</h2>
                <div className='pastOrdersBox'>
                    <div className='pastOrdersGrid'>

                        <h3>Ticker</h3>
                        <h3 className='hiddenOnMobile'>Purchase Price</h3>
                        <h3 className='hiddenOnMobile'>Quantity</h3>
                        <h3>Total Cost</h3>
                        <h3 className='hiddenOnMobile'>Sell Price</h3>
                        <h3>Total Profit</h3>
                        <h3 className='hiddenOnMobile'>Purcahse Date</h3>

                        {
                            pastOrders.map((item, i) => {
                                return (
                                    <OrderItem type="receipt" key={i} ticker={item.ticker} buyPrice={item.buyPrice} quantity={item.quantity} sellPrice={item.sellPrice} cost={item.buyPrice * item.quantity} profit={(item.sellPrice * item.quantity) - (item.buyPrice * item.quantity)} date={item.timebought} ></OrderItem>
                                )
                            })
                        }

                    </div>
                </div>
            </Modal>

        </>
    )
}

export default Orders