//imports
import React from 'react';
import '../Pages/Pages.css';
import Dashboard from "../Pages/Dashboard";
import Welcome from "../Pages/Welcome";
import Settings from "../Pages/Settings";
import { Routes, Route, Redirect } from "react-router-dom";
import Modal from '../Modal/Modal';
import Stock from '../Pages/Stock';
import { useAuth } from '../../firebase.js';
import { RequireAuth } from './RequireAuth.tsx';

//function
function Views() {
    const currentUser = useAuth();
    return (
        <>
            {/*Routes the pages*/}
            <Routes>
                <Route index element={<Welcome></Welcome>} />
                <Route path='/welcome' element={<Welcome></Welcome>} />
                <Route path='/dashboard' element={ <RequireAuth><Dashboard></Dashboard></RequireAuth> }/>
                <Route path='/settings' element={ <RequireAuth><Settings></Settings></RequireAuth> }/>
                <Route path='/stock/*' element={ <RequireAuth><Stock></Stock></RequireAuth> }/>
                <Route path='*' element={<div><h1>404<br />Error, Page Not Found</h1></div>} />
            </Routes>
        </>
    );
}


export default Views;
