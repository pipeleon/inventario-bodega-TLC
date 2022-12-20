#!/usr/bin/python3
import json
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.cliente import Cliente
from models.salida import Salida
from models.factura import Factura, pallet_factura
from sqlalchemy.sql import select


clientes = storage.all(cls=Cliente)

new = {}
for k, v in clientes.items():
    new[k] = v.to_dict()
with open("clientes.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(new))


ingresos = storage.all(cls=Ingreso)

new = {}
for k, v in ingresos.items():
    new[k] = v.to_dict()
with open("ingresos.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(new))


salidas = storage.all(cls=Salida)

new = {}
for k, v in salidas.items():
    new[k] = v.to_dict()
with open("salidas.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(new))

pallets = storage.all(cls=Pallet)

new = {}
for k, v in pallets.items():
    new[k] = v.to_dict()
with open("pallets.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(new))