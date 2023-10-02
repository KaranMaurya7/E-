import { useEffect, useState } from 'react';
import style from '../css/home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiFetch, clearHome, itemSelector } from '../redux/homeSlice';
import { cartSelector, fetchAddItem, increaseQuantity } from '../redux/cartReducers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Home({ userId }) {

    const dispatch = useDispatch();
    const items = useSelector(itemSelector);
    const cart = useSelector(cartSelector);
    const [selectedOption, setSelectedOption] = useState('');

    // API fetching according to filter selecion
    useEffect(() => {
        if (selectedOption === 'None' || !selectedOption) {
            dispatch(clearHome());
            const link = 'https://fakestoreapi.com/products';
            dispatch(apiFetch(link));
        } else {
            dispatch(clearHome());
            const link = `https://fakestoreapi.com/products/category/${selectedOption}`;
            dispatch(apiFetch(link));
        }
    }, [selectedOption, dispatch]);

    // adding local cart and updating firebase
    const handleCart = (item) => {

        if (userId.name) {
            const increaseQuan = cart.find((i) => i.id === item.id);
            if (increaseQuan) {
                console.log(increaseQuan.id)
                dispatch(increaseQuantity(increaseQuan))
                return;
            }

            const data = {
                id: item.id,
                date: Date.now(),
                price: Math.round(item.price * 10),
                image: item.image,
                title: item.title,
                quantity: 1,
            }
            dispatch(fetchAddItem({ data, userMail: userId.email }))
            return;
        }
        toast.warn("Sign  in ");

    }

    // handling Dropdown event
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // rendereing of elements
    return (
        <>
            <h1>Welcome {userId.name} !</h1>
            <div className={`${style.container}`}>

                {items.map((item) => (

                    <div key={item.id} className={style.card}>

                        <div className={style.imageDiv}>
                            {<img className={style.img} src={item.image} alt="item" />}
                        </div>

                        <h3 className={`${style.textLeft} ${style.nonBold}`}>{item.title}</h3>

                        <h3 className={style.textLeft}>Price:{Math.round(item.price * 10)} </h3>

                        <button className={style.button} onClick={() => handleCart(item)}> Add to cart</button>

                    </div>

                ))}

            </div>
            <div className={style.filter}>

                <h2>Filter</h2>

                <label>Choose filter:</label>
                <select name="options" id="options" value={selectedOption} onChange={handleChange}>
                    <option value="None">None</option>
                    <option value="men's%20clothing">Men's Clothing</option>
                    <option value="women's%20clothing">Women's Clothing</option>
                    <option value="jewelery">Jwelery</option>
                    <option value="electronics">Electronic</option>
                </select>
                {/* <label className={style.contain}>
                    <input type="checkbox" name="men" />Men's Clothing

                </label>

                <label className={style.contain}>
                    <input type="checkbox" name="women" />Women's Clothing

                </label>

                <label className={style.contain}>
                    <input type="checkbox" name="jwelery" />Jwelery

                </label>

                <label className={style.contain}>
                    <input type="checkbox" name="electronic" />Electronic
                </label> */}
            </div>
        </>
    )
}