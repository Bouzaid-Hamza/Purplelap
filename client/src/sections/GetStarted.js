import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function GetStarted () {
    const { authenticated } = useAuth();
    console.log('GetStarted');

    return (
        <section className="get-started-section" id="home">
            <div className="login-section">
                <div className="item-1">
                    <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                    <h1>Discount <span>15 - 30%</span> Off</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Sed delectus nisi necessitatibus aspernatur
                        qui totam?</p>
                </div>
                {!authenticated
                    ? <div className="item-2">
                        <Link to='/login' className="first-btn login-btn">LOG IN</Link>
                        <Link to='/signup' className="first-btn signup-btn">SIGN UP</Link>
                    </div>
                    : ''}
            </div>
            <div className="search-section">
                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Commodi.</h3>
                <form className="search-form">
                    <input type="text"
                        className="search-bar"
                        placeholder="Laptop name, Brand, Specs ..." />
                    <button><i className="fas fa-search"/></button>
                </form>
                <h4><span>Exemple:</span> Gaming laptop, Asus, i7-8750H.</h4>
            </div>
        </section>
    );
}

export default React.memo(GetStarted);
