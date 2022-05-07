import React from 'react'

// may need to make the order into two sepearate tables so that it can overflow??
// or just use flexbox


const OrderItem = (props) => {
    return (
        <>
            {props.type === "order" &&
                <>
                    <p>{props.ticker}</p>
                    <p className='hiddenOnMobile'>${props.buyPrice.toFixed(2)}/share</p>
                    <p>{props.quantity} shares</p>
                    <p className='hiddenOnMobile'>${props.cost.toFixed(2)}</p>
                    <p className='hiddenOnMobile'>{new Date(props.date).toDateString()}</p>
                    <p>{props.quantitySold} shares</p>
                    <p className='hiddenOnMobile'>${props.sellPrice.toFixed(2)}</p>
                    <p className='hiddenOnMobile'>{props.sellDate !== null && new Date(props.sellDate).toDateString()}{props.sellDate === null && "N/A"}</p>
                </>
            }
            {props.type === "receipt" &&
                <>
                    <p>{props.ticker}</p>
                    <p className='hiddenOnMobile'>${props.buyPrice.toFixed(2)}/share</p>
                    <p className='hiddenOnMobile'>{props.quantity} shares</p>
                    <p>${props.cost.toFixed(2)}</p>
                    <p className='hiddenOnMobile'>${props.sellPrice}</p>
                    <p>${props.profit.toFixed(2)}</p>
                    <p className='hiddenOnMobile'>{new Date(props.date).toDateString()}</p>
                </>
            }
        </>
    )
}

export default OrderItem