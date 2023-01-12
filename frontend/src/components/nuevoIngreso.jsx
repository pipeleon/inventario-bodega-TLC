import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
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

function NuevoIngreso(props) {
  const [consecutivo, setConsecutivo] = useState("")
  const [created_at, setCreated_at] = useState("")
  const [pedido, setPedido] = useState("")
  const [placa, setPlaca] = useState("")
  const [contenedor, setContenedor] = useState("")
  const [producto, setProducto] = useState("")
  const [pesoT, setPeso] = useState("")
  const [valorT, setValor] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [referencia, setReferencia] = useState("")
  const [proovedor, setProovedor] = useState("")
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState("Cliente")
  const [cliente_id, setClienteID] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [modo, setModo] = useState(false)


  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0])


    console.log(file)

  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\r")).split(";");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    console.log(csvHeader)
    console.log(csvRows)

    const array2 = csvRows.map(i => {
      const values = i.split(";");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    console.log(array2)
    setArray(array2.slice(0, -1))
    console.log(array)
  };





  const abrir = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/clientes").then((response) => response.json()).then((data) => setClientes(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/ingresos").then((response) => response.json()).then((data) => setConsecutivo("C-00" + (data.length + 1)))
  }, [])

  console.log(array)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput)

      };

      fileReader.readAsText(file);
    }

    let pallets = []

    if (modo) {
      pallets = array
    }
    else {
      for (let i = 0; i < cantidad; i++) {
        const newPallet = {
          producto,
          'peso': (pesoT / cantidad),
          'valor': (valorT / cantidad),
          referencia,
          proovedor
        }
        pallets.push(newPallet)
      }
    }

    if (pallets.length > 0) {


      const data = {
        'ingreso': {
          consecutivo,
          pedido,
          placa,
          contenedor,
          created_at
        },
        pallets,
        'cliente': cliente_id
      }


      fetch('http://localhost:5000/api/v1/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json()).then((data) => console.log(data))
      alert("Ingreso " + consecutivo + " generado")
      fetch("http://localhost:5000/api/v1/ingresos").then((response) => response.json()).then((data) => setConsecutivo("C-00" + (data.length + 1)))

    }

  }


  if (props && (props.tipo == "admin" || props.tipo == "operador") ) {    
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="7">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Nuevo Ingreso</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>No</label>
                          <Form.Control onChange={(e) => setConsecutivo(e.target.value)}
                            type="text"
                            disabled="true"
                            value={consecutivo}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <label>Fecha</label>
                        <DatePicker selected={created_at} onChange={(date) => setCreated_at(date)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Pedido</label>
                          <Form.Control onChange={(e) => setPedido(e.target.value)}
                            value={pedido}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
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
                    </Row>
                    <Row>
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
                    <Row className='my-3'>
                      <Col>
                        <input type="checkbox" onChange={() => setModo(!modo)} /> CSV
                        <br></br>
                        {modo == true &&
                          <>
                            <input
                              type={"file"}
                              id={"csvFileInput"}
                              accept={".csv"}
                              onChange={handleOnChange}
                            />

                          </>
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Producto</label>
                          <Form.Control onChange={(e) => setProducto(e.target.value)}
                            value={producto}
                            disabled={modo}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Peso Total</label>
                          <Form.Control onChange={(e) => setPeso(e.target.value)}
                            value={pesoT}
                            disabled={modo}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Cantidad de Pallets</label>
                          <Form.Control onChange={(e) => setCantidad(e.target.value)}
                            value={cantidad}
                            disabled={modo}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Valor Declarado</label>
                          <Form.Control onChange={(e) => setValor(e.target.value)}
                            value={valorT}
                            disabled={modo}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Referencia</label>
                          <Form.Control onChange={(e) => setReferencia(e.target.value)}
                            value={referencia}
                            disabled={modo}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md="6">
                        <Form.Group>
                          <label>Proovedor</label>
                          <Form.Control onChange={(e) => setProovedor(e.target.value)}
                            value={proovedor}
                            disabled={modo}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='my-3'>
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
    )
  }
  else {
    window.location.replace('/login')
  }
}

export default NuevoIngreso