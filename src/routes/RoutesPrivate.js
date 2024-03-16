import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const RoutesPrivate = () => {

    const userConnected = localStorage.getItem('tokenUser');
    
    return (
        userConnected ? <Outlet /> : <Navigate to="/" />
    )
}

export default RoutesPrivate