function Ingresos() {
    fetch("http://127.0.0.1:5000/api/v1/ingresos").then((response) => response.json()).then((data) => console.log(data))
    return <h1>Ingresos</h1>
}

export default Ingresos