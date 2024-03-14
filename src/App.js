import logo from './logo.svg';
import './App.css';

import { Route, Router, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';


function App() {
  return (
    <>
      <Routes>
       <Route exact path='/*' element={<UserRoutes/>}/>
       <Route exact path='/admin/*' element={<AdminRoutes/>}/>
      </Routes>
      
    </>
  );
}

export default App;
