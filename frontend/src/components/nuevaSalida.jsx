import React from 'react'
import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Table
} from "react-bootstrap";


function NuevaSalida() {
    const [pallets, setPallets] = useState([])
    const [pallets_salida, setPallets2] = useState([])
    const [consecutivo, setConsecutivo] = useState("")
    const [placa, setPlaca] = useState("")
    const [contenedor, setContenedor] = useState("")
    const [created_at, setCreated_at] = useState("")

    console.log(pallets_salida)


    useEffect(() => {
        fetch("http://localhost:5000/api/v1/pallets").then((response) => response.json()).then((data) => setPallets(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/salidas").then((response) => response.json()).then((data) => setConsecutivo("D-000"+(data.length+1)))
      }, [])

    const handleChange = (id) => {
        console.log(id)
        pallets_salida.includes(id) ? pallets_salida.splice(pallets_salida.indexOf(id), 1) && setPallets2(pallets_salida) : setPallets2([...pallets_salida, id])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            'salida': {
                consecutivo,
                placa,
                contenedor,
                created_at
            },
            'pallets': pallets_salida
        }

        fetch('http://localhost:5000/api/v1/salidas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => console.log(data))
    }



    if (pallets.length > 0) {
        return (
            <>
                <Container fluid>
                    <Row className='my-2'>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h3">Nueva Salida</Card.Title>
                                </Card.Header>
                            </Card>
                        </Col>
                    </Row>
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
                                                <th></th>
                                                <th>Id</th>
                                                <th>Producto</th>
                                                <th>Peso</th>
                                                <th>Referencia 1</th>
                                                <th>Referencia 2</th>
                                                <th>Proovedor</th>
                                                <th>Fecha Ingreso</th>
                                                <th>Ingreso ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pallets.map((pallet) =>
                                                    !pallet.salida_id &&
                                                    <tr>
                                                        <td><input type="checkbox" onChange={(e) => handleChange(e.target.value)}
                                                            value={pallet.id} /></td>
                                                        <td>{pallet.id.slice(-5)}</td>
                                                        <td>{pallet.producto}</td>
                                                        <td>{pallet.peso}</td>
                                                        <td>{pallet.referencia}</td>
                                                        <td>{pallet.referencia2}</td>
                                                        <td>{pallet.proovedor}</td>
                                                        <td>{pallet.created_at.slice(0, 10)}</td>
                                                        <td>{pallet.consecutivo}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Datos Salida</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col className='pr-1' md="6">
                                                <Form.Group>
                                                    <label>No</label>
                                                    <Form.Control onChange={(e) => setConsecutivo(e.target.value)}
                                                        value={consecutivo}
                                                        disabled="true"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <label>Fecha</label>
                                                <DatePicker selected={created_at} onChange={(date) => setCreated_at(date)} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='pr-1' md="6">
                                                <Form.Group>
                                                    <label>Placa</label>
                                                    <Form.Control onChange={(e) => setPlaca(e.target.value)}
                                                        value={placa}
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className='pr-1' md="6">
                                                <Form.Group>
                                                    <label>Contenedor</label>
                                                    <Form.Control onChange={(e) => setContenedor(e.target.value)}
                                                        value={contenedor}
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button
                                                    className="mt-4 btn-fill right-3"
                                                    type="submit"
                                                    variant="info"
                                                >
                                                    Generar
                                                </Button>
                                                <div className="clearfix"></div>
                                            </Col>
                                        </Row>
                                    </Form>
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
            <div>
                 <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className='strpied-tabled-with-hover'>
                                <Card.Header>
                                    <Card.Title as="h4">Nueva Salida</Card.Title>
                                    <p className="card-category">
                                        No hay Inventario Aun
                                    </p>
                                </Card.Header>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default NuevaSalida