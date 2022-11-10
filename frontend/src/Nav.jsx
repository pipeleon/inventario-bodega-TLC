import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap";

export const Nav2 = () => (
    <div className='sidebar'>
        <div
            className="sidebar-background"
        />
        <div className="sidebar-wrapper">
            
            <Nav className='my-3'>
                <li>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/inventario" className="nav-link">
                        Inventario
                    </Link>
                </li>
                <li>
                    <Link to="/ingresos" className="nav-link">
                        Ingresos
                    </Link>
                </li>
                <li>
                    <Link to="/salidas" className="nav-link">
                        Salidas
                    </Link>
                </li>
                <li>
                    <Link to="/facturas" className="nav-link">
                        Facturas
                    </Link>
                </li>
                <li>
                    <Link to="/nuevo-ingreso" className="nav-link">
                        Nuevo Ingreso
                    </Link>
                </li>
                <li>
                    <Link to="/nueva-salida" className="nav-link">
                        Nueva Salida
                    </Link>
                </li>
                <li>
                    <Link to="/nueva-factura" className="nav-link">
                        Nueva Factura
                    </Link>
                </li>
                <li>
                    <Link to="/nuevo-cliente" className="nav-link">
                        Nuevo Cliente
                    </Link>
                </li>
            </Nav>
        </div>
    </div>
)

export default Nav2