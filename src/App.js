import React, { useEffect, useState } from 'react';
import './App.css';

//Pages
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Cart } from './pages/cart';
import { Account } from './pages/Account';
//Routes
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

//firebase
import { auth } from './firebase/firebase';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, loginSuccess } from './redux/authReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// loader
import HashLoader from "react-spinners/HashLoader";

// const override: CSSProperties = {
// //   display: "block",
// //   margin: "0 auto",
// //   borderColor: "red",
// // };

function App() {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const [loading, setLoading] = useState(true);
  let color = "green";

  //checking user login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({ name: user.displayName, email: user.email }));
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    })
  }, [dispatch]);

  // checking user login authentication and protecting cart and orders if not login
  const Protected = ({ children }) => {
    if (!user.name) {
      setTimeout(() => {
        toast.warn('Sign In first', { toastId: 1 })
      }, "1000");
      return <Navigate to='/account' replace={true} />
    }
    return children;
  }

  // routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar name={user.name} />,
      children: [
        {
          path: '/',
          element: <Home userId={user} />
        },
        {
          path: 'cart',
          element: <Protected>
            <Cart userId={user} />
          </Protected>
        },
        {
          path: 'orders',
          element: <Protected>
            <Orders userId={user} />
          </Protected>
        },
        {
          path: 'account',
          element: <Account userClient={user} />
        }
      ]
    }
  ]);

  if (loading) {
    return <div className='loader'> <HashLoader
      color={color}
      loading={loading}
      size={75}
      aria-label="Loading Spinner"
      data-testid="loader"
    /></div>; // Or your loading component
  }

  return (

    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
