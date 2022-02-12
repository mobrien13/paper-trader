import React from 'react';
import Button from './Components/Button/Button';
import Navbar from './Components/Navbar/Navbar';
import Views from './Components/Views/Views';
import {Link} from 'react-router-dom';

function App() {
  return (
  <>
    <Navbar>
      <Button text = "Log In" />
      <Button text = "Sign Up" />
    </Navbar>


    {/*Test menu for switching between pages (to prevent editing the Navbar and causing merge conflicts*/}
    

    {/*Views is the container for all site content*/}
    <Views/>
  </>
  );
}


export default App;
