import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';

function AdminRoutes(props) {
    return (

        <div>
             <Routes>
                <Route exact path="/Product" element={<Product />}/>
             </Routes>
        </div>
    );
}

export default AdminRoutes;