import React from 'react';

import MenuB from '../components/MenuB';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
    <div className="home" id="home">
        <div className="background-img"></div>
        <MenuB />
        <div className="container">
            <div className="hero"></div>
            <About />
            <Contact />
        </div>
    </div>
)

export default Home;
