import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

function IngresoById() {
    let { id } = useParams()

    const [ingreso, setIngreso] = useState()

    useEffect(() => {
        const path1 = "http://localhost:5000"
        const path2 = generatePath("/api/v1/ingreso/:id", { id: id })
        const path = path1 + path2
        fetch(path).then((response) => response.json()).then((data) => setIngreso(data))
    }, [])


    if (ingreso) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h3">Ingreso {ingreso.ingreso.consecutivo}</Card.Title>
                                </Card.Header>
                                <Card.Body className='table-full-width table-responsive px-0'>
                                    <Table className='table-hover table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Pedido</th>
                                                <th>Placa</th>
                                                <th>Contenedor</th>
                                                <th>No. de Pallets</th>
                                                <th>Producto</th>
                                                <th>Peso total</th>
                                                <th>Cliente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{ingreso.ingreso.created_at}</td>
                                                <td>{ingreso.ingreso.pedido}</td>
                                                <td>{ingreso.ingreso.placa}</td>
                                                <td>{ingreso.ingreso.contenedor ? ingreso.ingreso.contenedor : 'N/A'}</td>
                                                <td>{ingreso.ingreso.total_pallets}</td>
                                                <td>{ingreso.ingreso.producto}</td>
                                                <td>{ingreso.ingreso.peso_total}</td>
                                                <td>{ingreso.ingreso.cliente}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Pallets en Inventario</Card.Title>
                                </Card.Header>
                                <Card.Body className='table-full-width table-responsive px-0'>
                                    <Table className='table-hover table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Producto</th>
                                                <th>Peso</th>
                                                <th>Referencia 1</th>
                                                <th>Referencia 2</th>
                                                <th>Proovedor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingreso.pallet_inv.map((pallet) =>
                                                <tr>
                                                    <td>{pallet.id.slice(-5)}</td>
                                                    <td>{pallet.producto}</td>
                                                    <td>{pallet.peso}</td>
                                                    <td>{pallet.referencia}</td>
                                                    <td>{pallet.referencia2}</td>
                                                    <td>{pallet.proovedor}</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Pallets ya en Salida</Card.Title>
                                </Card.Header>
                                <Card.Body className='table-full-width table-responsive px-0'>
                                    <Table className='table-hover table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Producto</th>
                                                <th>Peso</th>
                                                <th>Referencia 1</th>
                                                <th>Referencia 2</th>
                                                <th>Proovedor</th>
                                                <th>Fecha de Salida</th>
                                                <th>Salida Id</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingreso.pallet_salida.map((pallet) =>
                                                <tr>
                                                    <td>{pallet.id.slice(-5)}</td>
                                                    <td>{pallet.producto}</td>
                                                    <td>{pallet.peso}</td>
                                                    <td>{pallet.referencia}</td>
                                                    <td>{pallet.referencia2}</td>
                                                    <td>{pallet.proovedor}</td>
                                                    <td>{pallet.fecha_salida.slice(5, 16)}</td>
                                                    <td>{pallet.consecutivo}</td>
                                                </tr>)}
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
}

export default IngresoById