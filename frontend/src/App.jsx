import { useState } from 'react'
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
import TableList from './components/pruebaTabla'
import Home from './components/home'
import Nav2 from './Nav'
import reactLogo from './assets/Total.png'
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


function App() {

  return (
    <div className="App">
      <Row>
        <Col md="2">
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} />
          </a>
        </Col>
        <Col className='mt-5'>
          <h1>Inventario Total Logistics Cargo</h1>
        </Col>
      </Row>
      

      <Nav2 />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingresos' element={<Ingresos />} />
        <Route path='/nuevo-ingreso' element={<NuevoIngreso />} />
        <Route path='/nuevo-cliente' element={<NuevoCliente />} />
        <Route path='/inventario' element={<Pallets />} />
        <Route path='/nueva-salida' element={<NuevaSalida />} />
        <Route path='/salidas' element={<Salidas />} />
        <Route path='/nueva-factura' element={<NuevaFactura />} />
        <Route path='/facturas' element={<Facturas />} />
        <Route path='/prueba-tabla' element={<TableList />} />
        <Route path='/ingreso/:id' element={<IngresoById />} />
      </Routes>
    </div>
  )
}

export default App
