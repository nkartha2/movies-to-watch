from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Define WSGI app object
app = Flask("movies_list")
db = SQLAlchemy(app)

# create db file using SQLAlchemy
db.create_all()


