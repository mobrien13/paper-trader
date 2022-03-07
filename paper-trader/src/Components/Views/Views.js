//imports
import React from 'react';
import '../Pages/Pages.css';
import Dashboard from "../Pages/Dashboard";
import Welcome from "../Pages/Welcome";
import Settings from "../Pages/Settings";
import { Routes, Route } from "react-router-dom";
import Modal from '../Modal/Modal';
import Stock from '../Pages/Stock';

//function
function Views() {
    return (
    <>
    {/*Routes the pages*/}
    <Routes>
        <Route index element={<Welcome></Welcome>}/>
        <Route path='/welcome' element={<Welcome></Welcome>}/>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
        <Route path='/settings' element={<Settings></Settings>}/>
        <Route path='/stock/*' element={<Stock></Stock>}/>
        <Route path='*' element={<div><h1>404<br/>Error, Page Not Found</h1></div>}/>
    </Routes>
    </>
    );
  }
  
  
  export default Views;
  