import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import httpClient from "./httpClient";
import { useState, useEffect } from "react";

function Nav2() {
    const [tipo, setTipo] = useState("")

    useEffect(() => {
        (async () => {

            try {
                const resp = await httpClient.get("http://localhost:5000/api/v1/@me")
                setTipo(resp.data.tipo)
                console.log(tipo)
            } catch (error) {
                setTipo(null)
                console.log("no se auth")
            }
        })()
    }, [])

    return (
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
                    {(tipo == "admin" || tipo == "operador") &&
                        <>
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
                        </>
                    }
                    {tipo == "admin" &&
                        <li>
                            <Link to="/nuevo-cliente" className="nav-link">
                                Nuevo Cliente
                            </Link>
                        </li>}
                    {tipo == "admin" &&
                        <li>
                            <Link to="/nuevo-usuario" className="nav-link">
                                Nuevo Usuario
                            </Link>
                        </li>}
                </Nav>
            </div>
        </div>
    )
}


export default Nav2