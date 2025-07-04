import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decreaseCart, increaseCart } from "./cartSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"; 
import imageMap from '../utils/imageMap'; 
const AddItem = () => { 
    const navigate = useNavigate(); 
    const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount); 
    const cartItems = useSelector((state) => state.cart.cartItem);
    const dispatch = useDispatch()

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    }

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleIncreaseCart = (product) => {
        dispatch(increaseCart(product));
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.cartQuantity);
    }, 0).toFixed(2);

    return (
        <div className="cart-page-container">
            <h1 style={{ textAlign: 'center', marginTop: '50px', marginBottom: '30px' }}>Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className="cart-items-list">
                    {cartItems.map((x) => (
                        <div className='detail_info cart-item-card' key={x.id}>
                            <div className='img-box'>
                                <img src={imageMap[x.image]} id="image_item_cart" alt={x.title} />
                            </div>
                            <div className='item_detail cart-item-details'>
                                <h2 className='item_page_title'>{x.title}</h2>
                                <p className='item_page_price'>Price: ${parseFloat(x.price).toFixed(2)}</p>
                                <p className='item_page_des'>{x.des}</p>
                                <p className='item_page_des'>Category: {x.category}</p>
                                <p>Quantity: {x.cartQuantity}</p>

                                <div className='item_page_btn cart-item-actions'>
                                    <button className='secondary-button-item-go-back'
                                        onClick={() => handleRemoveFromCart(x)}>Remove</button>
                                    <div className="cart-product-quantity">
                                        <button className='click_b_in' onClick={() => handleDecreaseCart(x)}>-</button>
                                        <div className="count">{x.cartQuantity}</div>
                                        <button className='click_b_in' onClick={() => handleIncreaseCart(x)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='TotalAmout' style={{ textAlign: 'right', marginTop: '30px', fontSize: '1.5em', fontWeight: 'bold' }}>
                        Total: ${totalAmount}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button className='secondary-button-item' onClick={() => { /* Implement checkout navigation */ }}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.2em' }}>Your cart is empty.</p>
            )}
        </div>
    )
}

export default AddItem