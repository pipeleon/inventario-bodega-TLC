import React from 'react'
import { useState, useEffect } from 'react'
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { generatePath, useNavigate } from 'react-router-dom';


function Facturas(props) {
    const [facturas, setFacturas] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        fetch("/api/v1/facturas").then((response) => response.json()).then((data) => setFacturas(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



    if (props.tipo == "null") {
        window.location.replace('/login')
    }
    else {
        if (facturas.length > 0) {
            return (
                <>
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card className='strpied-tabled-with-hover'>
                                    <Card.Header>
                                        <Card.Title as="h4">Lista de Facturas</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='table-full-width table-responsive px-0'>
                                        <Table className='table-hover table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Inicio</th>
                                                    <th>Fin</th>
                                                    <th>Valor en Cargues</th>
                                                    <th>Valor en Descargues</th>
                                                    <th>Valor en Seguros</th>
                                                    <th>Valor Almacenamiento</th>
                                                    <th>Pallets total</th>
                                                    <th>Cliente</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    facturas.map((factura) =>
                                                        <tr>
                                                            <td>{factura.consecutivo}</td>
                                                            <td>{factura.inicio.slice(4, 16)}</td>
                                                            <td>{factura.fin.slice(4, 16)}</td>
                                                            <td>{new Intl.NumberFormat().format(factura.valor_cargues)}</td>
                                                            <td>{new Intl.NumberFormat().format(factura.valor_descargues)}</td>
                                                            <td>{new Intl.NumberFormat().format(factura.valor_seguro)}</td>
                                                            <td>{new Intl.NumberFormat().format(factura.valor_almacenamiento)}</td>
                                                            <td>{factura.total_pallets}</td>
                                                            <td>{factura.cliente}</td>
                                                            <td><Button onClick={() => {
                                                                const path = generatePath("/factura/:id", { id: factura.id })
                                                                navigate(path)
                                                            }}>Ver</Button></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        }
        else {
            return (
                <>
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card className='strpied-tabled-with-hover'>
                                    <Card.Header>
                                        <Card.Title as="h4">Lista de Facturas</Card.Title>
                                        <p className="card-category">
                                            No hay Facturas Aun
                                        </p>
                                    </Card.Header>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        }
    }
}

export default Facturas