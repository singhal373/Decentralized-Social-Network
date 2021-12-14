import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Home from './components/Home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Registration from './components/Registration';
import Newsfeed from './components/Newsfeed';
export default function App(){
    return (
        <BrowserRouter>
        <Routes>      
         <Route path="/Login" element={<Login/>}/>
         <Route path="/Registration" element={<Registration/>}/>
            <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));