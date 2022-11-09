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


const IngresosRow = ({ consecutivo, pedido, placa, contenedor, created_at, total_pallets, producto, peso_total, cliente }) => (
    <tr>
        <td>{consecutivo}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{pedido}</td>
        <td>{placa}</td>
        <td>{contenedor ? contenedor : 'N/A'}</td>
        <td>{total_pallets}</td>
        <td>{producto}</td>
        <td>{peso_total}</td>
        <td>{cliente}</td>
    </tr>
)

function Ingresos() {

    const [ingresos, setIngresos] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/ingresos").then((response) => response.json()).then((data) => setIngresos(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



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
                                                <th>No. de Pallets</th>
                                                <th>Producto</th>
                                                <th>Peso total</th>
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