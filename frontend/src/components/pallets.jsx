import React from 'react'
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

const PalletsRow = ({ id, producto, peso, referencia, created_at, referencia2, proovedor, consecutivo, cliente }) => (
    <tr>
        <td>{id.slice(-5)}</td>
        <td>{producto}</td>
        <td>{peso}</td>
        <td>{referencia}</td>
        <td>{referencia2}</td>
        <td>{proovedor}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{consecutivo}</td>
        <td>{cliente}</td>
    </tr>
)

function Inventario() {
    const [pallets, setPallets] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/pallets").then((response) => response.json()).then((data) => setPallets(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



    if (pallets.length > 0) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h4">Inventario</Card.Title>
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
                                                <th>Fecha Ingreso</th>
                                                <th>Ingreso ID</th>
                                                <th>Cliente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pallets.map((pallet) =>
                                                    !pallet.salida_id &&
                                                    <PalletsRow
                                                        key={pallet.id}
                                                        {...pallet}
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
                                    <Card.Title as="h4">Inventario</Card.Title>
                                    <p className="card-category">
                                        No hay Inventario Aun
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

const IngresosRow = ({ consecutivo, created_at, total_pallets, producto, peso_total, cliente }) => (
    <tr>
        <td>{producto}</td>
        <td>{peso_total}</td>
        <td>{total_pallets}</td>
        <td>{consecutivo}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{cliente}</td>
    </tr>
)

function InventarioSimp() {
    const [ingresos, setIngresos] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/pallets-simplificado").then((response) => response.json()).then((data) => setIngresos(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



    if (ingresos.length > 0) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h4">Inventario</Card.Title>
                                </Card.Header>
                                <Card.Body className='table-full-width table-responsive px-0'>
                                    <Table className='table-hover table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Peso total</th>
                                                <th>No. de Pallets</th>
                                                <th>Ingreso ID</th>
                                                <th>Fecha Ingreso</th>
                                                <th>Cliente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ingresos.map((ingreso) =>
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
                                <Card.Title as="h4">Inventario</Card.Title>
                                <p className="card-category">
                                    No hay Inventario Aun
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

function Pallets() {
    const [modo, setModo] = useState(false)
    return (
        <div>
            <input type="checkbox" onChange={() => setModo(!modo)} /> Simplificado
            {
                modo
                    ? <InventarioSimp />
                    : <Inventario />
            }
        </div>
    )


}

export default Pallets