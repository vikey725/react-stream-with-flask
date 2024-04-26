from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import expression
from flask_login import UserMixin
from uuid import uuid4
from src import db, login_manager

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

def get_uuid():
    return uuid4().hex

class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_active = db.Column(db.Boolean, server_default=expression.true(), nullable=False)

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

# class SessionData(db.Model):
#     __tablename__ = 'sessions'
#     __table_args__ = {'extend_existing': True}

#     id = db.Column(db.Integer, primary_key=True)
#     session_id = db.Column(db.String(255), unique=True)
#     data = db.Column(db.PickleType)

