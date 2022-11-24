#!/usr/bin/python3
"""class Cliente"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Text


class Observacion(BaseModel, Base):
    """class Cliente that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'observaciones'
        texto = Column(Text, nullable=False)
        pallet_id = Column(String(60), ForeignKey('pallets.id'), nullable=False)
    else:
        texto = ""
        
    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)
