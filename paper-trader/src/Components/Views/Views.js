//imports
import React from 'react';
import '../Pages/Pages.css';
import Dashboard from "../Pages/Dashboard";
import Welcome from "../Pages/Welcome";
import Settings from "../Pages/Settings";
import FourOFour from '../Pages/FourOFour';
import { Routes, Route, Redirect } from "react-router-dom";
import StockPage from '../Pages/StockPage';
import Test from '../Test/Test';
import { RequireAuth } from './RequireAuth.tsx';

//function
function Views() {
    return (
        <>
            {/*Routes the pages*/}

           { /*this uses react router to pass data to views */ }
            <Routes>
                <Route index element={<Welcome></Welcome>} />
                <Route path='/welcome' element={<Welcome></Welcome>} />
                <Route path='/dashboard' element={ <RequireAuth><Dashboard></Dashboard></RequireAuth> }/>
                <Route path='/settings' element={ <RequireAuth><Settings></Settings></RequireAuth> }/>
                <Route path='/stock/*' element={ <RequireAuth><StockPage></StockPage></RequireAuth> }/>
                <Route path='/test' element={ <RequireAuth><Test></Test></RequireAuth> }/>
                <Route path='*' element={ <FourOFour></FourOFour> } />
            </Routes>
        </>
    );
}


export default Views;
