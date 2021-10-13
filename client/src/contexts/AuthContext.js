import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext({});

export function useAuth () {
    return useContext(AuthContext);
}

export default function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    console.log('AuthContext : ', authenticated);

    const auth = async (option, form) => {
        if (option !== 'signup' && option !== 'login') {
            throw new Error('option must best "signup" or "login"');
        }

        const res = await fetch(`/api/${option}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const body = await res.json();
        console.log(body);

        if (!res.ok) return { error: true, errors: body };

        return body;
    }

    useEffect(async () => {
        const res = await fetch('/api/login/user', {
            credentials: 'include'
        });

        if (res.status === 401) {
            console.log(await res.json());
            setAuthenticated(false);
        } else {
            setCurrentUser(await res.json());
            setAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, authenticated, auth }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.any
};
