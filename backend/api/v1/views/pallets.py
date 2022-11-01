#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Pallets """
from models.ingreso import Ingreso
from models.pallet import Pallet
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/pallets', methods=['GET'], strict_slashes=False)
def get_pallets():
    """
    Devuelve todos los clientes
    """
    clientes = storage.all(Pallet).values()
    lista_pallets = []
    for cliente in clientes:
        lista_pallets.append(cliente.to_dict())
    
    return jsonify(lista_pallets)

@app_views.route('/iresos', methods=['POST'], strict_slashes=False)
def nuevos_inesos():
    """
    Nuevo Ingreso con lista de Pallets
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    datos_ingreso = data['ingreso']
    datos_pallets = data['pallets']
    id_cliente = data['cliente']

    nuevo_ingreso = Ingreso(**datos_ingreso)
    nuevo_ingreso.save()

    for pallet in datos_pallets:
        pallet['ingreso_id'] = nuevo_ingreso.id
        pallet['cliente_id'] = id_cliente
        nuevo_pallet = Pallet(**pallet)
        nuevo_pallet.save()

    return make_response(jsonify(nuevo_ingreso.to_dict()), 201)
