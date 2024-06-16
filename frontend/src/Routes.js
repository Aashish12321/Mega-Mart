import {createBrowserRouter} from 'react-router-dom';
import App from './App'
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Admin from "./Pages/Admin/Admin";
import Users from "./Pages/Admin/Users"
import Dashboard from './Pages/Admin/Dashboard';
import AddProduct from './Pages/Admin/AddProduct';
import ViewProducts from './Pages/Admin/ViewProducts';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Homepage />
            },
            {
                path: 'signup',
                element: <Signup />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'admin',
                element: <Admin />,              
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: 'users',
                        element: <Users />
                    },
                    {
                        path: 'products',
                        element: <ViewProducts />
                    },
                    {
                        path: 'view-products',
                        element: <ViewProducts />
                    },
                    {
                        path: 'add-product',
                        element: <AddProduct />
                    },
                    
                ]
            },
        ]
    }
])

export default router;
