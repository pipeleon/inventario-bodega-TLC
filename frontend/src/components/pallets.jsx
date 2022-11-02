import React from 'react'
import { useState, useEffect } from 'react'

const PalletsRow = ({ id, producto, peso, referencia, created_at, referencia2, proovedor, consecutivo }) => (
    <tr>
        <td>{id.slice(-5)}</td>
        <td>{producto}</td>
        <td>{peso}</td>
        <td>{referencia}</td>
        <td>{referencia2}</td>
        <td>{proovedor}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{consecutivo}</td>
    </tr>
)

function Inventario() {
    const [pallets, setPallets] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/pallets").then((response) => response.json()).then((data) => setPallets(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



    if (pallets.length > 0) {
        return (
            <div>
                <h3>Inventario</h3>
                <table>
                    <thead>
                        <tr>
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
                                <PalletsRow
                                    key={pallet.id}
                                    {...pallet}
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
                <h3>Inventario</h3>
                <p>No hay Mercancia Aun</p>
            </div>
        )
    }
}

const IngresosRow = ({ consecutivo, created_at, total_pallets, producto, peso_total }) => (
    <tr>
        <td>{producto}</td>
        <td>{peso_total}</td>
        <td>{total_pallets}</td>
        <td>{consecutivo}</td>
        <td>{created_at.slice(0, 10)}</td>
    </tr>
)

function InventarioSimp() {
    const [ingresos, setIngresos] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/pallets-simplificado").then((response) => response.json()).then((data) => setIngresos(data.sort((a, b) => a.consecutivo > b.consecutivo ? 1 : -1)))
    }, [])



    if (ingresos.length > 0) {
        return (
            <div>
                <h3>Inventario</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Peso total</th>
                            <th>No. de Pallets</th>
                            <th>Ingreso ID</th>
                            <th>Fecha Ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ingresos.map((ingreso) =>
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

function Pallets() {
    const [modo, setModo] = useState(false)
    return (
        <div>
            <input type="checkbox" onChange={() => setModo(!modo)} /> Simplificado
            {
                modo
                    ? <InventarioSimp />
                    : <Inventario />
            }
        </div>
    )


}

export default Pallets