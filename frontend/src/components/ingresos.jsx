import { useState, useEffect } from 'react'

const IngresosRow = ({ consecutivo, pedido, placa, contenedor, created_at }) => (
    <tr>
        <td>{consecutivo}</td>
        <td>{created_at.slice(0, 10)}</td>
        <td>{pedido}</td>
        <td>{placa}</td>
        <td>{contenedor}</td>
    </tr>
)

function Ingresos() {

    const [ingresos, setIngresos] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/v1/ingresos").then((response) => response.json()).then((data) => setIngresos(data))
    }, [])

    

    if (ingresos.length > 0) {
        return (
            <div>
                <h3>Lista de Ingresos</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Fecha</th>
                            <th>Pedido</th>
                            <th>Placa</th>
                            <th>Contenedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ingresos.map((ingreso, i) =>
                                <IngresosRow
                                    key={i}
                                    {...ingreso}
                                />
                            )
                        }
                    </tbody>
                </table >
            </div>
        )
    }


}

export default Ingresos