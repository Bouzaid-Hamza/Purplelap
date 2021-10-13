import React, { Fragment, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import NavBar from '../components/NavBar';

export default function Cart () {
    const [items, setItems] = useState([]);

    useEffect(async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            method: 'GET',
            credentials: 'include'
        });

        setItems(await res.json());
    }, []);

    return (
        <Fragment>
            <NavBar noFix={true} />
            <h2 className="cart-title">Shopping Cart</h2>
            <div className="cart">
                <div className="head">
                    <h4 className="cart-details">Product details</h4>
                    <h4 className="cart-quantity">Quantity</h4>
                    <h4 className="cart-price">Price</h4>
                    <h4 className="cart-total">Total</h4>
                </div>
                {items.length
                    ? items.map((item, index) => (
                        <CartItem key={index} specs={item} />
                    ))
                    : <h3 className="head">Empty cart</h3>}
            </div>
        </Fragment>
    );
}
