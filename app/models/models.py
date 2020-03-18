from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
db = SQLAlchemy(app)

class Movie(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String)