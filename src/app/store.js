import { configureStore } from '@reduxjs/toolkit';
import { itemReducer } from '../redux/homeSlice';
import { cartReducer } from '../redux/cartReducers';
import { authReducer } from '../redux/authReducer';
import { ordersReducer } from '../redux/orderReducer';

//  adding reducers to store 
export const store = configureStore({
  reducer: {itemReducer,cartReducer, authReducer, ordersReducer},
});
