import React from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes(props) {
    let auth = true;

    return (
        
        auth ? <Outlet/>:<Navigate to={"/"} replace />
        
    );
}

export default PrivateRoutes;