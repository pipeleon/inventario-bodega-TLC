#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Facturas """
from models.ingreso import Ingreso
from models.factura import Factura, pallet_factura
from models.pallet import Pallet
from models.salida import Salida
from models.cliente import Cliente
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from datetime import datetime, timedelta


@app_views.route('/facturas', methods=['GET'], strict_slashes=False)
def get_facturas():
    """
    Devuelve todos las salidas
    """
    facturas = storage.all(Factura).values()
    lista_facturas = []
    for factura in facturas:
        dictionary = factura.to_dict()
        dictionary['total_pallets'] = len(factura.lista_pallets)
        cliente = storage.get(cls=Cliente, id=factura.cliente_id)
        dictionary['cliente'] = cliente.nombre
        lista_facturas.append(dictionary)
    
    return jsonify(lista_facturas)

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

    nueva_factura = Factura(**datos_factura)
    print(nueva_factura.inicio)
    print(nueva_factura.fin)
    nueva_factura.inicio = datetime.strptime(nueva_factura.inicio, "%Y-%m-%d")
    nueva_factura.fin = datetime.strptime(nueva_factura.fin, "%Y-%m-%d")
    print(nueva_factura.inicio)
    print(nueva_factura.fin)
    nueva_factura.save()

    pallets = storage.all(cls=Pallet)

    lista_pallets = []

    for p in pallets.values():
        lista_pallets.append(p)

    lista_cliente = []

    cliente = storage.get(cls=Cliente, id=nueva_factura.cliente_id)

    for pallet in lista_pallets:
        if pallet.cliente_id == cliente.id:
            lista_cliente.append(pallet)
    
    

    peso_cargue = 0
    valor_pallets = 0

    for pallet in lista_cliente:
        if pallet.created_at <= nueva_factura.fin and pallet.created_at >= nueva_factura.inicio:
            peso_cargue += pallet.peso
            valor_pallets += pallet.valor
    
    nueva_factura.valor_cargues = peso_cargue * cliente.tarifa_cargue
    nueva_factura.valor_seguro = valor_pallets * cliente.tasa_seguro
    nueva_factura.save()

    peso_descargue = 0

    for pallet in lista_cliente:
        if pallet.salida_id:
            salida = storage.get(cls=Salida, id=pallet.salida_id)
            if salida.created_at <= nueva_factura.fin and salida.created_at >= nueva_factura.inicio:
                peso_descargue += pallet.peso
    
    nueva_factura.valor_descargues = peso_descargue * cliente.tarifa_cargue
    nueva_factura.save()

    delta = nueva_factura.fin - nueva_factura.inicio

    peso_almacenamiento = 0

    
    print(len(lista_cliente))

    if delta < timedelta(30):
        for pallet in lista_cliente:
            print(pallet.created_at)
            if pallet.created_at > nueva_factura.fin:
                pass
            elif pallet.created_at <= nueva_factura.fin and pallet.created_at >= nueva_factura.inicio:
                peso_almacenamiento += pallet.peso
                line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                storage.execute(line)
                storage.save()
            elif pallet.created_at < nueva_factura.inicio:
                if pallet.salida_id:
                    print(pallet.salida_id)
                    salida = storage.get(cls=Salida, id=pallet.salida_id)
                    print("salida", nueva_factura.inicio, "-", salida.created_at)
                    if nueva_factura.inicio > salida.created_at:
                        pass
                    else:
                        nueva_fecha = pallet.created_at + timedelta(30)
                        print(pallet.created_at, "-", nueva_fecha)
                        while (nueva_fecha <= nueva_factura.fin):
                            if nueva_fecha <= nueva_factura.fin and nueva_fecha >= nueva_factura.inicio and nueva_fecha <= salida.created_at:
                                peso_almacenamiento += pallet.peso
                                line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                                storage.execute(line)
                                storage.save()
                            nueva_fecha += timedelta(30)
                else:
                    nueva_fecha = pallet.created_at + timedelta(30)
                    print(pallet.created_at, "-", nueva_fecha)
                    while (nueva_fecha <= nueva_factura.fin):
                        if nueva_fecha <= nueva_factura.fin and nueva_fecha >= nueva_factura.inicio:
                            peso_almacenamiento += pallet.peso
                            line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                            storage.execute(line)
                            storage.save()
                        nueva_fecha += timedelta(30)
    else:
        for pallet in lista_cliente:
            if pallet.created_at > nueva_factura.fin:
                pass
            elif pallet.created_at <= nueva_factura.fin and pallet.created_at >= nueva_factura.inicio:
                counter = 1
                if pallet.salida_id:
                    salida = storage.get(cls=Salida, id=pallet.salida_id)
                    if nueva_factura.inicio > salida.created_at:
                        pass
                    else:
                        nueva_fecha = pallet.created_at + timedelta(30)
                        while (nueva_fecha <= nueva_factura.fin):
                            if nueva_fecha <= nueva_factura.fin and nueva_fecha >= nueva_factura.inicio and nueva_fecha <= salida.created_at:
                                counter += 1
                            nueva_fecha += timedelta(30)
                        peso_almacenamiento += pallet.peso * counter
                        line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                        storage.execute(line)
                        storage.save()
                else:
                    nueva_fecha = pallet.created_at + timedelta(30)
                    while (nueva_fecha <= nueva_factura.fin):
                        if nueva_fecha <= nueva_factura.fin and nueva_fecha >= nueva_factura.inicio:
                            counter += 1
                        nueva_fecha += timedelta(30)
                    peso_almacenamiento += pallet.peso * counter
                    line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                    storage.execute(line)
                    storage.save()
            elif pallet.created_at < nueva_factura.inicio:
                counter = 0
                if pallet.salida_id:
                    salida = storage.get(cls=Salida, id=pallet.salida_id)
                    if nueva_factura.inicio > salida.created_at:
                        pass
                    else:
                        nueva_fecha = pallet.created_at + timedelta(30)
                        while (nueva_fecha <= nueva_factura.fin):
                            if nueva_fecha <= nueva_factura.fin and nueva_fecha >= nueva_factura.inicio and nueva_fecha <= salida.created_at:
                                counter += 1
                            nueva_fecha += timedelta(30)
                        peso_almacenamiento += pallet.peso * counter
                        if counter > 0:
                            line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                            storage.execute(line)
                            storage.save()
                else:
                    nueva_fecha = pallet.created_at + timedelta(30)
                    while (nueva_fecha <= nueva_factura.fin):
                        if nueva_fecha <= nueva_factura.fin and nueva_fecha >= nueva_factura.inicio:
                            counter += 1
                        nueva_fecha += timedelta(30)
                    peso_almacenamiento += pallet.peso * counter
                    if counter > 0:
                            line = pallet_factura.insert().values(pallet_id=pallet.id, factura_id=nueva_factura.id)
                            storage.execute(line)
                            storage.save()
    
    nueva_factura.valor_almacenamiento = peso_almacenamiento * cliente.tarifa_almacenamiento
    nueva_factura.save()    

    return make_response(jsonify(nueva_factura.to_dict()), 201)

@app_views.route('/factura/<id>', methods=['GET'], strict_slashes=False)
def get_factura(id):
    """
    Get Factura by Id
    """

    factura = storage.get(cls=Factura, id=id)

    factura_info = factura.to_dict()
    factura_info['total_pallets'] = len(factura.lista_pallets)
    if len(factura.lista_pallets) > 0:
        cliente_id = factura.lista_pallets[0].cliente_id
        cliente = storage.get(cls=Cliente, id=cliente_id)
        factura_info['cliente'] = cliente.nombre

    dictionary ={}
    dictionary["factura"] = factura_info

    
    lista = []
    for pallet in factura.lista_pallets:
        temporal = pallet.to_dict()
        ingreso = storage.get(cls=Ingreso, id=pallet.ingreso_id)
        temporal["fecha_ingreso"] = ingreso.created_at
        if pallet.salida_id:
            salida = storage.get(cls=Salida, id=pallet.salida_id)
            temporal["fecha_salida"] = salida.created_at        
        lista.append(temporal)
    dictionary["pallets"] = lista
    

    return jsonify(dictionary)
