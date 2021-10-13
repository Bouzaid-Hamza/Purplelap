import React, { Fragment, useCallback, useEffect, useState } from 'react';
import AOS from 'aos';
import NavBar from '../components/NavBar';
import GetStarted from '../sections/GetStarted';
import BestSellers from '../sections/BestSellers';
import Categories from '../sections/Categories';
import LatestLaptops from '../sections/LatestLaptops';
import Features from '../sections/Features';
import ScrollToTop from '../components/ScrollToTop';
import BestReviews from '../sections/BestReviews';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

function Home () {
    const [cart, setCart] = useState([]);

    const inCart = (laptopId) => cart.map(item => item._id).includes(laptopId);

    const refreshCart = useCallback(async () => {
        const res = await fetch('/api/cart', {
            method: 'GET',
            credentials: 'include'
        });

        const result = await res.json();
        console.log(result);
        setCart(result);
    }, []);

    useEffect(async () => {
        await refreshCart();
        AOS.init();
    }, []);

    return (
        <Fragment>
            <NavBar cart={cart} />
            <main>
                <GetStarted />
                <BestSellers cartFn={{ inCart, refreshCart }} />
                <Categories />
                <LatestLaptops cartFn={{ inCart, refreshCart }} />
                <Features />
                <BestReviews />
                <ContactUs />
                <ScrollToTop />
            </main>
            <Footer />
        </Fragment>
    );
}

export default Home;
