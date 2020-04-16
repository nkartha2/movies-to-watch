from app import app as application
from flask_cors import CORS, cross_origin
from app.models import *
from app.views import recommendation_views

# Define WSGI app object
CORS(application)

application.register_blueprint(recommendation_views)

@application.route('/')
def index():
    return application.send_static_file('index.html')

if __name__ == "__main__":
  application.run()