#!/usr/bin/python3
from models import storage
from datetime import datetime
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura, pallet_factura

ingresos = storage.all(cls=Ingreso)

for i in ingresos.values():
    print(i.lista_pallets)

