from flask import Flask
# from ..Config import config
from sqlalchemy.orm import sessionmaker
from config import Config
# from config import config
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_name)
    # app.config[config_name].init_app(app)
    db.init_app(app)
    # Session = sessionmaker()
    # Session.configure(bind=db)
    
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint,url_prefix='/rest')

    return app