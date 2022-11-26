#!/usr/bin/python3
"""class Pallet"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship


class Pallet(BaseModel, Base):
    """class Pallet that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'pallets'
        producto = Column(String(60), nullable=False)
        peso = Column(Float, nullable=False)
        valor = Column(Float, nullable=False)
        referencia = Column(String(60), nullable=True)
        referencia2 = Column(String(60), nullable=True)
        proovedor = Column(String(60), nullable=False)
        cliente_id = Column(String(60), ForeignKey('clientes.id'), nullable=False)
        ingreso_id = Column(String(60), ForeignKey('ingresos.id'), nullable=False)
        salida_id = Column(String(60), ForeignKey('salidas.id'), nullable=True)
        lista_observaciones = relationship("Observacion", backref="observaciones", cascade="all, delete, delete-orphan")
    else:
        producto = ""
        #proovedor = ""
        #referencia = ""
        #tipo = ""
        peso = ""
        #estado = ""
        ingreso_id = ""
        salida_id = ""
        #lista_facturas = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
