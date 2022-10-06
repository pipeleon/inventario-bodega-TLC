#!/usr/bin/python3
"""class Ingreso"""
from models.base_model import BaseModel


class Ingreso(BaseModel):
    """class Ingreso that inherits from BaseModel"""
    pedido = ""
    placa = ""
    origen = ""
    contenedor = ""
    transportadora = ""
    observaciones = ""
    lista_pallets = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
