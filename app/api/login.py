from logging import getLogger
from . import api
from sqlalchemy.orm import sessionmaker
from flask import Flask,request,jsonify
Session= sessionmaker
from model import Hardware
logger=getLogger(__name__)
from .. import db
import datetime

# using a dictionary because keys have to be unique and passwords can be the value

@api.route("/login/<username>/<password>" )
def login(username,password):

    users = {"francisco":"admin","weing":"whatever","lee":"something"}
    if username in users and users[username] == password:
        print ("Login successful!")
        return jsonify({"info":"ok","result":True}),200
    else:
        return jsonify({"info":"password incorrect","result":False}),500