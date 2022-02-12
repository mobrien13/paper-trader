//imports
import React from 'react';
import '../Pages/Pages.css';
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Settings from "../Pages/Settings";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

//function
function Views() {
    return (
    <>
    {/*Routes the pages*/}
    <Routes>
        <Route index element={<Home></Home>}/>
        <Route path='/home' element={<Home></Home>}/>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
        <Route path='/settings' element={<Settings></Settings>}/>
        <Route path='*' element={<div><h1>404<br/>Error, Page Not Found</h1></div>}/>
    </Routes>
    </>
    );
  }
  
  
  export default Views;
  