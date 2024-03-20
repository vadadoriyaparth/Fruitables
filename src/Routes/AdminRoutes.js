import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';
import Layout from '../admin/component/Layout/Layout';
import Reviews from '../admin/container/Reviews/Reviews';
import Category from '../admin/container/Category/Category';

function AdminRoutes(props) {
    return (

        <div>
            <Layout>
             <Routes>
                <Route exact path="/Product" element={<Product />}/>
                <Route exact path="/Reviews" element={<Reviews />}/>
                <Route exact path="/Category" element={<Category />}/>
             </Routes>
             </Layout>
        </div>
    );
}

export default AdminRoutes;