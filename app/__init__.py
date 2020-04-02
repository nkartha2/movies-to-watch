from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import DATABASE_URI
from flask_migrate import Migrate
from app.models import models


# Define WSGI app object
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# create db file using SQLAlchemy
db.create_all()


