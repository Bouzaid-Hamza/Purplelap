import React from 'react';
import MiniLaptop from './MiniLaptop';
import PropTypes from 'prop-types';

function MiniCart ({ cart }) {
    // console.log('CAAAAAAAAAAAAAAAAAART', cart.length)
    const total = cart.reduce((prev, curr) => prev + (curr.price * curr.count), 0);

    return <>
        <div className="shop-icon">
            <a href=""><i className="fa fa-shopping-bag" data-label={cart.length}/></a>
        </div>
        <div className="mini-cart">
            <div className="mini-products">
                {cart.map((lap, index) => <MiniLaptop key={index} specs={lap} />)}
            </div>
            <div className="go-to-cart">
                {cart.length ? <h4>Total: {total} $</h4> : <h4>Your cart is empty.</h4>}
                <button disabled={!cart.length} className="first-btn">GO TO CART</button>
            </div>
        </div>
    </>;
}

MiniCart.propTypes = {
    cart: PropTypes.array
}

export default MiniCart;
