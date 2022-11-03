import React from 'react'
import { useState, useEffect } from 'react'


function NuevaSalida() {
    const [pallets, setPallets] = useState([])
    const [pallets_salida, setPallets2] = useState([])
    const [consecutivo, setConsecutivo] = useState("")
    const [placa, setPlaca] = useState("")
    const [contenedor, setContenedor] = useState("")
    
    console.log(pallets_salida)


    useEffect(() => {
        fetch("http://localhost:5000/api/v1/pallets").then((response) => response.json()).then((data) => setPallets(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])

    const handleChange = (id) => {
        console.log(id)
        pallets_salida.includes(id) ? pallets_salida.splice(pallets_salida.indexOf(id), 1) && setPallets2(pallets_salida) : setPallets2([...pallets_salida, id])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            'salida': {
              consecutivo,
              placa,
              contenedor
            },
            'pallets': pallets_salida
          }

        fetch('http://localhost:5000/api/v1/salidas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((response) => response.json()).then((data) => console.log(data))
    }



    if (pallets.length > 0) {
        return (
            <div>
                <h3>Inventario</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Producto</th>
                            <th>Peso</th>
                            <th>Referencia 1</th>
                            <th>Referencia 2</th>
                            <th>Proovedor</th>
                            <th>Fecha Ingreso</th>
                            <th>Ingreso ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pallets.map((pallet) =>
                                !pallet.salida_id &&
                                <tr>
                                    <td><input type="checkbox" onChange={(e) => handleChange(e.target.value)}
                                        value={pallet.id} /></td>
                                    <td>{pallet.id.slice(-5)}</td>
                                    <td>{pallet.producto}</td>
                                    <td>{pallet.peso}</td>
                                    <td>{pallet.referencia}</td>
                                    <td>{pallet.referencia2}</td>
                                    <td>{pallet.proovedor}</td>
                                    <td>{pallet.created_at.slice(0, 10)}</td>
                                    <td>{pallet.consecutivo}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table >
                <div>
                    <form onSubmit={
                        handleSubmit
                    }>
                        <label>No</label>
                        <input onChange={(e) => setConsecutivo(e.target.value)}
                            value={consecutivo} />
                        <br></br>
                        <label>Placa</label>
                        <input onChange={(e) => setPlaca(e.target.value)}
                            value={placa} />
                        <br></br>
                        <label>Contenedor</label>
                        <input onChange={(e) => setContenedor(e.target.value)}
                            value={contenedor} />

                        <button>Guardar</button>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h3>Inventario</h3>
                <p>No hay Mercancia Aun</p>
            </div>
        )
    }
}

export default NuevaSalida