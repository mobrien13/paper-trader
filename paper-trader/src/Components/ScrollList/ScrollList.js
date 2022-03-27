import './ScrollList.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

function ScrollList(props){
    
    return(
        <>
        <div className='scroll-list'>
            <div className='list-title'>{props.title}</div>
                
                {/* //list of all stocks within the scroll list */}
                
                <div className='list-body'>
                    {/* // gives name and price to stock  */}
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        {/* //up and down prices */}
                        <div>Up/Down<br></br>{props.upDown}</div>
                        {/* //generates graph */}
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>    

{/* //The following was copy and pasted from above
//---------------------------------------------------------------------------------- */}
                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                        <div><i className="fa fa-minus-circle" aria-hidden="true"></i></div>
                </div>
        
        
        
        
        
        </div> 
        </>
        
    );

}


export default ScrollList;