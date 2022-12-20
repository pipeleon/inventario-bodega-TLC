#!/usr/bin/python3
from asyncore import poll3
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.cliente import Cliente
from models.salida import Salida
from models.factura import Factura


datos2 ={
    'producto': 'PELICULA DE POLIPROPILENO',
    'peso': 10,
    'referencia': '25-PCT-1',
    'proovedor': 'COSMO FILMSN LIMITED',
    'ingreso_id': '9b10cc78-bbc1-421d-b7b9-f6f788db9740',
    'cliente_id': 'cc288cec-3df1-4487-9316-5e5bbf6ffb36',
    'valor': 0
}

p1 = Pallet(**datos2)
p1.save()
