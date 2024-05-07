import React, { useContext } from 'react';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import Shop_detail from '../user/container/Shop_detail/Shop_detail';
import Cart from '../user/container/Page/Cart';
import Page from '../user/container/Page/Page';
import Cheackout from '../user/container/Page/Cheackout';
import Testimonial from '../user/container/Page/Testimonial';
import Contact from '../user/container/Contact/Contact';
import Footer from '../user/component/Footer/Footer';
import PrivateRoutes from './PrivateRoutes';
import Review from '../user/container/Review/Review';
import { ThemeContext } from '../context/TheamContext';

function UserRoutes(props) {
    const themeContext=useContext(ThemeContext);
    console.log(themeContext);
    return (

        <div className={themeContext.theme}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Shop" element={<Shop />} />
                <Route exact path="/Shop/:id" element={<Shop_detail />} />
                <Route exact path="/Shop_de" element={<Shop_detail />} />
           
                <Route element={<PrivateRoutes />}>
                <Route exact path="/Cart" element={<Cart />} />
                <Route exact path="/Cheackout" element={<Cheackout />} />
                <Route exact path="/Testimonial" element={<Testimonial />} />
                <Route exact path="/Contect" element={<Contact />} />
                <Route exact path="/Page" element={<Page />} />
                <Route exact path="/Review" element={<Review />} />
                </Route>
            



            </Routes>
            <Footer />
        </div>

    );
}

export default UserRoutes;