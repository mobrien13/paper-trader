import React from 'react'

// may need to make the order into two sepearate tables so that it can overflow??
// or just use flexbox


const OrderItem = (props) => {
    return (
        <>
            {props.type === "order" &&
                <>
                    <p>{props.ticker}</p>
                    <p>${props.buyPrice.toFixed(2)}/share</p>
                    <p>{props.quantity} shares</p>
                    <p>${props.cost.toFixed(2)}</p>
                    <p>{new Date(props.date).toDateString()}</p>
                </>
            }
            {props.type === "receipt" &&
                <>
                    <p>{props.ticker}</p>
                    <p>${props.buyPrice.toFixed(2)}/share</p>
                    <p>{props.quantity} shares</p>
                    <p>${props.cost.toFixed(2)}</p>
                    <p>${props.sellPrice}</p>
                    <p>${props.profit.toFixed(2)}</p>
                    <p>{new Date(props.date).toDateString()}</p>
                </>
            }
        </>
    )
}

export default OrderItem