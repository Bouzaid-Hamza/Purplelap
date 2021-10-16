import React, { useEffect, useRef } from 'react';
import DropDown from './DropDown';
import NavLink from './NavLink';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileIcon () {
    console.log('ProfileIcon');
    const img = useAuth().currentUser?.img;
    const toggle = useRef();
    const toggleLabel = useRef();

    const handleClick = async () => {
        const res = await fetch('/api/login/out', {
            credentials: 'include'
        });

        console.log(await res.json());
        window.location.reload();
    }

    const clickOutside = e => {
        if (e.target !== toggleLabel.current && !e.target.closest('.user') && toggle.current) {
            toggle.current.checked = false;
        }
    }

    const toggleDropDown = () => {
        toggle.current.checked = !toggle.current.checked;
    }

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => {
            window.removeEventListener('click', clickOutside);
        };
    }, []);

    return (
        <div className="user">
            <img src={img} alt="user-img" ref={toggleLabel} onClick={toggleDropDown}/>
            <input id="toggle-drop-down" type="checkbox" ref={toggle} />
            <DropDown>
                <NavLink url="/#dashboard"
                    icon={<i className="fas fa-user"/>}
                    name="Dashboard"/>
                <NavLink
                    click={handleClick}
                    url="#logOut"
                    icon={<i className="fas fa-sign-out-alt"/>}
                    name="Log Out"/>
            </DropDown>
        </div>
    );
}
