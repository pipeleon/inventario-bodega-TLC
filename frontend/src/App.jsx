import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Ingresos from './components/ingresos'
import NuevoIngreso from './components/nuevoIngreso'
import NuevoCliente from './components/nuevoCliente'
import Home from './components/home'
import Nav from './Nav'
import reactLogo from './assets/Total.png'


function App() {
  
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} />
        </a>
      </div>
      <h1>Inventario Total Logistics Cargo</h1>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingresos' element={<Ingresos />} />
        <Route path='/nuevoIngreso' element={<NuevoIngreso />} />
        <Route path='/nuevoCliente' element={<NuevoCliente />} />
      </Routes>
    </div>
  )
}

export default App
