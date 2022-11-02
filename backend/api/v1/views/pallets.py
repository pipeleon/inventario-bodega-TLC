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
    Devuelve todos los Pallets
    """
    clientes = storage.all(Pallet).values()
    lista_pallets = []
    for cliente in clientes:
        dictionary = cliente.to_dict()
        ingreso = storage.get(cls=Ingreso, id=cliente.ingreso_id)
        dictionary['consecutivo'] = ingreso.consecutivo
        lista_pallets.append(dictionary)
    
    return jsonify(lista_pallets)

@app_views.route('/pallets-simplificado', methods=['GET'], strict_slashes=False)
def get_pallets_simplificado():
    """
    Devuelve todos los ingresos qeu aun estan en bodega
    """
    ingresos = storage.all(Ingreso).values()
    lista_ingresos = []
    for ingreso in ingresos:
        dictionary = ingreso.to_dict()
        lista_pallets_activas = []
        for pallet in ingreso.lista_pallets:
            if not pallet.salida_id:
                lista_pallets_activas.append(pallet)
        dictionary['total_pallets'] = len(lista_pallets_activas)
        peso_total = 0
        if len(lista_pallets_activas) > 0:
            dictionary['producto'] = lista_pallets_activas[0].producto
            for pallet2 in lista_pallets_activas:
                peso_total += pallet.peso
        else:
            dictionary['producto'] = 'N/A'
        dictionary['peso_total'] = peso_total
        lista_ingresos.append(dictionary)
    
    return jsonify(lista_ingresos)
