import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { validateAuth, renderValidationErrors } from '../validators/authValidation';

export default function Login () {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const { auth } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        setDisabled(true);
        setValidationErrors([]);

        const form = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const { errors } = await validateAuth('login', form);

        if (errors) {
            setValidationErrors(['Invalid email or password.']);
            return setDisabled(false);
        }

        const res = await auth('login', form);

        if (res.error) {
            setValidationErrors([res.errors.message]);
            return setDisabled(false);
        }

        const user = await fetch('/api/login/user', {
            credentials: 'include'
        });

        console.log(await user.json());

        history.push('/');
        window.location.reload();
    }

    return (
        <div className='auth-container'>
            <Link to='/'>
                <div className="logo">
                    <i className="fas fa-laptop"/> PurpleLap
                </div>
            </Link>
            <div id='auth-form'>
                <div>
                    <h3>Log In</h3>
                    <form onSubmit={handleSubmit}
                        className='auth-form'>
                        <div>
                            <label htmlFor='email'>Email Address</label>
                            <input placeholder='Email' id='email' type='email' required ref={emailRef}/>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input placeholder='Password' id='password' type='password' required ref={passwordRef}/>
                        </div>
                        <button disabled={disabled} className='first-btn' type='submit'>
                            {disabled ? 'Submitting...' : 'Submit'}
                        </button>
                        {renderValidationErrors(validationErrors)}
                    </form>
                </div>
                <p className='switch'>
                Already have an account ?
                    <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
