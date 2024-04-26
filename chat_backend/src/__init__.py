from flask import Flask, jsonify, stream_with_context, abort, Response, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, create_refresh_token, get_jwt
from flask_login import LoginManager, login_user, logout_user
import time
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask_sqlalchemy import SQLAlchemy
from src.config import ApplicationConfig

app = Flask(__name__)
app.config.from_object(ApplicationConfig)




# # Other Flask app configurations
# app.config['SESSION_TYPE'] = 'sqlalchemy'

# # Generate a secret key for Flask sessions
# app.config['SECRET_KEY'] = 'your_secret_key'
# Session(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
# app.config['SESSION_SQLALCHEMY'] = db
login_manager = LoginManager(app)
CORS(app, origins='http://localhost:3000', methods=['GET', 'POST'])
