import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ForgotPassword, Homepage, Login, Signup } from './Routes';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
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
