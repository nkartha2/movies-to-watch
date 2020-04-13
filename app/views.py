from flask import request, Blueprint, jsonify
from app.models import Recommendation, Movie
from app.run import db
from sqlalchemy import func


recommendation_views = Blueprint("recommendation_views", __name__, url_prefix="/api/v1/")


@recommendation_views.route("recommendations", methods=["GET"])
def get_recommendations():
  page = request.args.get('page', default=1)
  page_int = int(page)
  items = request.args.get('items', default=4)
  items_int = int(items)
  item_end = page_int * items_int
  item_start = item_end - items_int

  # count of times movie recommended grouped by movie id
  sorted_rec_by_movie = db.session.query(
    Recommendation.movie_id,
    Movie.title,
    db.func.count(Recommendation.id)
  ).outerjoin(Movie, Recommendation.movie_id == Movie.id)\
    .group_by(Recommendation.movie_id, Movie.title)\
    .order_by(db.func.count(Recommendation.movie_id)\
    .desc()).all()

  resp = {
    "results_length": len(sorted_rec_by_movie),
    "movies": list()
  }

  splice = sorted_rec_by_movie[item_start:item_end]

  # sort by highest to lowest
  for idx, rec in enumerate(splice):
    if idx < int(items):
      recs_per_movie = Recommendation.query.filter_by(movie_id = rec.movie_id).all()
      movie = {
        "movie_id": rec.movie_id,
        "title": rec.title,
        "artists": list(),
        "ranking": item_start + idx + 1
      }

      for recpm in recs_per_movie:
        artist = {
          "artist_name": recpm.artist.name,
          "source_link": recpm.source.source_link,
          "source_name": recpm.source.source_short_name
        }

        movie["artists"].append(artist)

      resp["movies"].append(movie)

  resp = jsonify(resp)
  return resp

