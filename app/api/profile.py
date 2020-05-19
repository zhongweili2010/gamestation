from logging import getLogger
from . import api
from sqlalchemy.orm import sessionmaker
from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin
Session= sessionmaker
from model import Profile
logger=getLogger(__name__)
from .. import db
import datetime

#get all
@api.route('/hardware/user/queryAll')
@cross_origin()
def searchUserAll():
    my_list=db.session.query(Profile).all()
    return jsonify([i.to_json() for i in my_list]),200

@api.route('/hardware/user/query/<name>')
@cross_origin()
def searchUserByName(name):
    my_item=db.session.query(Profile).filter(Profile.username==name).first()
    print(my_item)
    return jsonify(my_item.to_json())

@api.route('/hardware/user/update/<username>',methods=['PATCH'])
@cross_origin()
def updateUser(username):
    object_update=request.get_json()
    my_item=db.session.query(Profile).filter(Profile.username==username).first()
    try:
        my_item.username= object_update.get('username') or my_item.username
        my_item.email= object_update.get('email') or my_item.email
        my_item.first_name= object_update.get('first_name') or my_item.first_name
        my_item.last_name= object_update.get('last_name') or my_item.last_name
        db.session.merge(my_item)
        db.session.commit()      
    except Exception as e:
        db.session.rollback()
        logger.error("cannot patch object"+str(e))
        return jsonify("object not patched,"+str(e))
    finally:
        db.session.close()
    return jsonify("object patch success")