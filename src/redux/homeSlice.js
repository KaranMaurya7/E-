import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

// Fetching data from API
export const apiFetch = createAsyncThunk(
    'items/fetchItems',
    async (api, thunkAPI) => {
        try {
            console.log(api)

            const response = await fetch(api);
            const data = await response.json();

            thunkAPI.dispatch(itemSlice.actions.setInitialState(data));

        } catch (e) {
            console.log(e)
        }
    }
);

// reducers
const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        clearHome: (state) => {
            state.items = [];
        },
        setInitialState: (state, action) => {
            state.items = [...action.payload]
        },

    }
});


export const itemReducer = itemSlice.reducer;
export const { clearHome,setInitialState } = itemSlice.actions;


export const itemSelector = (state) => state.itemReducer.items;

