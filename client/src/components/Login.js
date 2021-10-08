import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { validateAuth, renderValidationErrors } from '../validators/formValidation';

export default function Login () {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { auth } = useAuth();

    const [disabled, setDisabled] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

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
            const errors = Object.values(res.body);
            setValidationErrors(errors);
            return setDisabled(false);
        }

        setDisabled(false);
    }

    return <>
        <form id='auth-form' onSubmit={handleSubmit}>
            <div className='auth-form'>
                <h2>Log In</h2>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input placeholder='Email' id='email' type='email' required ref={emailRef}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input placeholder='Password' id='password' type='password' required ref={passwordRef}/>
                </div>
                <button disabled={disabled} className='first-btn' type='submit'>
                    {disabled ? 'Submitting...' : 'Log In'}
                </button>
                {renderValidationErrors(validationErrors)}
            </div>
            <p className='switch'>
                Already have an account ?
                <Link to="/signup">Sign Up</Link>
            </p>
        </form>
    </>
}
