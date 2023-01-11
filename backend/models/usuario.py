#!/usr/bin/python3
"""class Pallet"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Text

class Usuario(BaseModel, Base):
    """class Usuario that inherits from BaseModel"""

    if models.storage_t == "db":
        __tablename__ = 'usuarios'
        nombre = Column(String(30), nullable=False)
        email = Column(String(30), nullable=False)
        password = Column(Text, nullable=False)
        tipo = Column(String(30), nullable=False)
        
    else:
        nombre = ""
        email = ""
        password = ""
        tipo = ""
        
    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        super().__init__(*args, **kwargs)