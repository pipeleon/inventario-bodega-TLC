#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Ingresos """
from models.cliente import Cliente
from models.ingreso import Ingreso
from models.pallet import Pallet
from models.salida import Salida
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/ingresos', methods=['GET'], strict_slashes=False)
def get_ingresos():
    """
    Devuelve todos los ingresos
    """
    ingresos = storage.all(Ingreso).values()
    lista_ingresos = []
    for ingreso in ingresos:
        dictionary = ingreso.to_dict()
        dictionary['total_pallets'] = len(ingreso.lista_pallets)
        peso_total = 0
        if len(ingreso.lista_pallets) > 0:
            dictionary['producto'] = ingreso.lista_pallets[0].producto
            cliente_id = ingreso.lista_pallets[0].cliente_id
            cliente = storage.get(cls=Cliente, id=cliente_id)
            dictionary['cliente'] = cliente.nombre
            for pallet in ingreso.lista_pallets:
                peso_total += pallet.peso
        else:
            dictionary['producto'] = 'N/A'
        dictionary['peso_total'] = peso_total
        lista_ingresos.append(dictionary)
    
    return jsonify(lista_ingresos)

@app_views.route('/ingresos', methods=['POST'], strict_slashes=False)
def nuevo_ingresos():
    """
    Nuevo Ingreso con lista de Pallets
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    datos_ingreso = data['ingreso']
    datos_pallets = data['pallets']
    id_cliente = data['cliente']

    datos_ingreso['created_at'] = datos_ingreso['created_at'][0:10]

    nuevo_ingreso = Ingreso(**datos_ingreso)
    nuevo_ingreso.save()

    for pallet in datos_pallets:
        pallet['ingreso_id'] = nuevo_ingreso.id
        pallet['cliente_id'] = id_cliente
        pallet['created_at'] = datos_ingreso['created_at']
        nuevo_pallet = Pallet(**pallet)
        nuevo_pallet.save()

    return make_response(jsonify(nuevo_ingreso.to_dict()), 201)

@app_views.route('/ingreso/<id>', methods=['GET'], strict_slashes=False)
def get_ingreso(id):
    """
    Get Ingreso by Id
    """

    ingreso = storage.get(cls=Ingreso, id=id)

    ingreso_info = ingreso.to_dict()
    ingreso_info['total_pallets'] = len(ingreso.lista_pallets)
    peso_total = 0
    if len(ingreso.lista_pallets) > 0:
        ingreso_info['producto'] = ingreso.lista_pallets[0].producto
        cliente_id = ingreso.lista_pallets[0].cliente_id
        cliente = storage.get(cls=Cliente, id=cliente_id)
        ingreso_info['cliente'] = cliente.nombre
        for pallet in ingreso.lista_pallets:
            peso_total += pallet.peso
    else:
        ingreso_info['producto'] = 'N/A'
    ingreso_info['peso_total'] = peso_total

    dictionary ={}
    dictionary["ingreso"] = ingreso_info
    dictionary["pallet_inv"] = []
    dictionary["pallet_salida"] = []

    
    lista = []
    lista2 = []
    for pallet in ingreso.lista_pallets:
        if pallet.salida_id:
            nuevo = pallet.to_dict()
            salida = storage.get(cls=Salida, id=pallet.salida_id)
            nuevo["consecutivo"] = salida.consecutivo
            nuevo["fecha_salida"] = salida.created_at
            lista2.append(nuevo)
        else:
            lista.append(pallet.to_dict())
    dictionary["pallet_inv"] = lista
    dictionary["pallet_salida"] = lista2
    

    return jsonify(dictionary)
