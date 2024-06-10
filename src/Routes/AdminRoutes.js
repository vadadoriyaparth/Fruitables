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
import Coupan from '../admin/container/Coupan/Coupan';
import Newproduct from '../admin/container/Newproduct/Newproduct';
import Productss from '../admin/container/Productss/Productss';
import { useContext } from 'react';
import { ProductssContext } from '../context/ProductssContext';
import Contect from '../admin/container/Contect/Contect';
import Subcategory from '../admin/container/Subcategory/Subcategory';


function AdminRoutes(props) {
    return (

        <div >

                <Layout>
                    <Routes>
                        <Route exact path="/Product" element={<Product />} />
                        <Route exact path="/Reviews" element={<Reviews />} />
                        <Route exact path="/Category" element={<Category />} />
                        <Route exact path="/Fesellity" element={<Fesellity />} />
                        <Route exact path="/Counter" element={<Counter />} />
                        <Route exact path="/Coupan" element={<Coupan />} />
                        <Route exact path="/Newproduct" element={<Newproduct />} />
                        <Route exact path="/Productss" element={<Productss />} />
                        <Route exact path="/Contect" element={<Contect/>} />
                        <Route exact path="/Subcategory" element={<Subcategory/>} />


                    </Routes>
                </Layout>
            
        </div>


    );
}

export default AdminRoutes;