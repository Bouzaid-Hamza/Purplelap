import React from 'react';
import DropDown from './DropDown';
import NavLink from './NavLink';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileIcon () {
    console.log('ProfileIcon');
    const img = useAuth().currentUser?.img;

    const handleClick = async () => {
        const res = await fetch('/api/login/out', {
            credentials: 'include'
        });

        console.log(await res.json());
        window.location.reload();
    }

    return (
        <div className="user">
            <label htmlFor="toggle-drop-down">
                <img src={img} alt="user-img"/>
            </label>
            <input id="toggle-drop-down" type="checkbox" />
            <DropDown>
                <NavLink url="/#dashboard"
                    icon={<i className="fas fa-user"/>}
                    name="Dashboard"/>
                <NavLink onClick={handleClick}
                    url="#logOut"
                    icon={<i className="fas fa-sign-out-alt"/>}
                    name="Log Out"/>
            </DropDown>
        </div>
    );
}
