import React from 'react'
import { useState, useEffect } from 'react'

const IngresosRow = ({ inicio, fin, valor_cargues, valor_descargues, valor_almacenamiento, valor_seguro, total_pallets, cliente, consecutivo }) => (
    <tr>
        <td>{consecutivo}</td>
        <td>{inicio}</td>
        <td>{fin}</td>
        <td>{valor_cargues}</td>
        <td>{valor_descargues}</td>
        <td>{valor_seguro}</td>
        <td>{valor_almacenamiento}</td>
        <td>{total_pallets}</td>
        <td>{cliente}</td>
    </tr>
)

function Facturas() {
    const [facturas, setFacturas] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/facturas").then((response) => response.json()).then((data) => setFacturas(data.sort((a,b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



    if (facturas.length > 0) {
        return (
            <div>
                <h3>Lista de Facturas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Valor en Cargues</th>
                            <th>Valor en Descargues</th>
                            <th>Valor en Seguros</th>
                            <th>Valor Almacenamiento</th>
                            <th>Pallets total</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            facturas.map((ingreso) =>
                                <IngresosRow
                                    key={ingreso.id}
                                    {...ingreso}
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
                <h3>Lista de Ingresos</h3>
                <p>No hay Ingresos Aun</p>
            </div>
        )
    }
}

export default Facturas