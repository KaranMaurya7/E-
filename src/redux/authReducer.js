import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, updateProfile, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";

// Sign in 
export const asyncSignIn = createAsyncThunk(
    'auth/SignIn',
    async ({ email, password, navigate }, thunkAPI) => {

        await signInWithEmailAndPassword(auth, email, password).then((res) => {
            thunkAPI.dispatch(authSlice.actions.loginSuccess({
                name: res.user.displayName,
                email: res.user.email
            }));
            toast.success('Login Successfully')
            navigate('/');
        }).catch((e) => {
            toast.error(e.message);
        });
    }
)

//Sign up
export const asyncSignUp = createAsyncThunk(
    'auth/SignUp',
    async ({ name, email, password, navigate }, thunkAPI) => {
        await createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
            const user = res.user;
            await updateProfile(user, {
                displayName: name
            })
            thunkAPI.dispatch(authSlice.actions.loginSuccess({name, email}))
            toast.success('User Created')
            navigate('/');

        }).catch((e) => {

            toast.error(e.message);
            console.log(e);
        });
    }

)

// Sign Out
export const asyncSignOut = createAsyncThunk(
    'auth/Signout',
    async (navigate, thunkAPI) => {

        signOut(auth).then(() => {
            thunkAPI.dispatch(authSlice.actions.logoutSuccess())
            toast.success('Logout successfully')
            navigate('/');

        }).catch((error) => {
            toast.error(error.message);
        });
    }
)

// reducers
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: { name: '', email: '' } },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        logoutSuccess(state) {
            state.user = { name: '', email: '' };
        }
    }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer.user;