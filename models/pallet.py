#!/usr/bin/python3
"""class Pallet"""
from models.base_model import BaseModel


class Pallet(BaseModel):
    """class Pallet that inherits from BaseModel"""
    producto = ""
    proovedor = ""
    referencia = ""
    tipo = ""
    peso = ""
    estado = ""
    ingreso_id = ""
    salida_id = ""
    lista_facturas = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
