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
    Form
} from "react-bootstrap";
import { generatePath, useNavigate } from 'react-router-dom';

function PalletById() {
    let { id } = useParams()

    const [pallet, setPallet] = useState()
    const [observacion, setObservacion] = useState()
    const [observaciones, setObservaciones] = useState([])

    useEffect(() => {
        const path1 = "http://localhost:5000"
        const path2 = generatePath("/api/v1/pallet/:id", { id: id })
        const path3 = generatePath("/api/v1/observaciones/:id", { id: id })
        const path = path1 + path2
        fetch(path).then((response) => response.json()).then((data) => setPallet(data))
        fetch(path1 + path3).then((response) => response.json()).then((data) => setObservaciones(data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            'texto': observacion,
            'pallet_id': id
        }

        fetch('http://localhost:5000/api/v1/observaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => console.log(data))
        alert("Observacion creada")
        const path1 = "http://localhost:5000"
        const path3 = generatePath("/api/v1/observaciones/:id", { id: id })
        fetch(path1 + path3).then((response) => response.json()).then((data) => setObservaciones(data))
    }

    if (pallet) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h3">Pallet {pallet.id.slice(-5)}</Card.Title>
                                </Card.Header>
                                <Card.Body className='table-full-width table-responsive px-0'>
                                    <Table className='table-hover table-striped'>
                                        <thead>
                                            <tr>
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
                                            <tr>
                                                <td>{pallet.producto}</td>
                                                <td>{pallet.peso}</td>
                                                <td>{pallet.referencia}</td>
                                                <td>{pallet.referencia2}</td>
                                                <td>{pallet.proovedor}</td>
                                                <td>{pallet.created_at.slice(0, 10)}</td>
                                                <td>{pallet.consecutivo}</td>
                                                <td>{pallet.cliente}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className='strpied-tabled-with-hover mt-3'>
                                <Card.Header>
                                    <Card.Title as="h4">Observaciones</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {
                                        observaciones.map((obs) =>
                                        <p>
                                            {obs.texto} - {obs.created_at}
                                        </p>)
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className='strpied-tabled-with-hover mt-3'>
                                <Card.Header>
                                    <Card.Title as="h4">Nueva Observacion</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Control onChange={(e) => setObservacion(e.target.value)}
                                                        value={observacion}
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            className="mt-3 btn-fill pull-right"
                                            type="submit"
                                            variant="info"
                                        >
                                            Guardar
                                        </Button>
                                        <div className="clearfix"></div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default PalletById