import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AuthProvider from './contexts/AuthContext';
import Home from './pages/Home';
import 'aos/dist/aos.css';
import 'swiper/swiper-bundle.min.css';
import './styles/App.css';

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={Login}/>
                <Route path='/cart' component={Cart}/>
            </Switch>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
