#!/usr/bin/python3
from models import storage
from datetime import datetime
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura, pallet_factura


datos ={
    'inicio': datetime(2022, 10, 1),
    'fin': datetime(2022, 10, 12)
}

new_factura = Factura(**datos)


print(new_factura.id)

new_factura.save()

pallets = storage.all(cls=Pallet)

for i, j in pallets.items():
    line = pallet_factura.insert().values(pallet_id=j.id, factura_id=new_factura.id)
    storage.execute(line)
    storage.save()
