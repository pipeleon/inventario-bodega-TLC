#!/usr/bin/python3
"""class Pallet"""
from models.base_model import BaseModel


class Factura(BaseModel):
    """class Factura that inherits from BaseModel"""
    inicio = ""
    fin = ""
    lista_pallets = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
