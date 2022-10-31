#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Ingresos """
from models.cliente import Cliente
from models.pallet import Pallet
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/clientes', methods=['GET'], strict_slashes=False)
def get_clientes():
    """
    Devuelve todos los clientes
    """
    clientes = storage.all(Cliente).values()
    lista_clientes = []
    for cliente in clientes:
        lista_clientes.append(cliente.to_dict())
    
    return jsonify(lista_clientes)

@app_views.route('/clientes', methods=['POST'], strict_slashes=False)
def nuevos_clientes():
    """
    Nuevo Ingreso con lista de Pallets
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    
    nuevo_cliente = Cliente(**data)
    nuevo_cliente.save()

    return make_response(jsonify(nuevo_cliente.to_dict()), 201)
