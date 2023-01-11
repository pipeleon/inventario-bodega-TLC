#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Usuarios """
from models.usuario import Usuario
from models.pallet import Pallet
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request, session
import bcrypt

@app_views.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    print(user_id)

    if not user_id:
        return jsonify({"error": "Desautorizado"}), 401

    user = storage.get(cls=Usuario, id=user_id)

    return make_response(jsonify({"id": user.id,
    "nombre": user.nombre,
    "email": user.email,
    "tipo": user.tipo}), 200)

@app_views.route('/usuario', methods=['POST'], strict_slashes=False)
def nuevo_usuario():
    """
    Nuevo Usuario 
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()

    """ check_usuario = Usuario.query.filter_by(nombre=data["nombre"]).first() is None

    if check_usuario:
        abort(409) """
    

    
    bytes = data['password'].encode('utf-8')
    salt = bcrypt.gensalt()
    data['password'] = bcrypt.hashpw(bytes, salt)
    
    nuevo_usuario = Usuario(**data)
    nuevo_usuario.save()

    return make_response(jsonify(nuevo_usuario.to_dict()), 201)

@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login_usuario():
    """
    Nuevo Usuario 
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    email = request.json["email"]
    password = request.json["password"]

    
    usuarios = storage.all(cls=Usuario)

    lista_emails = []

    for usuario in usuarios.values():
        lista_emails.append(usuario.email)

    if not email in lista_emails:
        return jsonify({"error": "Desautorizado"}), 401
    
    password_check = ""
    for usuario in usuarios.values():
        if email == usuario.email:
            password_check = usuario.password
            id = usuario.id
    
    
    bytes = password.encode('utf-8')

    if not bcrypt.checkpw(bytes, password_check.encode('utf-8')):
        return jsonify({"error": "Desautorizado"}), 401
    
    session["user_id"] = id
    

    return make_response(jsonify({"email": email}), 201)

@app_views.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
