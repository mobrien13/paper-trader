import React from 'react'
import './Search.css';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            //anything to do with the input submit goes here
    
            //logs the keypress
            console.log('key pressed');
    
            //clears input
            var ticker = document.getElementById('searchInput').value;
            document.getElementById('searchInput').value ='';
    
            //renders page
            routeChange(ticker);        
        }
    }    

    //useNavigate hook
    let navigate = useNavigate();

    //routes the page
    const routeChange = (ticker) =>{ 
        navigate('stock/' + ticker);
    }

    return (
        <>
            <li>
                <input id='searchInput' placeholder='   Enter Symbol' onKeyPress={ handleKeyPress }></input>
            </li>
        </>
    )
}

export default Search