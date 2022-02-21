import React from 'react';
import './Dashboard.css';
import './Pages.css';
import graph from './graph.svg';
// try unordred list 

function Dashboard() {
    return (
      <>
        <div className='graph'>
          <img src ={graph}></img>
        </div>

        <div className='watchlist'>
          <div>
            <Container>
              Stock: APPL
              Price: $135
            </Container>
          </div>
          <div>
            <Container>
              Stock: APPL
              Price: $135
            </Container>
          </div>
          <div>
            <Container>
              Stock: APPL
              Price: $135
            </Container>
          </div>
        </div>
      

      </>
    );
  }
  
  export default Dashboard;

function Container(props){
  return(
    <p className='rectangle'>{props.children}</p>
  );
}