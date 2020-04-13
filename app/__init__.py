from flask import Flask
from app.config import DATABASE_URI
from sqlalchemy import create_engine
import os
import psycopg2
from flask_sqlalchemy import SQLAlchemy


DATABASE_URL = os.environ['DATABASE_URL']
uri = DATABASE_URL or DATABASE_URI
engine = create_engine(DATABASE_URI)

# Define WSGI app object
app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config["SQLALCHEMY_DATABASE_URI"] = uri
db = SQLAlchemy(app)
# create db file using SQLAlchemy
db.create_all()