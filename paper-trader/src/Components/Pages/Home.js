import React from 'react';
import './Home.css';
import './Pages.css';
import {Link} from 'react-router-dom';

function Home() {
    return (
    <>
        <h1>Home</h1>
        <Link to='home'><p>test</p></Link>
    </>
    );
  }
  
  
  export default Home;