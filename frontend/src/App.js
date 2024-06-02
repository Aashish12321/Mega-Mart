import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ForgotPassword, Homepage, Login, Signup } from './Routes';
import Header from './Components/Header';
import Footer from './Components/Footer';

// display the notification
import { ToastContainer } from 'react-toastify';      
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <main className='min-h-[calc(100vh-137px)]'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
