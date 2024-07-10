import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './Store/store';
import { Provider } from 'react-redux';
import router from './Routes'
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // {/* </React.StrictMode>  */}
);


