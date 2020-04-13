# from app import app, db
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import Flask
from app.config import DATABASE_URI
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']
uri = DATABASE_URL or DATABASE_URI
engine = create_engine(DATABASE_URI)

# Define WSGI app object
app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config["SQLALCHEMY_DATABASE_URI"] = uri
db = SQLAlchemy(app)
# create db file using SQLAlchemy
db.create_all()

from app.models import *
from app.views import recommendation_views



# Define WSGI app object
CORS(app)

app.register_blueprint(recommendation_views)

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
  app.run()