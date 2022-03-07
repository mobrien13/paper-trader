//imports
import React from 'react';
import '../Pages/Pages.css';
import Dashboard from "../Pages/Dashboard";
import Welcome from "../Pages/Welcome";
import Settings from "../Pages/Settings";
import { Routes, Route } from "react-router-dom";
import Modal from '../Modal/Modal';
import Stock from '../Pages/Stock';
import { useAuth } from '../../firebase.js';

//function
function Views() {
    const currentUser = useAuth();

    const dashboard = () => {
        if(currentUser!=null){
            return (<Dashboard></Dashboard>)
        }
        else{
            return (<h1>Please Log In Before Using the Dashboard</h1>)
        }
    }
    const settings = () => {
        if(currentUser!=null){
            return (<Settings></Settings>)
        }
        else{
            return (<h1>Please Log In Before Using Settings</h1>)
        }
    }
    const stock = () => {
        if(currentUser!=null){
            return <Stock></Stock>;
        }
        else{
            return <h1>Please Log In Before Using the Stock Pages</h1>
        }
    }

    return (
        <>
            {/*Routes the pages*/}
            <Routes>
                <Route index element={<Welcome></Welcome>} />
                <Route path='/welcome' element={<Welcome></Welcome>} />
                
                <Route path='/dashboard' element={ dashboard() } />
                <Route path='/settings' element={ settings() } />
                <Route path='/stock/*' element={ stock() } />

                <Route path='*' element={<div><h1>404<br />Error, Page Not Found</h1></div>} />
            </Routes>
        </>
    );
}


export default Views;
