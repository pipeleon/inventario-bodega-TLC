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

function FacturaById() {
    let { id } = useParams()

    const [factura, setFactura] = useState()

    useEffect(() => {
        const path1 = "http://localhost:5000"
        const path2 = generatePath("/api/v1/factura/:id", { id: id })
        const path = path1 + path2
        fetch(path).then((response) => response.json()).then((data) => setFactura(data))
    }, [])


    if (factura) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h3">Factura {factura.factura.consecutivo}</Card.Title>
                                </Card.Header>
                                <Card.Body className='table-full-width table-responsive px-0'>
                                    <Table className='table-hover table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Inicio</th>
                                                <th>Fin</th>
                                                <th>Pallets total</th>
                                                <th>Cliente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{factura.factura.inicio.slice(4, 16)}</td>
                                                <td>{factura.factura.fin.slice(4, 16)}</td>
                                                <td>{factura.factura.total_pallets}</td>
                                                <td>{factura.factura.cliente}</td>
                                            </tr>
                                        </tbody>
                                        <thead>
                                            <tr>                                                
                                                <th>Valor en Cargues</th>
                                                <th>Valor en Descargues</th>
                                                <th>Valor en Seguros</th>
                                                <th>Valor Almacenamiento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{factura.factura.valor_cargues}</td>
                                                <td>{factura.factura.valor_descargues}</td>
                                                <td>{factura.factura.valor_seguro}</td>
                                                <td>{factura.factura.valor_almacenamiento}</td>
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
                                                <th>Fecha Ingreso</th>
                                                <th>Fecha Salida</th>
                                                <th>Producto</th>
                                                <th>Peso</th>
                                                <th>Referencia 1</th>
                                                <th>Referencia 2</th>
                                                <th>Proovedor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {factura.pallets.map((pallet) =>
                                                <tr>
                                                    <td>{pallet.id.slice(-5)}</td>
                                                    <td>{pallet.fecha_ingreso.slice(4, 16)}</td>
                                                    <td>{pallet.fecha_salida ? pallet.fecha_salida.slice(4, 16) : ""}</td>
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

export default FacturaById