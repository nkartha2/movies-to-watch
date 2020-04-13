from app import app
from flask_cors import CORS, cross_origin
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