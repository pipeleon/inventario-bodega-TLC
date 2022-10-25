#!/usr/bin/python3
"""class Salida"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Salida(BaseModel, Base):
    """class Salida that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'salidas'
        placa = Column(String(10), nullable=False)
        lista_pallets = relationship("Pallet", backref="salidas", cascade="all, delete, delete-orphan")
    else:
        #pedido = ""
        placa = ""
        #origen = ""
        #contenedor = ""
        #transportadora = ""
        #observaciones = ""
        #lista_pallets = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
