#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Ingresos """
from models.ingreso import Ingreso
from models.pallet import Pallet
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
        nuevo_pallet = Pallet(**pallet)
        nuevo_pallet.save()

    return make_response(jsonify(nuevo_ingreso.to_dict()), 201)
