import React from 'react';
import Button from './Components/Button/Button';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <Navbar>
      <Button text = "Log In" />
      <Button text = "Sign Up" />
    </Navbar>
  );
}


export default App;
