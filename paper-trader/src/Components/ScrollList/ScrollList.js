import './ScrollList.css';

function ScrollList(props){
    
    return(
        <>
        <div className='scroll-list'>
            <div className='list-title'>{props.title}</div>
            <ul>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
                <li className='list-body'>{props.stockName} {props.price}</li>
            </ul>
        </div> 
        </>
        
    );

}


export default ScrollList;