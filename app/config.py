import os
basedir = os.path.abspath(os.path.dirname(__file__))

# Enables development environment
DEBUG = True
# DATABASE_URI = 'postgres+psycopg2://postgres:postgres@127.0.0.1:5433/movies_to_watch'


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True