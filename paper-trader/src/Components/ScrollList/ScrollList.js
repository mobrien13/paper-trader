import './ScrollList.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

function ScrollList(props){
    
    return(
        <>
        <div className='scroll-list'>
            <div className='list-title'>{props.title}</div>
                
                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>    

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>

                <div className='list-body'>
                        <div>{props.stockName} <br></br>{props.price}</div> 
                        <div>Up/Down<br></br>{props.upDown}</div>
                        <Sparklines data={props.data} width={100} height={30} limit={8}>
                            <SparklinesLine color="black" style={{ fill: "none}"}}/>
                        </Sparklines>
                </div>
        
        
        
        
        
        </div> 
        </>
        
    );

}


export default ScrollList;