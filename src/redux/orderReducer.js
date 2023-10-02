import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  collection, getDocs } from "firebase/firestore"
import { db } from '../firebase/firebase';


const initialState = {
    ordersItems: []
}

// fetching order data from database 
export const fetchOrderFromFirebase = createAsyncThunk(
    'fetch/firebase',
    async (mail) => {
        const query = await getDocs(collection(db, "order", mail, "orderItems"));
        const items = query.docs.map(doc => ({ mid: doc.id, ...doc.data() }));
        return items;
    }
)

// orders reducers
const orderSlice = createSlice({
    name: 'ordersItems',
    initialState,
    reducers: {
        addOrderItem: (state, action) => {
            state.ordersItems.push(action.payload);
        },
    }, extraReducers: (builder) => {
        builder.addCase(fetchOrderFromFirebase.fulfilled, (state, action) => {
            state.ordersItems = action.payload;
        });
      
    }

})

export const { addOrderItem } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;
export const orderSelector = (state) => state.ordersReducer.ordersItems