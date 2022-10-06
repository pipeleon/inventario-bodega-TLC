#!/usr/bin/python3
"""FileStorage Class"""
import json
from os import path


class FileStorage():
    """FileStorage Class"""
    __file_path = "file.json"
    __objects = {}

    def all(self):
        """Returns the dictionary __objects"""
        return self.__objects

    def new(self, obj):
        """Sets in __objects the obj with key"""
        (self.__objects)["{}.{}".format(type(obj).__name__, obj.id)] = obj

    def save(self):
        """Save the variable __object into a Json string in a file"""
        new = {}
        for k, v in self.__objects.items():
            new[k] = v.to_dict()
        with open(self.__file_path, "w", encoding="utf-8") as f:
            f.write(json.dumps(new))

    def reload(self):
        """Load if exists the contect of a file into the __object variable"""
        from models.base_model import BaseModel
        from models.pallet import Pallet
        from models.ingreso import Ingreso
        from models.salida import Salida
        from models.factura import Factura


        if path.exists(self.__file_path):
            with open(self.__file_path, "r", encoding="utf-8") as f:
                loaded = json.loads(f.read())
            for k, v in loaded.items():
                self.__objects[k] = eval(v["__class__"])(**v)
