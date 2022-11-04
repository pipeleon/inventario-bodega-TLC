#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Facturas """
from models.factura import Factura
from models.pallet import Pallet
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/facturas', methods=['GET'], strict_slashes=False)
def get_facturas():
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

@app_views.route('/facturas', methods=['POST'], strict_slashes=False)
def nueva_facturas():
    """
    Nuevo Facturas buscando las pallets que cumplan requisitos de fecha y cliente
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    datos_factura = data['factura']

    print(data)

    datos_factura['inicio'] = datos_factura['inicio'][0:10]
    datos_factura['fin'] = datos_factura['fin'][0:10]

    print(datos_factura)

    nueva_factura = Factura(**datos_factura)
    nueva_factura.save()
    

    return make_response(jsonify(nueva_factura.to_dict()), 201)
