#!/usr/bin/python3
from asyncore import poll3
from models import storage
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.cliente import Cliente
from models.salida import Salida
from models.factura import Factura

datos ={
    'consecutivo': 'C-0001',
    'placa': 'WER185',
    'pedido': '22-100'
}

datos3 = {
    'nombre': 'MINIPACK',
    'nit': 999999999,
    'tarifa_cargue': 1000,
    'tarifa_almacenamiento': 2000
}

new_ingreso = Ingreso(**datos)

new_cliente = Cliente(**datos3)

#for i, j in new_salida.items():
#    print(j.id)

print(new_ingreso)

new_ingreso.save()

new_cliente.save()

datos2 ={
    'producto': 'rollos',
    'peso': 10,
    'proovedor': 'HENKEL',
    'ingreso_id': new_ingreso.id,
    'cliente_id': new_cliente.id
}

p1 = Pallet(**datos2)
p2 = Pallet(**datos2)
p3 = Pallet(**datos2)

p1.save()
p2.save()
p3.save()