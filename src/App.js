import logo from './logo.svg';
import './App.css';

import { Route, Router, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import { storeReduces } from './redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './context/TheamContext';


function App() {
  const { store, persistor } = storeReduces();

  return (

    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <Routes>
            <Route exact path='/*' element={<UserRoutes />} />
            <Route element={<PrivateRoutes />}>
              <Route exact path='/admin/*' element={<AdminRoutes />} />
            </Route>
          </Routes>
        </PersistGate>

      </Provider>
    </ThemeProvider>
  );
}

export default App;
