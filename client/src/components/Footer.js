import React from 'react';

const year = new Date().getFullYear();

const Footer = () => (
    <footer>
        <div>Follow us</div>
        <div className="social-icons">
            <i className="fab fa-facebook-square"/>
            <i className="fab fa-twitter-square"/>
            <i className="fab fa-instagram-square"/>
        </div>
        <hr/>
        <h4>{`${year} © All rights reserved`}</h4>
    </footer>
);

export default Footer;
