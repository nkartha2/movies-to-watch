from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import DATABASE_URI
from flask_migrate import Migrate
from app.models import *

def create_app():
  # Define WSGI app object
  app = Flask(__name__)
  app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
  db = SQLAlchemy(app)
  # create db file using SQLAlchemy
  db.create_all()
  migrate = Migrate(app, db)

  return app



