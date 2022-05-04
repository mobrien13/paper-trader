import React from 'react'

const OrderItem = (props) => {
    return (
        <>
            <tr key={props.key}>
                <td>{props.ticker}</td>
                <td>${props.buyPrice}/share</td>
                <td>{props.amount} shares</td>
                <td>${props.cost}</td>
                <td>{new Date(props.date).toDateString()}</td>
            </tr>
        </>
    )
}

export default OrderItem