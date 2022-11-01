import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

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
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState("Cliente")
  const [cliente_id, setClienteID] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [modo, setModo] = useState(false)


  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0])

    
    console.log(file)
    
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\r")).split(";");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    console.log(csvHeader)
    console.log(csvRows)

    const array2 = csvRows.map(i => {
      const values = i.split(";");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    console.log(array2)
    setArray(array2.slice(0, -1))
    console.log(array)
  };

  

  

  const abrir = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/clientes").then((response) => response.json()).then((data) => setClientes(data))
  }, [])

  console.log(array)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput)

      };

      fileReader.readAsText(file);
    }
    
    let pallets = []

    if (modo) {
      pallets = array
    }
    else {
      for (let i = 0; i < cantidad; i++) {
        const newPallet = {
          producto,
          'peso': (pesoT / cantidad),
          referencia,
          proovedor
        }
        pallets.push(newPallet)
      }
    }

    if (pallets.length > 0) {
    

    const data = {
      'ingreso': {
        consecutivo,
        pedido,
        placa,
        contenedor
      },
      pallets,
      'cliente': cliente_id
    }


    fetch('http://localhost:5000/api/v1/ingresos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => console.log(data))
  }

  }


  return (
    <div>
      <h3>Nuevo Ingreso</h3>
      <form onSubmit={
        handleSubmit
      }>
        <label>No</label>
        <input onChange={(e) => setConsecutivo(e.target.value)}
          value={consecutivo} />
        <br></br>
        <label>Fecha</label>
        <input placeholder='AAAA/MM/DD' onChange={(e) => setCreated_at(e.target.value)}
          value={created_at} />
        <br></br>
        <label>Pedido</label>
        <input onChange={(e) => setPedido(e.target.value)}
          value={pedido} />
        <br></br>
        <label>Placa</label>
        <input onChange={(e) => setPlaca(e.target.value)}
          value={placa} />
        <br></br>
        <label>Contenedor</label>
        <input onChange={(e) => setContenedor(e.target.value)}
          value={contenedor} />
        <br></br>
        <br></br>
        <input type="checkbox" onChange={() => setModo(!modo)} /> CSV
        <br></br>
        {modo == true &&
        <>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />
            
            </>
        }
        <br></br>

        <label>Producto</label>
        <input onChange={(e) => setProducto(e.target.value)}
          value={producto}
          disabled={modo} />
        <br></br>
        <label>Peso Total</label>
        <input onChange={(e) => setPeso(e.target.value)}
          value={pesoT}
          disabled={modo} />
        <br></br>
        <label>Cantidad de Pallets</label>
        <input onChange={(e) => setCantidad(e.target.value)}
          value={cantidad}
          disabled={modo} />
        <br></br>
        <label>Referencia</label>
        <input onChange={(e) => setReferencia(e.target.value)}
          value={referencia}
          disabled={modo} />
        <br></br>
        <label>Proovedor</label>
        <input onChange={(e) => setProovedor(e.target.value)}
          value={proovedor}
          disabled={modo} />

        <br></br>
        <br></br>
        <Dropdown isOpen={dropdown} toggle={abrir}>
          <DropdownToggle caret>
            {cliente}
          </DropdownToggle>
          <DropdownMenu>
            {
              clientes.map((cliente) =>
                <DropdownItem onClick={() => {
                  setClienteID(cliente.id)
                  setCliente(cliente.nombre)
                }}
                  value={cliente.id}>{cliente.nombre}</DropdownItem>)
            }
          </DropdownMenu>
        </Dropdown>
        <br></br>
        <br></br>
        <button>Guardar</button>
      </form>
    </div>
  )
}

export default NuevoIngreso