import React from 'react'
import { useState } from 'react'

function NuevoCliente() {
    const [nombre, setNombre] = useState("")
    const [nit, setNit] = useState("")
    const [tarifa_cargue, setCargue] = useState("")
    const [tarifa_almacenamiento, setAlmacena] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault();
        
      const data = {
        nombre,
        nit,
        tarifa_cargue,
        tarifa_almacenamiento
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
      <div>
        <h3>Nuevo Cliente</h3>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input onChange={(e) => setNombre(e.target.value)}
            value={nombre} />
          <label>Nit</label>
          <input onChange={(e) => setNit(e.target.value)}
            value={nit} />
          <label>Tarifa Cargue</label>
          <input onChange={(e) => setCargue(e.target.value)}
            value={tarifa_cargue} />
          <label>Tarifa Almacenamiento</label>
          <input onChange={(e) => setAlmacena(e.target.value)}
            value={tarifa_almacenamiento} />
          <button>Guardar</button>
        </form>
      </div>
    )
}

export default NuevoCliente