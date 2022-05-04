import React, { useEffect, useState } from 'react';
import './Orders.css';
import { getHoldings, addUserToUsersData, buyStock } from '../../firebase';
import Button from '../Button/Button';
import OrderItem from '../OrderItem/OrderItem';

const Orders = (props) => {
    const [holdings, setHoldings] = useState([{
        ticker: "HOLDINGS IS EMPTY",
        amount: 0,
        buyPrice: 0,
        isSold: false,
        sellPrice: null,
        timebought: Date.now(),
        timesold: null
    }]);

    useEffect(() => {
        getHoldings().then((result) => {
            if (result !== null && result.length >= 1) {
                setHoldings(result)
                console.log("setting holdings" + holdings);
            }
        })
    }, [])

    return (
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
            <Button>Show Older Orders</Button>
        </div>
    )
}

export default Orders