from flask import request, Blueprint, jsonify
from app.models import Recommendation
from app import db

recommendation_views = Blueprint("recommendation_views", __name__, url_prefix="/api/v1/")

@recommendation_views.route("recommendations", methods=["GET"])
def get_recommendations():
  recommendations = Recommendation.query.all()
  resp = jsonify(success=True)

  return resp

