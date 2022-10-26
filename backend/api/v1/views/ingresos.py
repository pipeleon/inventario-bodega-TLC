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
        lista_ingresos.append(ingreso.to_dict())
    
    return jsonify(lista_ingresos)

@app_views.route('/ingresos', methods=['POST'], strict_slashes=False)
def nuevos_ingresos():
    """
    Nuevo Ingreso con lista de Pallets
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    datos_ingreso = data['ingreso']
    datos_pallets = data['pallets']

    nuevo_ingreso = Ingreso(**datos_ingreso)
    nuevo_ingreso.save()

    for pallet in datos_pallets:
        pallet['ingreso_id'] = nuevo_ingreso.id
        nuevo_pallet = Pallet(**pallet)
        nuevo_pallet.save()

    return make_response(jsonify(nuevo_ingreso.to_dict()), 201)
