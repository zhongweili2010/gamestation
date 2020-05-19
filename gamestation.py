from flask import Flask, request,jsonify,send_file,render_template
import os
import pandas as pd
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from app import create_app,db






app = create_app(Config)
migrate = Migrate(app,db)
#in virtualenv
#export FLASK_APP=gamestation
#flask db init
#flask db migrate
#flask db upgrade


if __name__=="__main__":
    app.run(debug=True, port=9090)







# //TODO: add row index 
# //create record
# //delete record
# //edit record