import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Ingresos from './components/ingresos'
import Salidas from './components/salidas'
import Pallets from './components/pallets'
import Facturas from './components/facturas'
import NuevoIngreso from './components/nuevoIngreso'
import NuevaSalida from './components/nuevaSalida'
import NuevaFactura from './components/nuevaFactura'
import NuevoCliente from './components/nuevoCliente'
import IngresoById from './components/ingresoById'
import SalidaById from './components/salidaById'
import FacturaById from './components/facturaById'
import PalletById from './components/palletById'
import TableList from './components/pruebaTabla'
import Home from './components/home'
import Nav2 from './Nav'
import reactLogo from './assets/Total.png'
import Login from './components/login'
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
import httpClient from './httpClient'
import NuevoUsuario from './components/nuevoUsuario';


function App() {
  const [name, setName] = useState({tipo: "null"})

  useEffect(() => {
    (async () => {

      try {
        const resp = await httpClient.get("http://localhost:5000/api/v1/@me")
        setName(resp.data)
      } catch (error) {
        setName({tipo: "null"})
        console.log("no se auth")
      }
    })()
  }, [])

  const logout = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    window.location.href = "/login"
  }



  return (
    <div className="App">
      {name.tipo != "null" &&
        <>
          <Row>
            <Col md="2">
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} />
              </a>
            </Col>
            <Col className='mt-5'>
              <h1>Inventario Total Logistics Cargo</h1>
            </Col>
            <Col>
              <Button
                className="mt-4 absolute btn-fill right-3"
                onClick={logout}
              >
                Logout
              </Button>
            </Col>
          </Row>
          <Nav2 />
        </>
      }

      <Routes>
        <Route path='/' element={<Home tipo={name.tipo}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/ingresos' element={<Ingresos tipo={name.tipo} />} />
        <Route path='/nuevo-ingreso' element={<NuevoIngreso tipo={name.tipo} />} />
        <Route path='/nuevo-cliente' element={<NuevoCliente tipo={name.tipo}/>} />
        <Route path='/inventario' element={<Pallets tipo={name.tipo}/>} />
        <Route path='/nueva-salida' element={<NuevaSalida tipo={name.tipo}/>} />
        <Route path='/salidas' element={<Salidas tipo={name.tipo}/>} />
        <Route path='/nueva-factura' element={<NuevaFactura tipo={name.tipo}/>} />
        <Route path='/facturas' element={<Facturas tipo={name.tipo}/>} />
        <Route path='/nuevo-usuario' element={<NuevoUsuario tipo={name.tipo}/>} />
        <Route path='/ingreso/:id' element={<IngresoById />} />
        <Route path='/salida/:id' element={<SalidaById />} />
        <Route path='/factura/:id' element={<FacturaById />} />
        <Route path='/pallet/:id' element={<PalletById />} />
      </Routes>
    </div>
  )

}

export default App
