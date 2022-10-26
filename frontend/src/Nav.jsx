import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => (
    <nav className="nav">
            <Link to="/">
                Home 
            </Link>
            <Link to="/ingresos">
                Ingresos
            </Link>
    </nav>
)

export default Nav