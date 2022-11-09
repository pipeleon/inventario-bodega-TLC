import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => (
    <nav className="nav">
        <Link to="/">
            Home
        </Link>
        &#9679;
        <Link to="/inventario">
            Inventario
        </Link>
        &#9679;
        <Link to="/ingresos">
            Ingresos
        </Link>
        &#9679;
        <Link to="/salidas">
            Salidas
        </Link>
        &#9679;
        <Link to="/facturas">
            Facturas
        </Link>
        &#9679;
        <Link to="/nuevo-ingreso">
            Nuevo Ingreso
        </Link>
        &#9679;
        <Link to="/nueva-salida">
            Nueva Salida
        </Link>
        &#9679;
        <Link to="/nueva-factura">
            Nueva Factura
        </Link>
        &#9679;
        <Link to="/nuevo-cliente">
            Nuevo Cliente
        </Link>
        &#9679;
        <Link to="/prueba-tabla">
            Prueba
        </Link>
    </nav>
)

export default Nav