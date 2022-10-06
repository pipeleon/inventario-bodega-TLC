#!/usr/bin/python3
"""console.py contains the entry point of the command interprete"""
import cmd
from models import storage
from models.base_model import BaseModel
from models.pallet import Pallet
from models.ingreso import Ingreso
from models.salida import Salida
from models.factura import Factura


class HBNBCommand(cmd.Cmd):
    """class for cmd """
    prompt = "(hbnb) "
    list_class = [
        "BaseModel", "Pallet", "Ingreso", "Salida", "Factura"]
    list_atrr = ["id", "created_at", "updated_at"]
    list_prefix = ["quit", "EOF", "create", "show", "destroy", "all", "update"]

    def do_quit(self, arg):
        """Quit command to exit the program"""
        exit()

    def do_EOF(self, arg):
        """EOF command to exit the program"""
        exit()

    def emptyline(self):
        """keep line empty"""
        pass

    def do_create(self, arg):
        """Creates a new instance of BaseModel, saves it"""
        if arg == "":
            print("** class name missing **")
        elif arg not in self.list_class:
            print("** class doesn't exist **")
        else:
            _object = eval(arg + "()")
            _object.save()
            print(_object.id)

    def do_show(self, arg):
        """
        Prints the string representation of an instance
        """
        arg = arg.split()
        if len(arg) == 0:
            print("** class name missing **")
        elif arg[0] not in self.list_class:
            print("** class doesn't exist **")
        elif len(arg) == 1:
            print("** instance id missing **")
        else:
            k = "{}.{}".format(arg[0], arg[1])
            if k in storage.all().keys():
                print(storage.all()[k])
            else:
                print("** no instance found **")

    def do_destroy(self, arg):
        """Deletes an instance based on the class name and id"""
        arg = arg.split()
        if len(arg) == 0:
            print("** class name missing **")
        elif arg[0] not in self.list_class:
            print("** class doesn't exist **")
        elif len(arg) == 1:
            print("** instance id missing **")
        else:
            k = "{}.{}".format(arg[0], arg[1])
            if k in storage.all().keys():
                del storage.all()[k]
                storage.save()
            else:
                print("** no instance found **")

    def do_all(self, arg):
        """Show a list of total object of specify class"""
        everything = []
        arg = arg.split()
        if len(arg) == 0:
            for k, v in storage.all().items():
                everything.append(str(v))
            print(everything)
        else:
            if arg[0] not in self.list_class:
                print("** class doesn't exist **")
            else:
                for k, v in storage.all().items():
                    c = k.split(".")
                    if c[0] == arg[0]:
                        everything.append(str(v))
                print(everything)

    def do_update(self, arg):
        """Updates an instance by adding or updating attribute"""
        arg = arg.split()
        if len(arg) == 0:
            print("** class name missing **")
        elif arg[0] not in self.list_class:
            print("** class doesn't exist **")
        elif len(arg) == 1:
            print("** instance id missing **")
        else:
            k = "{}.{}".format(arg[0], arg[1])
            if k in storage.all().keys():
                if len(arg) == 2:
                    print("** attribute name missing **")
                elif len(arg) == 3:
                    print("** value missing **")
                else:
                    if arg[2] in self.list_atrr:
                        pass
                    else:
                        if arg[3][0] == "\"":
                            v = arg[3].lstrip('\"')
                            if arg[3][-1] == "\"":
                                v = arg[3].strip('\"')
                            else:
                                i = 1
                                while True:
                                    if arg[3 + i][-1] == "\"":
                                        v += " " + arg[3 + i].strip('\"')
                                        break
                                    v += " " + arg[3 + i]
                                    i += 1
                        else:
                            v = arg[3]
                        setattr(storage.all()[k], arg[2], v)
                        storage.save()
            else:
                print("** no instance found **")

    def do_count(self, arg):
        """Return numer of object of any class"""
        arg = arg.split()
        if len(arg) == 0:
            pass
        else:
            if arg[0] not in self.list_class:
                print("** class doesn't exist **")
            else:
                cont = 0
                for k, v in storage.all().items():
                    c = k.split(".")
                    if c[0] == arg[0]:
                        cont += 1
                print(cont)

    def precmd(self, line):
        """Modify the line command before run it if necesary"""
        a = line.split()
        if a[0] not in self.list_prefix and "." in a[0]:
            b = a[0].split(".")
            if "()" in b[1]:
                line = b[1].strip("()") + " " + b[0]
            else:
                c = b[1].split("(")
                line = c[0] + " " + b[0] + " " + c[1].strip('\"),')
                if len(a) >= 2:
                    line += " " + a[1].strip('\"),')
                if len(a) >= 3:
                    line += " " + a[2].strip('\"),')
        return super().precmd(line)


if __name__ == '__main__':
    """Main function for the loop"""
    HBNBCommand().cmdloop()
