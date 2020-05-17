from logging import getLogger
from . import api
from sqlalchemy.orm import sessionmaker
from flask import Flask,request,jsonify
Session= sessionmaker
from model import Hardware
logger=getLogger(__name__)
from .. import db
import datetime


#get list in date range
@api.route('/hardware/query/<startDate>/<endDate>')
def searchHardwareByDate(startDate,endDate):
    """" search date from startDate to endDate """
    my_list=db.session.query(Hardware).filter(Hardware.time_period>=startDate,Hardware.time_period<=endDate).all()
    return jsonify([i.to_json() for i in my_list]),200

#get all
@api.route('/hardware/query/all')
def searchHardwareAll():
    my_list=db.session.query(Hardware).all()
    return jsonify([i.to_json() for i in my_list]),200

#delete by id
@api.route('/hardware/delete/<id>',methods=['DELETE'])
def deleteHardware(id):
    my_item=db.session.query(Hardware).filter(Hardware.id==id).first()
    try:
        db.session.delete(my_item)
        db.session.commit()      
    except Exception as e:
        db.session.rollback()
        logger.error("cannot delete object"+str(e))
        return jsonify("object not deleted,"+str(e))
    finally:
        db.session.close()

    return jsonify("objects deleted from db success")

@api.route('/hardware/patch/<id>',methods=['PATCH'])
def editHardware(id):
    my_item=db.session.query(Hardware).filter(Hardware.id==id).first()
    object_update=request.get_json()

    try:
        my_item.platform= object_update.get('PLATFORM') or my_item.platform
        my_item.unit= object_update.get('UNITS') or my_item.unit
        my_item.dollar= object_update.get('DOLLARS') or my_item.dollar
        my_time= object_update.get('TIME_PERIOD')
        if(my_time):
            my_item.time_period= datetime.datetime.strptime(object_update.get('TIME_PERIOD'), '%Y-%m-%dT%H:%M:%S.%fZ')
        db.session.merge(my_item)
        db.session.commit()      
    except Exception as e:
        db.session.rollback()
        logger.error("cannot patch object"+str(e))
        return jsonify("object not patched,"+str(e))
    finally:
        db.session.close()
    return jsonify("object patch success")



#add by list
@api.route('/hardware/add',methods=["POST"])
def addHardware():
    hw_list=request.get_json()

    for i in hw_list:
        # print(i)
        date_time_obj = datetime.datetime.strptime(i['TIME_PERIOD'], '%Y-%m-%dT%H:%M:%S.%fZ')
        '2010-10-01T00:00:00.000Z'
        new_hardware=Hardware(
            i['PLATFORM'],
            i['UNITS'],
            i['DOLLARS'],
            i['AVERAGE_PRICE'],
            date_time_obj
            )

        print(new_hardware.to_json())
        db.session.add(new_hardware)
    try:
        db.session.commit()      
    except Exception as e:
        db.session.rollback()
        logger.error("cannot insert object"+str(e))
        return jsonify("object not validated,"+str(e))
    finally:
        db.session.close()

    return jsonify("objects added to db success")




# @api.route("/login/<username>/<password>" )
# def login(username,password):


#     if(username!='alex'):
#         return jsonify({"info":"ok","result":True}),200
#     else:
#         return jsonify({"info":"password incorrect","result":False}),500



# @api.route("/")
# def index():
#     return render_template("./angular-tour-of-heroes/index.html")
