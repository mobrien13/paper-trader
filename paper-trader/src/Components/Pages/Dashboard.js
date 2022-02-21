import React from 'react';
import './Dashboard.css';
import './Pages.css';
import graph from './graph.svg';

function Dashboard() {
    return (
      <>
        <div className='graph'>
          <img src ={graph}></img>
        </div>

        <div className='watchlist'>
          <div>
            <container>
              Stock: APPL
              Price: $135
            </container>
          </div>
          <div>
            <container>
              Stock: APPL
              Price: $135
            </container>
          </div>
          <div>
            <container>
              Stock: APPL
              Price: $135
            </container>
          </div>
        </div>
      

      </>
    );
  }
  
  export default Dashboard;

function container(props){
  return(
    <p className='rectangle'>{props.children}</p>
  );
}