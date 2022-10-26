#!/usr/bin/python3
from asyncore import poll3
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura

datos ={
    'consecutivo': 'C-001',
    'placa': 'WER185',
    'pedido': '22-100'
}

new_ingreso = Ingreso(**datos)

#for i, j in new_salida.items():
#    print(j.id)

print(new_ingreso)

new_ingreso.save()

datos2 ={
    'producto': 'rollos',
    'peso': 10,
    'proovedor': 'HENKEL',
    'ingreso_id': new_ingreso.id
}

p1 = Pallet(**datos2)
p2 = Pallet(**datos2)
p3 = Pallet(**datos2)

p1.save()
p2.save()
p3.save()