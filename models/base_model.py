#!/usr/bin/python3
"""Base Model Class"""
import datetime
import uuid
from models import storage


class BaseModel():
    """BaseModel Class"""
    def __init__(self, *args, **kwargs):
        """Funtion to create a new instance"""
        if kwargs:
            del kwargs["__class__"]
            self.__dict__.update(kwargs)
            self.created_at = datetime.datetime.strptime(
                kwargs["created_at"], "%Y-%m-%dT%H:%M:%S.%f")
            self.updated_at = datetime.datetime.strptime(
                kwargs["updated_at"], "%Y-%m-%dT%H:%M:%S.%f")
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.datetime.now()
            self.updated_at = datetime.datetime.now()
            storage.new(self)

    def __str__(self):
        """Method for the string representation"""
        return "[{}] ({}) {}".format(
            type(self).__name__, self.id, self.__dict__)

    def save(self):
        """Public instance methods that update the instance"""
        self.updated_at = datetime.datetime.now()
        storage.save()

    def to_dict(self):
        """returns a dictionary containing all keys/values of a instance"""
        new = self.__dict__.copy()
        new["__class__"] = type(self).__name__
        new["created_at"] = (self.created_at).isoformat()
        new["updated_at"] = (self.updated_at).isoformat()
        return new
