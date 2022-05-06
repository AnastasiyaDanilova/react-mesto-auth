import React from 'react';
import logo from '../images/Logo.svg';
import { Link } from 'react-router-dom';

function Header({ headerLink, userEmail, linkTitle, onLogOut }) {
    let { email } = userEmail || {}

    return (
        <>
        <header className="header">
            <img src={logo} alt="Место" className="logo" />
            <div className='nav-bar'>
                <h2 className='header__email'>{email}</h2>
                <Link className='link header__link' to={`${headerLink}`} onClick={onLogOut}>{linkTitle} </Link>
            </div>

        </header>
        </>
    );
};

export default Header;