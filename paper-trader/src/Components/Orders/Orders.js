import React, { useEffect, useState } from 'react';
import './Orders.css';
import { getHoldings, addUserToUsersData } from '../../firebase';
import Button from '../Button/Button';
import OrderItem from '../OrderItem/OrderItem';

const Orders = (props) => {
    const [holdings, setHoldings] = useState([]);
    
    useEffect(() => {
        getHoldings().then((result) => {
            setHoldings(result)
            console.log(holdings);
        })
    }, [])

    return (
        <div className='orders-container'>
            <h2 className='ordersHeading'>Holdings</h2>
            {/* <button onClick={() => addUserToUsersData()}>add user</button> */}
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
                    {holdings.map((item, i) => <OrderItem key={i} ticker={item.ticker} buyPrice={item.buyPrice} amount={item.amount} cost={item.buyPrice * item.amount} date={props.timebought} ></OrderItem>)}
                </table>
            </div>

            <br />
            <Button>Show Older Orders</Button>
        </div>
    )
}

export default Orders