import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';
import Layout from '../admin/component/Layout/Layout';
import Reviews from '../admin/container/Reviews/Reviews';
import Category from '../admin/container/Category/Category';
import Fesellity from '../admin/container/Fesellity/Fesellity';
import { Provider } from 'react-redux';
import { storeReduces } from '../redux/Store';
import Counter from '../admin/container/Counter/Counter';

function AdminRoutes(props) {
    return (

          
            <Layout>
             <Routes>
                <Route exact path="/Product" element={<Product />}/>
                <Route exact path="/Reviews" element={<Reviews />}/>
                <Route exact path="/Category" element={<Category />}/>
                <Route exact path="/Fesellity" element={<Fesellity />}/>
                <Route exact path="/Counter" element={<Counter />}/>


             </Routes>
             </Layout>
       
    );
}

export default AdminRoutes;