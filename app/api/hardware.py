from logging import getLogger
from . import api
from sqlalchemy.orm import sessionmaker
from flask import Flask,request,jsonify
Session= sessionmaker
from model import Hardware
logger=getLogger(__name__)
from .. import db
import datetime

@api.route('/hardware/query/<startDate>/<endDate>')
def searchHardwareByDate(startDate,endDate):
    """" search date from startDate to endDate """
#     df = pd.read_csv("./HARDWARE.csv",parse_dates=['TIME_PERIOD'])
#     df.sort_values(by='TIME_PERIOD',inplace=True)
    db.Query
#     # startDate=datetime.datetime.strptime(date_string, format1).strftime(format2)

#     query=df[(df['TIME_PERIOD']>=startDate) & (df['TIME_PERIOD']<=endDate)]

#     return query.to_json(orient='records',date_format='iso'),200

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

    return jsonify("objects added to db"),204




# @api.route("/login/<username>/<password>" )
# def login(username,password):


#     if(username!='alex'):
#         return jsonify({"info":"ok","result":True}),200
#     else:
#         return jsonify({"info":"password incorrect","result":False}),500



# @api.route("/")
# def index():
#     return render_template("./angular-tour-of-heroes/index.html")
