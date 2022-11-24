#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Ingresos """
from models.observacion import Observacion
from models.pallet import Pallet
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/observaciones/<id>', methods=['GET'], strict_slashes=False)
def get_observaciones(id):
    """
    Devuelve todos los clientes
    """
    observaciones = storage.all(Observacion).values()
    lista_observaciones = []
    for observacion in observaciones:
        if observacion.pallet_id == id:
            lista_observaciones.append(observacion.to_dict())
    
    return jsonify(lista_observaciones)

@app_views.route('/observaciones', methods=['POST'], strict_slashes=False)
def nuevas_observaciones():
    """
    Nuevo Ingreso con lista de Pallets
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    
    nueva_observacion = Observacion(**data)
    nueva_observacion.save()

    return make_response(jsonify(nueva_observacion.to_dict()), 201)