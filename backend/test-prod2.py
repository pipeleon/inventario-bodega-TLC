#!/usr/bin/python3
from asyncore import poll3
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.cliente import Cliente
from models.salida import Salida
from models.factura import Factura

ingreso = storage.get(cls=Ingreso, id='407f3a91-1d1b-4474-99bc-5dae755d2b37')

ingreso.delete()
ingreso.save()