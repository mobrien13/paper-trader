import { React, useState} from 'react'
import './Search.css';
import { useNavigate } from 'react-router-dom';


//creates search func with useState to pass data
const Search = () => {
    const [ticker, setTicker] = useState('');

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            //anything to do with the input submit goes here
    
            //logs the keypress
            console.log('key pressed');
    
            //clears input
            //var ticker = document.getElementById('searchInput').value;
            //document.getElementById('searchInput').value ='';
            
            fetch(fetch("https://api.tdameritrade.com/v1/marketdata/"+ticker+"/quotes?apikey=LSVZWEQEHTTZGGWUYS1ZKNA0OAQCCVDD")
            .then(res => res.json())
            .then(
                (data) => {
                    const isEmpty = Object.keys(data).length

                    if(isEmpty !== 0){
                       //renders page
                       routeChange(ticker); 
                    }
                    else{
                       alert("invalid ticker")
                       document.getElementById('searchInput').value ='';
                    }
                }
            )
        )        
    }
}    

    //useNavigate hook
    let navigate = useNavigate();

    //routes the page
    //change route to check if stock is valid stock
    const routeChange = (ticker) =>{ 
        navigate('stock/' + ticker);
    }

    return (
        <>
            <li>
                {/* //generates search input and runs handleKeyPress */}
                <input id='searchInput' placeholder='Enter Symbol' onKeyPress={ handleKeyPress } onChange={event => setTicker(event.target.value)}></input>
            </li>
        </>
    )
}

export default Search