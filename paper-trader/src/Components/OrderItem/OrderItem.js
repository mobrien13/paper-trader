import React from 'react'

// may need to make the order into two sepearate tables so that it can overflow??
// or just use flexbox


const OrderItem = (props) => {
    return (
        <>
            {props.type === "order" &&
                <>
                    <tr key={props.key}>
                        <td>{props.ticker}</td>
                        <td>${props.buyPrice}/share</td>
                        <td>{props.quantity} shares</td>
                        <td>${props.cost}</td>
                        <td>{new Date(props.date).toDateString()}</td>
                    </tr>
                </>
            }
            {props.type === "receipt" &&
                <>
                    <tr key={props.key}>
                        <td>{props.ticker}</td>
                        <td>${props.buyPrice}/share</td>
                        <td>{props.quantity} shares</td>
                        <td>${props.cost}</td>
                        <td>${props.profit}</td>
                        <td>{new Date(props.date).toDateString()}</td>
                    </tr>
                </>
            }
        </>
    )
}

export default OrderItem