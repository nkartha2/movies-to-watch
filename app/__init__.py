from flask import Flask
from app.config import DATABASE_URI
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import os
import psycopg2

# Define WSGI app object
app = Flask(__name__, static_folder='../build', static_url_path='/')
DATABASE_URL = os.environ['DATABASE_URL']

uri = DATABASE_URL or DATABASE_URI


conn = psycopg2.connect(DATABASE_URL, sslmode='require')

engine = create_engine(DATABASE_URI)
app.config["SQLALCHEMY_DATABASE_URI"] = uri
db = SQLAlchemy(app)
# create db file using SQLAlchemy
db.create_all()
