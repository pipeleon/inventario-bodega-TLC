import React from 'react'
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

import "react-datepicker/dist/react-datepicker.css";

function NuevaFactura() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState("Cliente")
  const [cliente_id, setClienteID] = useState("")
  const [dropdown, setDropdown] = useState(false)


  const abrir = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/clientes").then((response) => response.json()).then((data) => setClientes(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      'factura': {
        'inicio': startDate,
        'fin': endDate,
        cliente_id
      }
    }

    console.log(startDate)
    console.log(endDate)


    fetch('http://localhost:5000/api/v1/facturas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => console.log(data))
  }

  return (
    <>
      <h3>Nueva Factura</h3>
      <form onSubmit={
        handleSubmit
      }>
        <label>Fecha Inicial</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <br></br>
        <label>Fecha Final</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
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
        <button>Generar</button>
      </form>
    </>
  );
}

export default NuevaFactura