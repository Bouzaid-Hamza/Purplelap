import React, { Fragment, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';

const cartUrl = `${process.env.REACT_APP_API_URL}/cart`;

function Cart () {
    const [items, setItems] = useState([]);

    useEffect(async () => {
        const res = await fetch(cartUrl, {
            method: 'GET',
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            }
        });

        setItems(await res.json());
    }, []);

    return (
        <Fragment>
            <h2 className="cart-title">Shopping Cart</h2>
            <div className="cart">
                <div className="head">
                    <h4 className="cart-details">Product details</h4>
                    <h4 className="cart-quantity">Quantity</h4>
                    <h4 className="cart-price">Price</h4>
                    <h4 className="cart-total">Total</h4>
                </div>
                {items.map((item, index) => (
                    <CartItem key={index} specs={item} />
                ))}
            </div>
        </Fragment>
    );
}

export default Cart;
