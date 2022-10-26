#!/usr/bin/python3
"""Task 8 0x11. Python - Network #1"""
import requests
from flask import jsonify


parametros = {
    'ingresos': {
        'consecutivo': 'C-002',
        'placa': 'LOP985',
        'pedido': '22-101'
    }
}

print(parametros.__class__)


r1 = requests.get("http://0.0.0.0:5000/api/v1/ingresos")

print(r1.json())

r2 = requests.post("http://0.0.0.0:5000/api/v1/ingresos", data=parametros)


try:
    print(r2)
    print(r2.json())
except:
    print("Not a valid JSON")