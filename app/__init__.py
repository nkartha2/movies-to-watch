from flask import Flask
# from app.config import DATABASE_URI
from sqlalchemy import create_engine
import os
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


DATABASE_URL = os.environ['DATABASE_URL']
# uri = DATABASE_URL or DATABASE_URI
engine = create_engine(DATABASE_URL)

# Define WSGI app object
app = Flask(__name__, static_url_path='', static_folder='static/build/')

# app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# create db file using SQLAlchemy
db.create_all()

migrate = Migrate(app, db)