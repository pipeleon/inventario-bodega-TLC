import React from 'react'
import { useState, useEffect } from "react";
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
import httpClient from "../httpClient";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [tipo, setTipo] = useState("null")

    useEffect(() => {
        (async () => {

            try {
                const resp = await httpClient.get("http://localhost:5000/api/v1/@me")
                setTipo(resp.data.tipo)
            } catch (error) {
                setTipo("null")
                console.log("no se auth")
            }
        })()
    }, [])

    const logout = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/v1/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        /* const res = await httpClient.post("http://localhost:5000/api/v1/logout") */

        console.log(res)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        }


        /* const res = await fetch('http://localhost:5000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }) */

        const resp = await httpClient.post('http://localhost:5000/api/v1/login', data)

        console.log(resp)



        console.log(resp.status)

        if (resp.status == 201) {
            console.log(resp)
            /* window.location.href = "/"; */
            /* const res = await fetch("http://localhost:5000/api/v1/@me", { credentials: 'include' })
            console.log(res) */
        }
        else {
            alert("Credenciales Invalidas")
        }
    }

    if (tipo == "null") {
        return (
            <><Container className='p-10'>
                <Row >
                    <Col >
                        <Card >
                            <Card.Header className='p-10'>
                                <Card.Title as="h4">Login</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
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
                                                    type="password"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="mt-4 absolute btn-fill right-3"
                                        type="submit"
                                        variant="info"
                                    >
                                        Login
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container></>
        )
    }
    else {
        console.log(tipo)
        /* window.location.replace('/') */
    }
}

export default Login