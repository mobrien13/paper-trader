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
    <a href="/dashboard" >test</a>

    {/*Routes the pages*/}
    <BrowserRouter>
        <Routes>
            <Route index element={<Home></Home>}/>
            <Route path='/home' element={<Home></Home>}/>
            <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
            <Route path='/settings' element={<Settings></Settings>}/>
        </Routes>
    </BrowserRouter>
    </>
    );
  }
  
  
  export default Views;
  