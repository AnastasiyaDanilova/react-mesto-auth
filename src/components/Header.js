import React from 'react';
import logo from '../images/Logo.svg';
import { Link } from 'react-router-dom';


function Header({headerLink, email, linkTitle, logOut}) {
    return (
        <>
        <header className="header">
            <img src={logo} alt="Место" className="logo" />
            <div className='nav-bar'>
            <h2>{email}</h2>
            <Link  className='link' to={`${headerLink}`} onClick={logOut}>{linkTitle} </Link>
      </div>
            
        </header>
        </>
    );
};

export default Header;