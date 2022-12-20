#!/usr/bin/python3
import json
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.cliente import Cliente
from models.salida import Salida
from models.factura import Factura


with open("clientes.json", "r", encoding="utf-8") as f:
    loaded = json.loads(f.read())
for k, v in loaded.items():
    nuevo = eval(v["__class__"])(**v)
    nuevo.save()

with open("ingresos.json", "r", encoding="utf-8") as f:
    loaded = json.loads(f.read())
for k, v in loaded.items():
    nuevo = eval(v["__class__"])(**v)
    nuevo.save()

with open("salidas.json", "r", encoding="utf-8") as f:
    loaded = json.loads(f.read())
for k, v in loaded.items():
    nuevo = eval(v["__class__"])(**v)
    nuevo.save()

with open("pallets.json", "r", encoding="utf-8") as f:
    loaded = json.loads(f.read())
for k, v in loaded.items():
    nuevo = eval(v["__class__"])(**v)
    nuevo.save()