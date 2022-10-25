#!/usr/bin/python3
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura


datos ={
    'placa': 'BZB328'
}

new_salida = Salida(**datos)


print(new_salida.id)

new_salida.save()

pallets = storage.all(cls=Pallet)

for i, j in pallets.items():
    if j.producto == 'rollos':
        j.salida_id = new_salida.id
        j.save()        
