import React  from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Error from './components/Error';
import Home from './components/Home';
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {useSelector} from "react-redux";
function Router() {
    const { userToken } = useSelector((state) => state.login)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} exact />
                <Route path="/login" element={ userToken ? (<Navigate to="/"/>): (<Login />) } exact/>
                <Route path="home/*" element={ userToken ? (<Home />):( <ProtectedRoute />)} exact/>
                <Route path="*" element={ userToken ? (<Error />):( <ProtectedRoute />)} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;