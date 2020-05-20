from logging import getLogger
from . import api
from sqlalchemy.orm import sessionmaker
from flask import Flask,request,jsonify
Session= sessionmaker
from model import Profile
logger=getLogger(__name__)
from .. import db
import datetime

# created by Wei Zhou
#search all of the users' informations from SQLite
@api.route('/hardware/user/queryAll')
def searchUserAll():
    my_list=db.session.query(Profile).all()
    return jsonify([i.to_json() for i in my_list]),200

#search one user by username
@api.route('/hardware/user/query/<name>')
def searchUserByName(name):
    my_item=db.session.query(Profile).filter(Profile.username==name).first()
    print(my_item)
    return jsonify(my_item.to_json())

#add a user
@api.route('/hardware/user/add',methods=["POST"])
def addUser():
    user=request.get_json()
    pro=Profile(user['username'],user['email'],user['firstname'],user['lastname'],user['password'])
    db.session.add(pro)
    try:
        db.session.commit()      
    except Exception as e:
        db.session.rollback()
        logger.error("cannot insert object"+str(e))
        return jsonify("object not validated,"+str(e))
    finally:
        db.session.close()

    return jsonify("objects added to db success")

#update a user's information
@api.route('/hardware/user/update/<username>',methods=['PATCH'])
def updateUser(username):
    object_update=request.get_json()
    my_item=db.session.query(Profile).filter(Profile.username==username).first()
    try:
        my_item.username= object_update.get('username') or my_item.username
        my_item.email= object_update.get('email') or my_item.email
        my_item.first_name= object_update.get('first_name') or my_item.first_name
        my_item.last_name= object_update.get('last_name') or my_item.last_name
        my_item.password= object_update.get('password') or my_item.password
        db.session.merge(my_item)
        db.session.commit()      
    except Exception as e:
        db.session.rollback()
        logger.error("cannot patch object"+str(e))
        return jsonify("object not patched,"+str(e))
    finally:
        db.session.close()
    return jsonify("object patch success")

@api.route('/hardware/user/login/<username>/<password>')
def testlogin(username,password):
    print(username,password)
    if (username=='user'):
        return jsonify({"result":True,"username":username}),200
    else:
        return jsonify({"result":False}),500