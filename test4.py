#!/usr/bin/python3
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura

print(storage.all(cls=Pallet))