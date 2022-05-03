import React from 'react'

const OrderItem = (props) => {
    return (
        <>
            <tr key={props.key}>
                <td>{props.ticker.toString().toUpperCase()}</td>
                <td>${props.buyPrice}/share</td>
                <td>{props.amount} shares</td>
                <td>${props.cost}</td>
                <td>{props.date}</td>
            </tr>
        </>
    )
}

export default OrderItem