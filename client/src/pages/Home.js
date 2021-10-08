import React, { useCallback, useEffect, useState } from 'react';
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

const cartUrl = `${process.env.REACT_APP_API_URL}/cart`;

function Home () {
    const [cart, setCart] = useState([]);

    const inCart = (laptopId) => cart.map(item => item._id).includes(laptopId);

    const refreshCart = useCallback(async () => {
        const res = await fetch(cartUrl, {
            method: 'GET',
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            }
        });

        setCart(await res.json());
    }, []);

    useEffect(async () => {
        await refreshCart();
        AOS.init();
    }, []);

    return <>
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
    </>;
}

export default Home;
