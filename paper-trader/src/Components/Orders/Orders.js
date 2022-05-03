import React from 'react'
import './Orders.css';

const Orders = (props) => {
    return (
        <div className='orders-container'>
            <h2 className='ordersHeading'>Orders</h2>
            <div> {props.children} </div>
        </div>
    )
}

export default Orders