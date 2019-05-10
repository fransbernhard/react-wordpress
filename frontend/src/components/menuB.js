import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const MenuB = () => (
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><Link to="/archive#archive">Archive</Link></li>
                <li className="contactMobile"><a href="mailto:magdamargaretha@gmail.com?Subject=magdenmagden">Contact</a></li>
                <li className="contactWeb"><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
);

export default MenuB;
