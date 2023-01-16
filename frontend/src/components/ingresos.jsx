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

function Ingresos(props) {

    const [ingresos, setIngresos] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        fetch("/api/v1/ingresos").then((response) => response.json()).then((data) => setIngresos(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
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

    /* if (props.tipo == "null") {
        window.location.replace('/login')
    }
    else { */
        if (ingresos.length > 0) {
            return (
                <>
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card className='strpied-tabled-with-hover'>
                                    <Card.Header>
                                        <Card.Title as="h4">Lista de Ingresos</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='table-full-width table-responsive px-0'>
                                        <Table className='table-hover table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Fecha</th>
                                                    <th>Pedido</th>
                                                    <th>Placa</th>
                                                    <th>Contenedor</th>
                                                    <th className='text-center'>No. de Pallets</th>
                                                    <th>Producto</th>
                                                    <th>Peso total</th>
                                                    <th>Cliente</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ingresos.map((ingreso) =>
                                                        <tr>
                                                            <td className='w-5'>{ingreso.consecutivo}</td>
                                                            <td>{ingreso.created_at.slice(0, 10)}</td>
                                                            <td>{ingreso.pedido}</td>
                                                            <td>{ingreso.placa}</td>
                                                            <td>{ingreso.contenedor ? ingreso.contenedor : 'N/A'}</td>
                                                            <td className='text-center'>{ingreso.total_pallets}</td>
                                                            <td>{ingreso.producto}</td>
                                                            <td className='text-end'>{new Intl.NumberFormat().format(ingreso.peso_total.toFixed(0))}</td>
                                                            <td>{ingreso.cliente}</td>
                                                            <td><Button onClick={() => {
                                                                const path = generatePath("/ingreso/:id", { id: ingreso.id })
                                                                navigate(path)
                                                            }}>Ver</Button></td>
                                                        </tr>
                                                    )
                                                }
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className='text-center'>{calcularTotalPallet(ingresos)}</td>
                                                    <td></td>
                                                    <td className='text-end'>{new Intl.NumberFormat().format(calcularTotalPeso(ingresos).toFixed(0))}</td>
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
                                        <Card.Title as="h4">Lista de Ingresos</Card.Title>
                                        <p className="card-category">
                                            No hay Ingresos Aun
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

export default Ingresos