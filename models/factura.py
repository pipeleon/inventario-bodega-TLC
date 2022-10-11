#!/usr/bin/python3
"""class Pallet"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship


if models.storage_t == 'db':
    pallet_factura = Table('pallet_factura', Base.metadata,
                          Column('pallet_id', String(60),
                                 ForeignKey('pallets.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True),
                          Column('factura_id', String(60),
                                 ForeignKey('facturas.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True))

class Factura(BaseModel, Base):
    """class Factura that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'facturas'
        inicio = Column(DateTime, nullable=False)
        fin = Column(DateTime, nullable=False)
        lista_pallets = relationship("Pallet", secondary=pallet_factura, viewonly=False)
    else:
        inicio = ""
        fin = ""
        lista_pallets = []

    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
