from flask import request, Blueprint, jsonify
from app.models import Recommendation, Movie
from app import db
from sqlalchemy import func


recommendation_views = Blueprint("recommendation_views", __name__, url_prefix="/api/v1/")

@recommendation_views.route("recommendations", methods=["GET"])
def get_recommendations():
  page = request.args.get('page')
  items = request.args.get('items')
  print("PAGE ", page)
  print("ITEM ", items)
  # count of times movie recommended grouped by movie id
  recommendations = db.session.query(Recommendation.movie_id, db.func.count(Recommendation.id)).group_by(Recommendation.movie_id).order_by(db.func.count(Recommendation.movie_id).desc()).all()
  # sort by highest to lowest
  print("RECS ", recommendations)
  for rec in recommendations:
    print(rec)
    recs_per_movie = Recommendation.query.filter_by(movie_id = rec.movie_id).all()
    for recpm in recs_per_movie:
      print('rec per movie ', recpm.artist.name)
      print('rec per movie ', recpm.source.source_link)
    # print('MOVIE ', movie.title)
    # print(rec.movie.title)
    # print(rec.artist.name
  resp = jsonify(success=True)
  return resp

# first fix order by
# list of recommendation ids in the same order
# query recommendations with the same order of ids


# sort recommendations by movie ids
# so that all movie ids will be next together
