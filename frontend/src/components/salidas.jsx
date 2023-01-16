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

function Salidas(props) {

    const [salidas, setSalidas] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        fetch("/api/v1/salidas").then((response) => response.json()).then((data) => setSalidas(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
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
        if (salidas.length > 0) {
            return (
                <>
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card className='strpied-tabled-with-hover'>
                                    <Card.Header>
                                        <Card.Title as="h4">Lista de Salidas</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='table-full-width table-responsive px-0'>
                                        <Table className='table-hover table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Fecha</th>
                                                    <th>Placa</th>
                                                    <th>Contenedor</th>
                                                    <th className='text-center'>No. de Pallets</th>
                                                    <th>Producto</th>
                                                    <th>Peso total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    salidas.map((salida) =>
                                                        <tr>
                                                            <td>{salida.consecutivo}</td>
                                                            <td>{salida.created_at.slice(0, 10)}</td>
                                                            <td>{salida.placa}</td>
                                                            <td>{salida.contenedor ? salida.contenedor : 'N/A'}</td>
                                                            <td className='text-center'>{salida.total_pallets}</td>
                                                            <td>{salida.producto}</td>
                                                            <td className='text-end'>{new Intl.NumberFormat().format(salida.peso_total.toFixed(0))}</td>
                                                            <td><Button onClick={() => {
                                                                const path = generatePath("/salida/:id", { id: salida.id })
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
                                                    <td className='text-center'>{calcularTotalPallet(salidas)}</td>
                                                    <td></td>
                                                    <td className='text-end'>{new Intl.NumberFormat().format(calcularTotalPeso(salidas).toFixed(0))}</td>
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
                                        <Card.Title as="h4">Lista de Salidas</Card.Title>
                                        <p className="card-category">
                                            No hay Salidas Aun
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

export default Salidas