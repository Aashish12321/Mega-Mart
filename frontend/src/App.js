import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ForgotPassword, Homepage, Login, Signup } from './Routes';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SummaryApi from './Common';

// use the fetchUserDetails for all the components
import Context from './Context';

// display the notification
import { ToastContainer } from 'react-toastify';      
import 'react-toastify/dist/ReactToastify.css';

// react-redux
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/userSlice';


const App = () => {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const data = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const userData = await data.json();

    if (userData.success){
      dispatch(setUserDetails(userData.data));
    }
  }

  useEffect(()=>{
    // Fetching user details for login
    fetchUserDetails();
  })


  return (
    <>
    <Context.Provider value={{ fetchUserDetails }}>
      <BrowserRouter>
        <Header />
        <ToastContainer position='top-center' autoClose={3000}/>
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
