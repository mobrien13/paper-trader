import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const ScrollListItem = (props) => {
    return (
        <>

            <div className='list-body'>
                {/* // gives name and price to stock  */}
                <div>{props.stockName} <br></br>{props.price}</div>
                {/* //up and down prices */}
                <div>Up/Down<br></br>{props.upDown}</div>
                {/* //generates graph */}
                <Sparklines data={props.data} width={100} height={30} limit={8}>
                    <SparklinesLine color="black" style={{ fill: "none}" }} />
                </Sparklines>
                <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
            </div>

        </>
    )
}

export default ScrollListItem