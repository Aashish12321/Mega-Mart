import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ForgotPassword, Homepage, Login, Signup } from './Routes';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SummaryApi from './Common';

// use the fetchUserDetails for all the components
import Context from './context';

// display the notification
import { ToastContainer } from 'react-toastify';      
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  // 
  const fetchUserDetails = async () => {
    const data = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const userData = await data.json();
    console.log("user-details", userData);
  }

  useEffect(()=>{
    // Fetching user details for login
    // fetchUserDetails();
  },[])


  return (
    <>
    <Context.Provider value={{
      fetchUserDetails
    }}>
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
    </Context.Provider>
    </>
  )
}

export default App;
