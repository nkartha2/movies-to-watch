from app import app, db
from app.views import recommendation_views
from flask import Flask
from flask_cors import CORS, cross_origin
from app.models import *


# Define WSGI app object
CORS(app)

app.register_blueprint(recommendation_views)

@app.route('/')
def index():
    return app.send_static_file('index.html')

# https://www.digitalocean.com/community/tutorials/how-to-structure-large-flask-applications
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8081, debug=True)