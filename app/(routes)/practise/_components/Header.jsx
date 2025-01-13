"use client"
import React from 'react';

const Header = () => {
    return (
        <header style={{ padding: '10px', backgroundColor: 'lightblue', textAlign: 'center' }}>
            <h1>Viva College</h1>
            <nav>
                <a href="/" style={{ margin: '0 10px' }}>Home</a>
                <a href="/about" style={{ margin: '0 10px' }}>About</a>
                <a href="/contact" style={{ margin: '0 10px' }}>Contact</a>
            </nav>
        </header>
    );
};

export default Header;
