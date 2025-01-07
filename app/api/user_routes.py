from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from decimal import Decimal

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/user/<int:user_id>', methods=['GET'])
@login_required 
def get_user(user_id): 
    """
    Find user by id
    """
    user = users.get(user_id) 
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
    data = request.get_json() 
   #! GET NEEDS TO BE VERIFIED IN ITS USE HERE!!!!
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


@user_routes.route('/add_money/<int:user_id>', methods=['POST'])
@login_required 
def add_money(user_id): 
    """
    add money to a user
    """
    user = User.query.filter_by(id=user_id).first()
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    data = request.get_json() 
    amount = Decimal(data['money'])
    user.account_balance += amount 
    db.session.commit()
    return jsonify({'message': 'Money added successfully', 'account_balance': user.account_balance})


@user_routes.route('/<int:user_id>/withdraw_money', methods=['POST'])
@login_required 
def withdraw_money(user_id): 
    """
    log in a user
    """
    user = User.query.filter_by(id=user_id).first()
    if not user: 
        return jsonify({'message': 'User not found'}), 404 
    data = request.get_json() 
    amount = data.get('amount', 0) 
    if amount > user.account_balance: 
        return jsonify({'message': 'Insufficient account_balance'}), 400 
    user.account_balance -= amount 
    return jsonify({'message': 'Money withdrawn successfully', 'balance': user.account_balance})


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