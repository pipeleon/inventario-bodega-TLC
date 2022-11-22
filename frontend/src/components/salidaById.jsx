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

function SalidaById() {
    let { id } = useParams()

    const [salida, setSalida] = useState()

    useEffect(() => {
        const path1 = "http://localhost:5000"
        const path2 = generatePath("/api/v1/salida/:id", { id: id })
        const path = path1 + path2
        fetch(path).then((response) => response.json()).then((data) => setSalida(data))
    }, [])


    if (salida) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h3">Salida {salida.salida.consecutivo}</Card.Title>
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
                                                <td>{salida.salida.created_at}</td>
                                                <td>{salida.salida.pedido}</td>
                                                <td>{salida.salida.placa}</td>
                                                <td>{salida.salida.contenedor ? salida.salida.contenedor : 'N/A'}</td>
                                                <td>{salida.salida.total_pallets}</td>
                                                <td>{salida.salida.producto}</td>
                                                <td>{salida.salida.peso_total}</td>
                                                <td>{salida.salida.cliente}</td>
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
                                    <Card.Title as="h4">Pallets Relacionadas</Card.Title>
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
                                            {salida.pallets.map((pallet) =>
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
                </Container>
            </>
        )
    }
}

export default SalidaById