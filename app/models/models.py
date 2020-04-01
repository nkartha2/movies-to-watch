from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Model, Table, Integer, String, Column, Boolean, DateTime, ForeignKey
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
db = SQLAlchemy(app)

class Movie(Model):
  id = Column(Integer, primary_key=True)
  title = Column(String)
  director = Column(String)
  watched = Column(Boolean)
  created_at = Column(DateTime, default=datetime.datetime.utcnow())

class Artist(Model):
  id = Column(Integer, primary_key=True)
  name = Column(String)

class Source(Model):
  id = Column(Integer, primary_key=True)
  source_link = Column(String)
  source = Column(String)

class Recommendation(Table):
  id = Column(Integer, primary_key=True)
  artist_id = Column(Integer, ForeignKey('artist.id'), primary_key=True)
  movie_id = Column(Integer, ForeignKey('movie.id'), primary_key=True)
  source_id = Column(Integer, ForeignKey('source.id'), primary_key=True)
