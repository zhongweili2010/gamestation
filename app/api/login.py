from logging import getLogger
from . import api
from sqlalchemy.orm import sessionmaker
from flask import Flask,request,jsonify
Session= sessionmaker
from model import Hardware
logger=getLogger(__name__)
from .. import db
import datetime
import hashlib

# using a dictionary because keys have to be unique and passwords can be the value

@api.route("/login/<username>/<password>" )
def login(username, password):
#check if username and password are in the file
    """ hashingpass(password) """
    fhand = open('saved_passwords.txt',"r")
    for line in fhand:
        if username + ' ' + password in line:
            return jsonify({"result":True,"username":username}),200
    return jsonify({"result":False,"information":"Username doesn't exist"}),500

@api.route("/signup",methods=['POST'])
def signup():
    user_information=request.get_json()
    username= user_information.get('username')
    password= user_information.get('password')
    email= user_information.get('email')
    first_name= user_information.get('first_name') 
    last_name= user_information.get('last_name')
    
    fhand = open('saved_passwords.txt', "r")
    for line in fhand:
        if username in line:
            return jsonify({"Information:":"Already a User!","Login in":username}),200
        
    fhand.close()
    fhand = open("saved_passwords.txt", "a")
    fhand.write(username)
    fhand.write(' ')
    fhand.write(password)
    fhand.write(' ')
    fhand.write(email)
    fhand.write(' ')
    fhand.write(first_name)
    fhand.write(' ')
    fhand.write(last_name)
    fhand.write('\n')
    fhand.close()
    return jsonify({"Status":"New User","Welcome":username}),200
            
    

""" def hashingpass(password):
    password = hashlib.md5(password.encode())
    encrypt = hashlib.md5(password).hexdigest()
    return encrypt """
        

