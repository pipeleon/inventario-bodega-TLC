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

function NuevoUsuario(props) {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [tipo, setTipo] = useState("")
    const [dropdown, setDropdown] = useState(false)

    const abrir = () => {
        setDropdown(!dropdown)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            nombre,
            email,
            password,
            tipo
        }


        fetch('/api/v1/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => console.log(data))
        alert("Usuario " + nombre + " creado")
    }

    console.log(props.tipo)

    if (props.tipo == "admin") {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="8">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Nuevo Usuario</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <label>Nombre</label>
                                                    <Form.Control onChange={(e) => setNombre(e.target.value)}
                                                        value={nombre}
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <label>Email</label>
                                                    <Form.Control onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <label>Password</label>
                                                    <Form.Control onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <label>Tipo</label>
                                                <Dropdown isOpen={dropdown} toggle={abrir}>
                                                    <DropdownToggle caret>
                                                        {tipo}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => {
                                                            setTipo("admin")
                                                        }}>admin</DropdownItem>
                                                        <DropdownItem onClick={() => {
                                                            setTipo("operador")
                                                        }}>operador</DropdownItem>
                                                        <DropdownItem onClick={() => {
                                                            setTipo("visitante")
                                                        }}>visitante</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Button
                                            className="mt-4 absolute btn-fill right-3"
                                            type="submit"
                                            variant="info"
                                        >
                                            Crear
                                        </Button>
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
        window.location.replace('/login')
    }
}

export default NuevoUsuario