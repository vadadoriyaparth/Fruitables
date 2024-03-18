import logo from './logo.svg';
import './App.css';

import { Route, Router, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';


function App() {
  return (
    <>
      <Routes>
       <Route exact path='/*' element={<UserRoutes/>}/>
       <Route element= {<PrivateRoutes/>}> 
       <Route exact path='/admin/*' element={<AdminRoutes/>}/>
       </Route>
      </Routes>
      
    </>
  );
}

export default App;
