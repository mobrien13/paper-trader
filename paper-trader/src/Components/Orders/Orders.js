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
                setHoldings(result)
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
                setPastOrders(result)
            }
        })
    }, [])

    return (
        <>


            <div className='orders-container'>
                <h2 className='ordersHeading'>Holdings</h2>
                <button onClick={() => addUserToUsersData()}>add user</button>
                <button onClick={() => buyStock("tsla", 69, 6969)}>Buy Test</button>
                <div className='orders-content'>
                    {/* <ul>
                    {holdings.map((item) => <li className='ordersItem'>{item.ticker.toString().toUpperCase()}: {item.amount} Shares @ ${item.buyPrice}/share - Purchased on {item.timebought.toString()} </li>)}
                </ul> */}
                    <table>
                        <tr>
                            <th>Ticker</th>
                            <th>Purchase Price</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                            <th>Purcahse Date</th>
                        </tr>
                        {holdings.length >= 1 && holdings.map((item, i) => {
                            if (i > 0 && !holdings[i].isClosed) {
                                return (
                                    <OrderItem type="order" key={i} ticker={item.ticker} buyPrice={item.buyPrice} quantity={item.quantity} cost={item.buyPrice * item.quantity} date={item.timebought} ></OrderItem>
                                )
                            }
                        }
                        )}
                    </table>
                </div>

                <br />
                <Button onClick={() => modalRef.current.open()}>Show Past Orders</Button>
            </div>

            {/* Receipts Modal */}
            {/* probably need to add an overflow-y: scroll */}
            <Modal ref={modalRef} type='order'>
                <h2 className='ordersHeading'>Past Orders</h2>
                <table>
                    <tr>
                        <th>Ticker</th>
                        <th>Purchase Price</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                        <th>Total Profit</th>
                        <th>Purcahse Date</th>
                    </tr>
                    {
                        pastOrders.map((item, i) => {
                            return (
                                <OrderItem type="receipt" key={i} ticker={item.ticker} buyPrice={item.buyPrice} quantity={item.quantity} cost={item.buyPrice * item.quantity} profit={(item.sellPrice * item.quantity) - (item.buyPrice * item.quantity)} date={item.timebought} ></OrderItem>
                            )
                        })
                    }
                </table>
            </Modal>

        </>
    )
}

export default Orders