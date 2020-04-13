from flask import Flask
from flask_sqlalchemy import Model, SQLAlchemy
from sqlalchemy import Table, Integer, String, Column, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy.ext.declarative import declarative_base
from app import db

# declarative base that registers model with SQA
# new base class given metaclass that produces
# appropriate Table objects and makes appropriate
# mapper calls
Base = declarative_base()

class Movie(db.Model):
  id = Column(Integer, primary_key=True)
  title = Column(String)
  director = Column(String)
  watched = Column(Boolean)
  created_at = Column(DateTime, default=datetime.datetime.utcnow())

class Artist(db.Model):
  id = Column(Integer, primary_key=True)
  name = Column(String)

class Source(db.Model):
  id = Column(Integer, primary_key=True)
  source_link = Column(String)
  source_short_name = Column(String)

class Recommendation(db.Model):
  id = Column(Integer, primary_key=True)
  artist_id = Column(Integer, ForeignKey('artist.id'), primary_key=True)
  artist = relationship("Artist", uselist=False)
  movie_id = Column(Integer, ForeignKey('movie.id'), primary_key=True)
  movie = relationship("Movie", uselist=False)
  source_id = Column(Integer, ForeignKey('source.id'), primary_key=True)
  source = relationship("Source", uselist=False)
