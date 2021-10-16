import React, { Fragment, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import NavBar from '../components/NavBar';
import { v4 as uuid } from 'uuid';

export default function Cart () {
    const [items, setItems] = useState([]);
    console.log('Cart');

    const removeFromCart = (laptopId) => {
        const newItems = [...items];
        const index = newItems.findIndex(item => item._id === laptopId);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    useEffect(async () => {
        const res = await fetch('/api/cart', {
            method: 'GET',
            credentials: 'include'
        });

        setItems(await res.json());
    }, []);

    return (
        <Fragment>
            <NavBar noFix={true} />
            <h2 className="shop-title">Shopping Cart</h2>
            <div className="shop">
                <div className="cart">
                    <div className="head">
                        <h4 className="cart-details">Product details</h4>
                        <h4 className="cart-quantity">Quantity</h4>
                        <h4 className="cart-price">Price</h4>
                        <h4 className="cart-total">Total</h4>
                    </div>
                    {items.length
                        ? items.map(item => (
                            <CartItem onRemove={removeFromCart} key={uuid()} specs={item} />
                        ))
                        : <h3 className="head">Empty cart</h3>}
                </div>
                <div className="order-summary">
                    <h4>Summary order</h4>
                    <div className="items">
                        <h5>items : {items.length}</h5>
                        <h5>{items.reduce((prev, curr) => prev + (curr.price * curr.count), 0)} $</h5>
                    </div>
                    <div className="shipping">
                        <h5>Shipping</h5>
                        <select>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                        </select>
                    </div>
                    <div className="promo-code">
                        <h5>Promo code</h5>
                        <input type="text" placeholder="Enter your code" />
                        <button className="first-btn">Apply</button>
                    </div>
                    <div className="total-cost">
                        <h5>Total Cost</h5>
                        <h5>9999 $</h5>
                    </div>
                    <button className="first-btn">CHECKOUT</button>
                </div>
            </div>
        </Fragment>
    );
}
