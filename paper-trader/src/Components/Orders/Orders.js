import React, { useEffect, useState, useRef } from 'react';
import './Orders.css';
import { getHoldings, addUserToUsersData, buyStock, getReceipts } from '../../firebase';
import Button from '../Button/Button';
import OrderItem from '../OrderItem/OrderItem';
import Modal from '../Modal/Modal';

const Orders = (props) => {
    //reference for modal
    const modalRef = useRef();


    //sets holdings initially to empty so it doesnt brick
    const [holdings, setHoldings] = useState([{
        ticker: "HOLDINGS IS EMPTY",
        amount: 0,
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

    //receipts state array
    const [receipts, setReceipts] = useState([])

    //gets the receipts array from firestore
    useEffect(() => {
        getReceipts().then((result) => {
            if (result !== null && result.length >= 1) {
                setReceipts(result)
                console.log("setting receipts" + receipts);
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
                            if (i > 0) {
                                return (
                                    <OrderItem key={i} ticker={item.ticker} buyPrice={item.buyPrice} amount={item.amount} cost={item.buyPrice * item.amount} date={item.timebought} ></OrderItem>
                                )
                            }
                        }
                        )}
                    </table>
                </div>

                <br />
                <Button onClick={() => modalRef.current.open()}>Show Older Orders</Button>
            </div>

            {/* Receipts Modal */}
            {/* probably need to add an overflow-y: scroll */}
            <Modal ref={modalRef} type='order'>
                <ul>
                    {
                        receipts.map((item, i) => {
                            if (i > 0) {
                                return (
                                    <li>{item.ticker}</li>
                                )
                            }
                        })
                    }
                </ul>
            </Modal>

        </>
    )
}

export default Orders