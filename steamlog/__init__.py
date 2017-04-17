import os
from flask import Flask
from flask_redis import FlaskRedis
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object("config")

redis_store = FlaskRedis(app)
db = SQLAlchemy(app)

from steamlog import views
