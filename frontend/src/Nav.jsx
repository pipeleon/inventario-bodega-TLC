import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => (
    <nav className="nav">
        <Link to="/">
            Home
        </Link>
        &#9679;
        <Link to="/ingresos">
            Ingresos
        </Link>
        &#9679;
        <Link to="/nuevoIngreso">
            Nuevo Ingreso
        </Link>
        &#9679;
        <Link to="/nuevoCliente">
            Nuevo Cliente
        </Link>
    </nav>
)

export default Nav