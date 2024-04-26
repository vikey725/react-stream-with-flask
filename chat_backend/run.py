# app.py
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

from src.models import db, User, TokenBlocklist
from src.config import ApplicationConfig
from src import app, db, jwt
import redis
import json

r = redis.StrictRedis(host='localhost', port=6379, db=0)

def redis_update_prompt(key, query):
    data = r.get(key)
    print(data)
    data = json.loads(data)
    data['prompt'].append(query)
    r.set(key, json.dumps(data))


# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(data)
    user_exists = User.query.filter_by(username=data['username'])
    if not user_exists:
        return jsonify({'error': f"User with username: {data['username']} alreay exists"})

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    response = jsonify({
        'id': new_user.id,
        'username': new_user.username
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.status_code = 201
    
    return response

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({"error": "Unauthorized."})
    if not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401
    login_user(user)
    r.set(user.id, json.dumps({'prompt': []}))
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    response = jsonify({
        'id': user.id,
        'username': data['username'],
        'access_token': access_token,
        'refresh_token': refresh_token
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.status_code = 201
    
    return response

@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

@app.route("/logout", methods=["POST"])
def modify_token():
    user_id =  str(request.json.get('id', ''))
    # session.modified = True
    # jti = get_jwt()["jti"]
    # now = datetime.now(timezone.utc)
    # db.session.add(TokenBlocklist(jti=jti, created_at=now))
    # db.session.commit()
    logout_user()
    r.delete(user_id)
    return jsonify(msg="JWT revoked")

def data_generator(user_id):
    response = ""
    for i in range(10):
        time.sleep(0.5)
        message = f"id: {i}, name: Item {i}"
        response += message
        yield message
    redis_update_prompt(user_id, {'role': 'user', 'content': response})

@app.route('/bot', methods=["POST"])
def get_data():
    query = str(request.json.get('message', ''))
    user_id =  str(request.json.get('id', ''))
    data = json.loads(r.get(user_id))
    redis_update_prompt(user_id, {'role': 'user', 'content': query})
    print(session.get('prompt'))
    session.modified = True
    response = Response(stream_with_context(data_generator(user_id)))
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.status_code = 201

    return response

if __name__ == '__main__':
    
    with app.app_context():
        db.create_all()
    app.run(debug=True)