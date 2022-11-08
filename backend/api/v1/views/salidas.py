#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Salidas """
from models.salida import Salida
from models.pallet import Pallet
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/salidas', methods=['GET'], strict_slashes=False)
def get_salidas():
    """
    Devuelve todos las salidas
    """
    salidas = storage.all(Salida).values()
    lista_salidas = []
    for salida in salidas:
        dictionary = salida.to_dict()
        dictionary['total_pallets'] = len(salida.lista_pallets)
        peso_total = 0
        if len(salida.lista_pallets) > 0:
            dictionary['producto'] = salida.lista_pallets[0].producto
            for pallet in salida.lista_pallets:
                peso_total += pallet.peso
        else:
            dictionary['producto'] = 'N/A'
        dictionary['peso_total'] = peso_total
        lista_salidas.append(dictionary)
    
    return jsonify(lista_salidas)

@app_views.route('/salidas', methods=['POST'], strict_slashes=False)
def nueva_salidas():
    """
    Nuevo Salida con lista de Pallets
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    datos_salida = data['salida']
    lista_pallets = data['pallets']

    datos_salida['created_at'] = datos_salida['created_at'][0:10]

    nueva_salida = Salida(**datos_salida)
    nueva_salida.save()

    for pallet in lista_pallets:
        get_pallet = storage.get(cls=Pallet, id=pallet)
        get_pallet.salida_id = nueva_salida.id
        get_pallet.save()

    return make_response(jsonify(nueva_salida.to_dict()), 201)
