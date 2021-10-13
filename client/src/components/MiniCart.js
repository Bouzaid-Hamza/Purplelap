import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MiniLaptop from './MiniLaptop';
import { Link } from 'react-router-dom';

const MiniCart = ({ cart }) => (
    <Fragment>
        <div className="shop-icon">
            <a href=""><i className="fa fa-shopping-bag" data-label={cart.length}/></a>
        </div>
        <div className="mini-cart">
            <div className="mini-products">
                {cart.map((lap, index) => <MiniLaptop key={index} specs={lap} />)}
            </div>
            <div className="go-to-cart">
                {cart.length
                    ? <h4>Total: {
                        cart.reduce((prev, curr) => prev + (curr.price * curr.count), 0)
                    } $</h4>
                    : <h4>Your cart is empty.</h4>}
                <button disabled={!cart.length}>
                    <Link className="first-btn"
                        to="/cart">
                        GO TO CART
                    </Link>
                </button>
            </div>
        </div>
    </Fragment>
);

MiniCart.propTypes = {
    cart: PropTypes.array
}

export default MiniCart;
