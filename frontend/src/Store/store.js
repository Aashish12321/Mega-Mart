import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
  },
})

