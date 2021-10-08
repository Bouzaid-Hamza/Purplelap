import React, { useEffect, useRef, useState } from 'react';
import { validateAuth, renderValidationErrors } from '../validators/formValidation';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function SignUp () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    // const fileRef = useRef();

    const { auth } = useAuth();

    const [disabled, setDisabled] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // useEffect(() => {
    //     nameRef.current.value = 'user1';
    //     emailRef.current.value = 'user1@gmail.com';
    //     passwordRef.current.value = 'Password1';
    //     confirmPasswordRef.current.value = 'Password1';
    // }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        setDisabled(true);
        setValidationErrors([]);

        const inputs = {
            name: nameRef.current,
            email: emailRef.current,
            password: passwordRef.current,
            confirmPassword: confirmPasswordRef.current
        };

        const form = { ...inputs };
        for (const p in form) form[p] = form[p].value;
        for (const p in inputs) inputs[p].classList.remove('border-invalid');

        const { errors } = await validateAuth('signup', form);

        if (errors) {
            const messages = [];
            errors.forEach(err => {
                inputs[err.path].classList.add('border-invalid');
                messages.push(err.message);
            });
            setValidationErrors(messages);
            return setDisabled(false);
        }

        const { name, email, password } = form;
        const res = await auth('signup', { name, email, password });

        if (res.error) {
            const errors = Object.values(res.body);
            setValidationErrors(errors);
            return setDisabled(false);
        }

        console.log(res);
        setDisabled(false);
    }

    return (
        <form id='auth-form' onSubmit={handleSubmit}>
            <div className='auth-form'>
                <h2>Sign Up</h2>
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
                {/* <div> */}
                {/*    <label htmlFor='file'>Import image</label> */}
                {/*    <input id='file' type='file' accept='image/png, image/jpeg, image/jpg' ref={fileRef}/> */}
                {/* </div> */}
                <button disabled={disabled} className='first-btn' type='submit'>
                    {disabled ? 'Submitting...' : 'Sign Up'}
                </button>
                {renderValidationErrors(validationErrors)}
            </div>
            <p className='switch'>
                Already have an account ?
                <Link to="/login">Log In</Link>
            </p>
        </form>
    );
}
