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


const IngresosRow = ({ inicio, fin, valor_cargues, valor_descargues, valor_almacenamiento, valor_seguro, total_pallets, cliente, consecutivo }) => (
    <tr>
        <td>{consecutivo}</td>
        <td>{inicio.slice(4, 16)}</td>
        <td>{fin.slice(4, 16)}</td>
        <td>{valor_cargues}</td>
        <td>{valor_descargues}</td>
        <td>{valor_seguro}</td>
        <td>{valor_almacenamiento}</td>
        <td>{total_pallets}</td>
        <td>{cliente}</td>
    </tr>
)

function Facturas() {
    const [facturas, setFacturas] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/facturas").then((response) => response.json()).then((data) => setFacturas(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                facturas.map((ingreso) =>
                                                    <IngresosRow
                                                        key={ingreso.id}
                                                        {...ingreso}
                                                    />
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

export default Facturas