from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_openid import OpenID
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object("config")

db = SQLAlchemy(app)
migrate = Migrate(app, db)

oid = OpenID(app)

login_manager = LoginManager()
login_manager.init_app(app)

from steamlog import views, api, auth
