import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Cart from '../pages/Cart';
import AuthProvider from '../contexts/AuthContext';
import Home from './Home';
import 'aos/dist/aos.css';
import 'swiper/swiper-bundle.min.css';
import '../styles/App.scss';

const App = () => (
    <Router>
        <AuthProvider>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={Login}/>
                <Route path='/cart' component={Cart}/>
            </Switch>
        </AuthProvider>
    </Router>
);

export default App;
