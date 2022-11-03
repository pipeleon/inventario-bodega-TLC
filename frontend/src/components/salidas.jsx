import { useState, useEffect } from 'react'

const SalidasRow = ({ consecutivo, pedido, placa, contenedor, created_at, total_pallets, producto, peso_total }) => (
    <tr>
        <td>{consecutivo}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{placa}</td>
        <td>{contenedor ? contenedor : 'N/A'}</td>
        <td>{total_pallets}</td>
        <td>{producto}</td>
        <td>{peso_total}</td>
    </tr>
)

function Salidas() {

    const [salidas, setSalidas] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/salidas").then((response) => response.json()).then((data) => setSalidas(data.sort((a,b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])

    

    if (salidas.length > 0) {
        return (
            <div>
                <h3>Lista de Salidas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Fecha</th>
                            <th>Placa</th>
                            <th>Contenedor</th>
                            <th>No. de Pallets</th>
                            <th>Producto</th>
                            <th>Peso total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salidas.map((salida) =>
                                <SalidasRow
                                    key={salida.id}
                                    {...salida}
                                />
                            )
                        }
                    </tbody>
                </table >
            </div>
        )
    }
    else {
        return (
            <div>
                <h3>Lista de Salidas</h3>
                <p>No hay Salidas Aun</p>
            </div>
        )
    }


}

export default Salidas