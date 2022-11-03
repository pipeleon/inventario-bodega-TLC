#!/usr/bin/python3
"""class Ingreso"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Ingreso(BaseModel, Base):
    """class Ingreso that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'ingresos'
        consecutivo = Column(String(7), nullable=False)
        placa = Column(String(10), nullable=False)
        contenedor = Column(String(20), nullable=True)
        pedido = Column(String(10), nullable=False)
        lista_pallets = relationship("Pallet", backref="ingresos", cascade="all, delete, delete-orphan")
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
