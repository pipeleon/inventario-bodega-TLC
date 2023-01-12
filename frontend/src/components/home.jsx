import { useState, useEffect } from 'react'
import httpClient from '../httpClient'

function Home() {
    const [tipo, setTipo] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        (async () => {

            try {
                const resp = await httpClient.get("http://localhost:5000/api/v1/@me")
                setTipo(resp.data.tipo)
                setName(resp.data.nombre)
            } catch (error) {
                setTipo("null")
                console.log(resp)
                console.log("no se auth")
            }
        })()
    }, [])


    if (tipo == "") {
        return <h1>Cargando</h1>
    }
    else if (tipo == "null") {
        window.location.replace('/login')
    }
    else {
        return <h1>Bienvenido {name}</h1>
    }
}

export default Home