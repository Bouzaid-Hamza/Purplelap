import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext({});
const apiUrl = process.env.REACT_APP_API_URL;

export function useAuth () {
    return useContext(AuthContext);
}

export default function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const auth = async (option, form) => {
        let route = '';
        if (option === 'signup') route = 'users';
        else if (option === 'login') route = 'login';
        else throw new Error('option must best "signup" or "login"');

        const res = await fetch(`${apiUrl}/${route}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const body = await res.json();

        if (!res.ok) return { error: true, ...body };

        return body;
    }

    const value = { currentUser, auth };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.any
};
