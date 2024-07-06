import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
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
      <ToastContainer hideProgressBar draggable position='top-center' autoClose={2000} className="transition-all"/>

      <Header />
      <main className='h-[100vh] min-[320px]:mt-16 min-[1024px]:mt-16 min-[1440px]:mt-16 border-2 border-yellow-500'>
        <Outlet />
      </main>
      <Footer />

    </Context.Provider>
    </>
  )
}

export default App;
