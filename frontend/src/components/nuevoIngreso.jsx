import React from 'react'
import { useState } from 'react'

function NuevoIngreso() {
  const [consecutivo, setConsecutivo] = useState("")
  const [created_at, setCreated_at] = useState("")
  const [pedido, setPedido] = useState("")
  const [placa, setPlaca] = useState("")
  const [contenedor, setContenedor] = useState("")
  const [producto, setProducto] = useState("")
  const [pesoT, setPeso] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [referencia, setReferencia] = useState("")
  const [proovedor, setProovedor] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    let pallets = []
    
    for (let i = 0; i < cantidad; i++) {
      const newPallet = {
        producto,
        'peso': (pesoT / cantidad),
        referencia,
        proovedor
      }
      pallets.push(newPallet)
    }

    const data = {
      'ingreso': {
        consecutivo,
        pedido,
        placa,
        contenedor
      },
      pallets,
    }

    console.log(data)

    fetch('http://localhost:5000/api/v1/ingresos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => console.log(data))

  }

  return (
    <div>
      <h3>Nuevo Ingreso</h3>
      <form onSubmit={handleSubmit}>
        <label>No</label>
        <input onChange={(e) => setConsecutivo(e.target.value)}
          value={consecutivo} />
        <label>Fecha</label>
        <input placeholder='AAAA/MM/DD' onChange={(e) => setCreated_at(e.target.value)}
          value={created_at} />
        <label>Pedido</label>
        <input onChange={(e) => setPedido(e.target.value)}
          value={pedido} />
        <label>Placa</label>
        <input onChange={(e) => setPlaca(e.target.value)}
          value={placa} />
        <label>Contenedor</label>
        <input onChange={(e) => setContenedor(e.target.value)}
          value={contenedor} />
        <label>Producto</label>
        <input onChange={(e) => setProducto(e.target.value)}
          value={producto} />
        <label>Peso Total</label>
        <input onChange={(e) => setPeso(e.target.value)}
          value={pesoT} />
        <label>Cantidad de Pallets</label>
        <input onChange={(e) => setCantidad(e.target.value)}
          value={cantidad} />
        <label>Referencia</label>
        <input onChange={(e) => setReferencia(e.target.value)}
          value={referencia} />
        <label>Proovedor</label>
        <input onChange={(e) => setProovedor(e.target.value)}
          value={proovedor} />
        <button>Guardar</button>
      </form>
    </div>
  )
}

export default NuevoIngreso