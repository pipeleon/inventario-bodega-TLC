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
import { generatePath, useNavigate } from 'react-router-dom';

function Inventario() {
    const [pallets, setPallets] = useState([])
    const [total_pallets, setTotal] = useState(0)
    let navigate = useNavigate()

    useEffect(() => {
        fetch("/api/v1/pallets").then((response) => response.json()).then((data) => setPallets(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])

    const calcularTotal = (lista) => {
        let total = 0

        lista.map((unidad) => {
            if (!unidad.salida_id) {
                total += unidad.peso
            }
        })

        return (total)
    }
    const calcularTotalUnidad = (lista) => {
        let total = 0

        lista.map((unidad) => {
            if (!unidad.salida_id) {
                total += 1
            }
        })

        return (total)
    }



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
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pallets.map((pallet) =>
                                                    !pallet.salida_id &&
                                                    <tr>
                                                        <td>{pallet.id.slice(-5)}</td>
                                                        <td>{pallet.producto}</td>
                                                        <td>{pallet.peso.toFixed(1)}</td>
                                                        <td>{pallet.referencia}</td>
                                                        <td>{pallet.referencia2}</td>
                                                        <td>{pallet.proovedor}</td>
                                                        <td>{pallet.created_at.slice(0, 10)}</td>
                                                        <td>{pallet.consecutivo}</td>
                                                        <td>{pallet.cliente}</td>
                                                        <td><Button onClick={() => {
                                                            const path = generatePath("/pallet/:id", { id: pallet.id })
                                                            navigate(path)
                                                        }}>Ver</Button></td>
                                                    </tr>
                                                )
                                            }
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td><b>{calcularTotalUnidad(pallets)}</b></td>
                                                <td><b>{new Intl.NumberFormat().format(calcularTotal(pallets).toFixed(0))}</b></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
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

const IngresosRow = ({ consecutivo, created_at, total_pallets, producto, peso_total, cliente, pedido, contenedor }) => (
    <tr>
        <td>{producto}</td>
        <td className='text-end'>{new Intl.NumberFormat().format(peso_total.toFixed(0))}</td>
        <td className='text-center'>{total_pallets}</td>
        <td>{consecutivo}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{pedido}</td>
        <td>{contenedor}</td>
        <td>{cliente}</td>
    </tr>
)

function InventarioSimp() {
    const [ingresos, setIngresos] = useState([])

    useEffect(() => {
        fetch("/api/v1/pallets-simplificado").then((response) => response.json()).then((data) => setIngresos(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])

    const calcularTotalPeso = (lista) => {
        let total = 0

        lista.map((unidad) => {
            total += unidad.peso_total
        })

        return (total)
    }

    const calcularTotalPallet = (lista) => {
        let total = 0

        lista.map((unidad) => {
            total += unidad.total_pallets
        })

        return (total)
    }


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
                                                <th>Pedido</th>
                                                <th>Contenedor</th>
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
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td className='text-end'><b>{new Intl.NumberFormat().format(calcularTotalPeso(ingresos).toFixed(0))}</b></td>
                                                <td className='text-center'><b>{calcularTotalPallet(ingresos)}</b></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
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

function Pallets(props) {
    const [modo, setModo] = useState(false)

    if (props.tipo == "null") {
        window.location.replace('/login')
    }
    else {
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


}

export default Pallets