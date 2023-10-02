import { useDispatch, useSelector } from "react-redux";
import style from '../css/home.module.css'
import { cartSelector, fetchFromFirebase, fetchDeleteItem } from "../redux/cartReducers";
import { useEffect, useState } from "react";
import { addOrderItem } from "../redux/orderReducer";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { toast } from "react-toastify";

export function Cart({ userId }) {

    const dispatch = useDispatch();
    const cart = useSelector(cartSelector);
    const [total, setTotal] = useState(0);

    //while rendering if cart is empty fetching cart data from firebase(if exists)
    useEffect(() => {
        if (!cart.length) {
            dispatch(fetchFromFirebase(userId.email))
        }
        // return () => {
        //     // Clear cart items when the component unmounts
        //     dispatch(clearCart());
        // };
    }, [dispatch, cart, userId.email])

    // Calculating total cart items prices
    useEffect(() => {
        if (!cart.length) {
            setTotal(0);
        }
        if (cart.length !== 0) {
            let sum = 0;
            cart.map((item) => {
                return sum += parseFloat(item.price) * parseFloat(item.quantity);
            });
            sum = Math.round(sum * 10) / 10
            setTotal(sum);
        }
    }, [cart]);

    //ordering and pushing ordered data in firebase
    const ordered = (e) => {
        e.preventDefault();
        if (userId) {

            cart.map(async (item) => {
                await addDoc(collection(db, "order", userId.email,
                    "orderItems"), item);
            });
            cart.forEach((item) => {
                dispatch(addOrderItem(item));
            });
            toast.success('Ordered Succefully')
            return;
        }
        toast.warn('Sign In');
    }

    // rendering elements
    return (
        <>

            {cart.length === 0 ? <h1> Cart is Empty</h1> : <h1> Cart has {cart.length} items</h1>}
            <span>Note: for deleting any item once refresh the page </span>
            <div className={`${style.container} `}>

                {cart.map((item, i) => (

                    <div key={i} className={style.card}>

                        <div className={style.imageDiv}>
                            {<img className={style.img} src={item.image} alt="item" />}
                        </div>

                        <h3 className={`${style.textLeft} ${style.nonBold}`}>{item.title}</h3>

                        <div className={`${style.textLeft} ${style.extra}`}>
                            <span> Price: ₹{item.price}</span>
                            <span> Count:{item.quantity}</span>

                        </div>

                        <button className={`${style.button} ${style.colorRed}`} onClick={() => { dispatch(fetchDeleteItem({ id: item.mid, userMail: userId.email })) }}>Remove</button>

                    </div>

                ))}

            </div>
            <div className={style.purchase}>
                <h2>Total Purchase</h2>
                <h3>₹{total}</h3>
                <button className={style.button} onClick={ordered}>Purchase</button>

            </div>
        </>
    )
}