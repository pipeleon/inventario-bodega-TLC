#!/usr/bin/python3
from models import storage
from datetime import datetime, timedelta
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura, pallet_factura

facturas = storage.all(cls=Factura)

lista_facturas = []

for i in facturas.values():
    lista_facturas.append(i)

print(lista_facturas[1].inicio > lista_facturas[0].inicio)

n = lista_facturas[1].inicio - lista_facturas[0].inicio

print(n)

m = timedelta(30)

print(m)

print(n > m)