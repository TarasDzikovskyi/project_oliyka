import React from 'react';
import {useLocation, Routes, Route, Navigate} from "react-router-dom";
import Auth from "../pages/Auth";
import Map from "../pages/Map";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

function Routers() {
    const location = useLocation();
    // console.log(location);


    return (
        <div>
            <Routes location={location} key={location.pathname}>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={ <Map/>}/>
                </Route>

                <Route path='*' element={ <ErrorPage/>}/>
                <Route path='/auth' element={<Auth/>}/>
            </Routes>


        </div>
    );
}

export default Routers;