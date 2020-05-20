from sqlalchemy import Column, Integer, String, Float, DateTime,MetaData
from sqlalchemy.ext.declarative import declarative_base
from gamestation import db
Base=declarative_base()

class Hardware(db.Model):
    __tablename__='hardware'

    id= db.Column(Integer,primary_key=True)
    platform=db.Column(String,nullable=False)
    unit=db.Column(Integer,nullable=False)
    dollar=db.Column(Integer,nullable=False)
    average_price=db.Column(Float,nullable=False)
    time_period = db.Column(DateTime,nullable=False)

    def __init__(self,platform,unit,dollar,average_price,time_period):
        self.platform=platform
        self.unit=unit
        self.dollar=dollar
        self.average_price=average_price
        self.time_period=time_period



    def to_json(self):
        return {
            "id":self.id,
            "PLATFORM":self.platform,
            "UNITS":self.unit,
            "DOLLARS":self.dollar,
            "AVERAGE_PRICE":self.average_price,
            "TIME_PERIOD":self.time_period,
        }
#     def from_json(self,jsonObject):
#         hardware=Hardware()
#         self.platform  =  jsonObject['PLATFORM']
#         self.unit      =  jsonObject['UNITS']
#         self.dollar    =  jsonObject['DOLLARS']
#         self.average_price= jsonObject['AVERAGE_PRICE']
#         self.time_period  = jsonObject['TIME_PERIOD']


# # Base.metadata.create_all(db)


class Profile(db.Model):
    __tablename__='profile'

    username= db.Column(String,primary_key=True)
    email=db.Column(String,nullable=True)
    first_name=db.Column(String,nullable=True)
    last_name=db.Column(String,nullable=True)
    password=db.Column(String,nullable=True)

    def __init__(self,username,email,first_name,last_name,password):
        self.username=username
        self.email=email
        self.first_name=first_name
        self.last_name=last_name
        self.password=password


    def to_json(self):
        return {
            "username":self.username,
            "email":self.email,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "password":self.password
        }