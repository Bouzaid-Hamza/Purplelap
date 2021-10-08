import React from 'react';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    name: Yup.string().min(4).max(40).required(),
    email: Yup.string().min(8).max(40).email().required(),
    password: Yup.string().min(8).max(30),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const loginSchema = Yup.object().shape({
    email: Yup.string().min(8).max(40).email().required(),
    password: Yup.string().min(8).max(30)
});

const validateAuth = async (option, form) => {
    let schema = {};
    if (option === 'signup') schema = signupSchema;
    else if (option === 'login') schema = loginSchema;
    else throw new Error('option must be "signup" or "login"');

    try {
        const result = await schema.validate(form, { abortEarly: false });
        if (result) return true;
    } catch (e) {
        return { errors: e.inner };
    }
}

const renderValidationErrors = (errors) => {
    if (errors.length) {
        return (
            <div className='validation-errors'>
                {errors.map((err, i) => <p key={i}>{err}</p>)}
            </div>
        );
    }
}

export { validateAuth, renderValidationErrors };
