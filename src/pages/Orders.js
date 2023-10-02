import { useDispatch, useSelector } from 'react-redux'
import style from '../css/orders.module.css'
import { fetchOrderFromFirebase, orderSelector } from '../redux/orderReducer';
import { useEffect } from 'react';


export function Orders({userId}){
    const dispatch = useDispatch();

    //fetching orders from database
    const orders = useSelector(orderSelector); 
    useEffect(() => {
        if (!orders.length && userId) {
            dispatch(fetchOrderFromFirebase(userId.email))
            console.log(orders);
        }
    }, [dispatch, orders])

    // remdering of elements
    return(
        <>
          <div className={style.order}>
                <h1>Your Orders</h1>

                {orders.map((order,i) => {
                    let date = order.date;
                    let newDate = new Date(date);

                    return (<div key={i}>


                        <h2>Order On :- {newDate.toLocaleDateString('en-US')}</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{order.title}</td>
                                    <td>{order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td>{typeof parseFloat(orders.price) === 'number' ? order.price * order.quantity : 'N/A'}</td>

                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total:-</td>
                                    <td>{typeof parseFloat(orders.price) === 'number' ? order.price * order.quantity : 'N/A'}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>)
                })}


            </div>
        </>
    )
}