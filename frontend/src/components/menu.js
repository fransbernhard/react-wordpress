import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Menu = () => (
    <header>
        <nav>
            <ul>
                <li><Link to={'/#home'}>Home</Link></li>
                <li><Link to="/home#about">About</Link></li>
                <li><Link to={'/archive'}>Archive</Link></li>
                <li className="contactMobile"><a href="mailto:magdamargaretha@gmail.com?Subject=magdenmagden">Contact</a></li>
                <li className="contactWeb"><Link to="/home#contact">Contact</Link></li>
            </ul>
        </nav>
    </header>
);

export default Menu;
