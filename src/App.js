import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Login';
import CallsData from './Components/CallsData';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path='/CallsData' element={<CallsData/>} />
      <Route path='/' element={<Login/>} />
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;