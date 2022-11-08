#!/usr/bin/python3
from models import storage
from datetime import datetime, timedelta
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura, pallet_factura
from models.cliente import Cliente

facturas = storage.all(cls=Factura)

lista_facturas = []

for i in facturas.values():
    lista_facturas.append(i)

#print(lista_facturas)

cliente = storage.get(cls=Cliente, id=lista_facturas[0].cliente_id)

print(cliente.nombre)

#print(lista_facturas[1].inicio > lista_facturas[0].inicio)

n = lista_facturas[1].inicio - lista_facturas[0].inicio

pallets = storage.all(cls=Pallet)

lista_pallets = []

for p in pallets:
    lista_pallets.append(i)

print(lista_pallets)
print(len(lista_pallets))

lista_cliente = []

for pallet in lista_pallets:
    print(pallet.cliente_id)
    if pallet.cliente_id == lista_facturas[0].cliente_id:
        lista_cliente.append(pallet)

print(lista_cliente)
print(len(lista_cliente))



#print(n)

#m = timedelta(30)

#print(m)

#print(n > m)