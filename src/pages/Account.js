// imports 
import { useState } from "react";
import style from '../css/account.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncSignIn, asyncSignOut, asyncSignUp } from "../redux/authReducer";
import { toast } from "react-toastify";

export function Account({ userClient }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // using useState hook for the input values
    const [signIn, setSignIn] = useState(true);
    const [buttonDis, setButtonDis] = useState(false);
    const [signInValues, setSignInValues] = useState({
        email: '',
        pass: ''
    });
    const [signUpValues, setSignUpValues] = useState({
        name: '',
        email: '',
        pass: ''
    });

    // handle SIGN IN  and SIGN UP submition
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (signIn) {

            if (!signInValues.email || !signInValues.pass) {
                toast.warn('Fill all Details');
                return;
            }
            //sign In
            setButtonDis(true);
            dispatch(asyncSignIn({ email: signInValues.email, password: signInValues.pass, navigate }));
            setButtonDis(false);
            clearInput()

        } else {

            if (!signUpValues.name || !signUpValues.email || !signUpValues.pass) {
                alert('Fill all Details');
                return;
            }
            //sign up 
            setButtonDis(true);
            dispatch(asyncSignUp({name: signUpValues.name, email: signUpValues.email, password: signUpValues.pass, navigate}));
            setButtonDis(false);
            clearInput();
        }

    }

    // cleasring on change inputs
    const clearInput = () => {
        if (signIn) {
            setSignInValues({
                email: '',
                pass: ''
            });
        } else {
            setSignUpValues({
                name: '',
                email: '',
                pass: ''
            });
        }
    }

    //signout
    const logout = (e) => {
        e.preventDefault();
       dispatch(asyncSignOut(navigate));
    }

    // if user already sign in rendering this
    if (userClient.name) {
        // console.log(name)
        return (
            <>
                <div className={style.profile}>
                    <h1>User name:
                        <span>&nbsp;
                            {userClient.name}
                        </span>
                    </h1>
                    <h1>User email:
                        <span>&nbsp;
                            {userClient.email}
                        </span>
                    </h1>
                    <button onClick={logout}>Logout</button>
                </div>
            </>
        )
    }

    // if user not sign in rendering this
    return (
        <>
            {signIn ?
                <div className={`${style.container}`}>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>

                        <input type="email" value={signInValues.email} onChange={(e) => setSignInValues(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" required />

                        <input type="password" value={signInValues.pass} onChange={(e) => setSignInValues(prev => ({ ...prev, pass: e.target.value }))} placeholder="Enter your password" required />

                        <button type="submit" onClick={handleSubmit} disabled={buttonDis} >Submit</button>

                    </form>
                    <p onClick={() => setSignIn(false)}>or <b>Sign Up </b>instead</p>
                </div> :
                <div className={`${style.container}`}>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>

                        <input type="name" value={signUpValues.name} onChange={(e) => setSignUpValues(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" required />

                        <input type="email" value={signUpValues.email} onChange={(e) => setSignUpValues(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" required />

                        <input type="password" value={signUpValues.pass} onChange={(e) => setSignUpValues(prev => ({ ...prev, pass: e.target.value }))} placeholder="Enter your password" required />

                        <button type="submit" onClick={handleSubmit} disabled={buttonDis}>Submit</button>

                    </form>
                    <p onClick={() => setSignIn(true)}> Already have account? <b>Sign in</b> </p>
                </div>
            }


        </>
    )
}