import React from 'react'
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
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

import "react-datepicker/dist/react-datepicker.css";

function NuevaFactura() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState("Cliente")
  const [cliente_id, setClienteID] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [consecutivo, setConsecutivo] = useState("")


  const abrir = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/clientes").then((response) => response.json()).then((data) => setClientes(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/facturas").then((response) => response.json()).then((data) => setConsecutivo("F-000"+(data.length+1)))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      'factura': {
        consecutivo,
        'inicio': startDate,
        'fin': endDate,
        cliente_id
      }
    }

    console.log(startDate)
    console.log(endDate)


    fetch('http://localhost:5000/api/v1/facturas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => console.log(data))
    alert("Factura " + consecutivo + " generada")
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Nueva Factura</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className='pr-1' md="6">
                      <Form.Group>
                        <label>No</label>
                        <Form.Control onChange={(e) => setConsecutivo(e.target.value)}
                          value={consecutivo}
                          type="text"
                          disabled="true"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='mt-4'>
                      <Dropdown isOpen={dropdown} toggle={abrir}>
                        <DropdownToggle caret>
                          {cliente}
                        </DropdownToggle>
                        <DropdownMenu>
                          {
                            clientes.map((cliente) =>
                              <DropdownItem onClick={() => {
                                setClienteID(cliente.id)
                                setCliente(cliente.nombre)
                              }}
                                value={cliente.id}>{cliente.nombre}</DropdownItem>)
                          }
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col>
                      <label>Fecha Inicial</label>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                    <Col>
                      <label>Fecha Final</label>
                      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </Col>
                  </Row>
                  <Button
                    className="mt-4 absolute btn-fill right-3"
                    type="submit"
                    variant="info"
                  >
                    Generar
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default NuevaFactura