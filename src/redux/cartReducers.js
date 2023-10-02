import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from '../firebase/firebase';
import { toast } from "react-toastify";

const initialState = {
    cartItems: []
}

// Feching cart Items From Firebase
export const fetchFromFirebase = createAsyncThunk(
    'fetch/firebase',
    async (mail) => {
        const query = await getDocs(collection(db, "cart", mail, "cartItems"));
        const items = query.docs.map(doc => ({ mid: doc.id, ...doc.data() }));
        return items;
    }
)

// Adding and Updatning cart Items to Firebase
export const fetchAddItem = createAsyncThunk(
    'add/firebase',
    async ({ data, userMail }) => {
        await addDoc(collection(db, "cart", userMail, "cartItems"), data);
        return data;
    }
)

// Deleting  cart Items From Firebase
export const fetchDeleteItem = createAsyncThunk(
    'delete/firebase',
    async ({ id, userMail }) => {
        console.log(id, userMail);
        await deleteDoc(doc(db, "cart", userMail, "cartItems", id));
        return id;
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        addItem: (state, action) => {
            state.cartItems.push(action.payload);
            console.log('Item added to cart');
        },
        removeitem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.mid !== action.payload);
            console.log('Item removed');
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFromFirebase.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        });
        builder.addCase(fetchAddItem.fulfilled, (state, action) => {
            state.cartItems.push(action.payload);
            toast.success("Added to cart")
        });
        builder.addCase(fetchDeleteItem.fulfilled, (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.mid !== action.payload);
            toast.success("Deleted")
        });
    },
});

export const cartReducer = cartSlice.reducer;
export const { clearCart,addItem, removeitem, increaseQuantity } = cartSlice.actions;

export const cartSelector = (state) => state.cartReducer.cartItems;
