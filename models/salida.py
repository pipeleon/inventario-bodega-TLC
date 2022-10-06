#!/usr/bin/python3
"""class Salida"""
from models.base_model import BaseModel


class Salida(BaseModel):
    """class Salida that inherits from BaseModel"""
    placa = ""
    contenedor = ""
    transportadora = ""
    observaciones = ""
    lista_pallets = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
