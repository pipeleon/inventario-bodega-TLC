#!/usr/bin/python3
"""class Cliente"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Cliente(BaseModel, Base):
    """class Cliente that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'clientes'
        nombre = Column(String(15), nullable=False)
        nit = Column(Integer, nullable=False)
        tarifa_cargue = Column(Integer, nullable=False)
        tarifa_almacenamiento = Column(Integer, nullable=False)
        lista_pallets = relationship("Pallet", backref="clientes", cascade="all, delete, delete-orphan")
        lista_facturas = relationship("Factura", backref="clientes", cascade="all, delete, delete-orphan")
    else:
        nombre = ""
        nit = 0
        tarifa_cargue = 0
        tarifa_almacenamiento = 0
        
    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
