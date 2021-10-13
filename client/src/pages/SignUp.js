import React, { useEffect, useRef, useState } from 'react';
import { validateAuth, renderValidationErrors } from '../validators/authValidation';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function SignUp () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const { auth } = useAuth();

    let inputs = {};

    useEffect(() => {
        inputs = {
            name: nameRef.current,
            email: emailRef.current,
            password: passwordRef.current,
            confirmPassword: confirmPasswordRef.current
        };
    }, []);

    const displayErrors = (errors) => {
        const messages = [];
        errors.forEach(err => {
            inputs[err.path].classList.add('border-invalid');
            messages.push(err.message);
        });
        setValidationErrors(messages);
        setDisabled(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setDisabled(true);
        setValidationErrors([]);

        const form = {};
        for (const p in inputs) {
            form[p] = inputs[p].value;
            inputs[p].classList.remove('border-invalid');
        }

        const { errors } = await validateAuth('signup', form);
        if (errors) return displayErrors(errors);

        const res = await auth('signup', {
            name: form.name,
            email: form.email,
            password: form.password
        });

        if (res.error) return displayErrors(res.errors);

        history.push('/login')

        // setDisabled(false);
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
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name'>Username</label>
                            <input placeholder='Username' id='name' type='text' required ref={nameRef}/>
                        </div>
                        <div>
                            <label htmlFor='email'>Email Address</label>
                            <input placeholder='Email' id='email' type='email' required ref={emailRef}/>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input placeholder='Password' id='password' type='password' required ref={passwordRef}/>
                        </div>
                        <div>
                            <label htmlFor='confirm-password'>Confirm Password</label>
                            <input placeholder='Confirm Password' id='confirm-password' type='password' required ref={confirmPasswordRef}/>
                        </div>
                        <button disabled={disabled} className='first-btn' type='submit'>
                            {disabled ? 'Submitting...' : 'Submit'}
                        </button>
                        {renderValidationErrors(validationErrors)}
                    </form>
                </div>
                <p className='switch'>
                    Already have an account ?
                    <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}
