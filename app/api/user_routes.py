from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/<int:user_id>', methods=['GET'])
@login_required 
def get_user(user_id): 
    """
    Find user by id
    """
    user = User.query.filter_by(id=user_id).first()
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    return jsonify(user.to_dict())


@user_routes.route('/<int:user_id>', methods=['PATCH'])
@login_required 
def update_user(user_id): 
    """
    Update a user
    """
    user = User.query.filter_by(id=user_id).first()
    if not user: 
        return jsonify({'message': 'User not found'}), 404
    if user.id != current_user.id:
        return jsonify({"error": "unautherized"}), 401 
    data = request.get_json() 
    user.username = data['username']  
    user.email = data['email']
    user.lastname= data['lastname']
    user.firstname= data['firstname']
    db.session.commit()
    return jsonify({ 
        'message': 'User updated successfully', 
        'user': user.to_dict() 
        })


@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required 
def delete_user(user_id): 
    """
    Delete a user
    """
    user = User.query.filter_by(id=user_id).first()
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})


@user_routes.route('/userNameCheck/<string:user_name>', methods=['GET'])
@login_required 
def username_check(user_name): 
    """
    find a user by username, returns false if no user is found
    """
    
    user = User.query.filter_by(username=user_name).first()
    if not user: 
        return jsonify({"exists": False}),200
    return jsonify({"exists":user.to_dict()}),200


@user_routes.route('/emailCheck/<string:input_email>', methods=['GET'])
@login_required 
def email_check(input_email): 
    """
    Find a user by email, return sfalse if no user is found
    """
    user = User.query.filter_by(email=input_email).first()
    if not user: 
        return jsonify({"exists": False}),200
    return jsonify({"exists":user.to_dict()}),200