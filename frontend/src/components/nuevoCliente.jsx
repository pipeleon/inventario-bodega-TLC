import React from 'react'
import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function NuevoCliente() {
  const [nombre, setNombre] = useState("")
  const [nit, setNit] = useState("")
  const [tarifa_cargue, setCargue] = useState("")
  const [tarifa_descargue, setDescargue] = useState("")
  const [tarifa_almacenamiento, setAlmacena] = useState("")
  const [tasa_seguro, setSeguro] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre,
      nit,
      tarifa_cargue,
      tarifa_descargue,
      tarifa_almacenamiento,
      tasa_seguro
    }

    console.log(data)

    fetch('http://localhost:5000/api/v1/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => console.log(data))

  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Nuevo Cliente</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className='pr-1' md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control onChange={(e) => setNombre(e.target.value)}
                          value={nombre}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='px-1' md="6">
                      <Form.Group>
                        <label>Nit</label>
                        <Form.Control onChange={(e) => setNit(e.target.value)}
                          value={nit}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col className='pr-1' md="3">
                      <Form.Group>
                        <label>Tarifa Cargue</label>
                        <Form.Control onChange={(e) => setCargue(e.target.value)}
                          value={tarifa_cargue}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='pr-1' md="3">
                      <Form.Group>
                        <label>Tarifa Descargue</label>
                        <Form.Control onChange={(e) => setDescargue(e.target.value)}
                          value={tarifa_descargue}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='px-1' md="3">
                      <Form.Group>
                        <label>Tarifa Almacenamiento</label>
                        <Form.Control onChange={(e) => setAlmacena(e.target.value)}
                          value={tarifa_almacenamiento}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='px-1' md="3">
                      <Form.Group>
                        <label>Tasa Seguro</label>
                        <Form.Control onChange={(e) => setSeguro(e.target.value)}
                          value={tasa_seguro}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="mt-5 btn-fill pull-right"
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

export default NuevoCliente