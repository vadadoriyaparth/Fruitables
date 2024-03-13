import logo from './logo.svg';
import './App.css';
import Home from './user/container/Home/Home';
import Footer from './user/component/Footer/Footer';
import Header from './user/component/Header/Header';
import { Route, Router, Routes } from 'react-router-dom';
import Shop from './user/container/Shop/Shop';
import Shop_detail from './user/container/Shop_detail/Shop_detail';
import Cart from './user/container/Page/Cart';
import Page404 from './user/container/Page/Page';
import Cheackout from './user/container/Page/Cheackout';
import Testimonial from './user/container/Page/Testimonial';
import Contact from './user/container/Contact/Contact';
import Page from './user/container/Page/Page';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Shop" element={<Shop />} />
        <Route exact path="/Shop_de" element={<Shop_detail />} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/Page" element={<Page/>} />
        <Route exact path="/Cheackout" element={<Cheackout />} />
        <Route exact path="/Testimonial" element={<Testimonial />} />
        <Route exact path="/Contect" element={<Contact />} />



      </Routes>
      <Footer />
    </>
  );
}

export default App;
