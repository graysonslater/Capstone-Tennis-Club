from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Reservations, db
from datetime import datetime

reservation_routes = Blueprint("reservations", __name__)


@reservation_routes.route('/user_reservations', methods=["GET"])
@login_required
def users_reservations():
    """
    Get all reservations for a user
    """
    reservations = Reservations.query.filter_by(user_id= current_user.id).all()
    if not reservations:
        return jsonify({'message': 'no reservations found'}), 404
    return jsonify([reservation.to_dict() for reservation in reservations])


@reservation_routes.route('/', methods=["POST"])
@login_required
def post_reservation():
    """
    Post a new reservation for the current user
    """
    data=request.json
    
    # convert date input so it can be stored in db
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S')
    
    # check if user already has a reservation at the desired time
    double_resrvation = Reservations.query.filter_by(date= date_obj,user_id=current_user.id).all()
    if double_resrvation:
        return jsonify({'message': f'user has previously existing reservation at: {date_obj}'})
    
    # check if there is an open court and assign court number
    multiple_reservations = Reservations.query.filter_by(date=date_obj).all()
    if multiple_reservations and len(multiple_reservations) < 6:
        court_number = len(multiple_reservations) + 1
    elif multiple_reservations and len(multiple_reservations) >= 6:
        return jsonify({'message': f'all courts reserved for: {date_obj}'})
   
    # if first reservation, assign court number
    if not multiple_reservations:
        court_number = 1
    
    new_reservation = Reservations(
        user_id= current_user.id,
        date= date_obj,
        court_number= court_number,
        players= data['players']
    )
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify(new_reservation.to_dict()), 200


@reservation_routes.route('/<int:reservation_id>', methods=["PATCH"])
@login_required
def edit_reservation(reservation_id):
    """
    Edit a reservation, change date and number of players 
    """
    
    data=request.json
    print("BACKEND= ",data)
    # find the reservation to update
    reservation = Reservations.query.filter_by(id=reservation_id).first()
    if not reservation:
        return jsonify({'message': 'no reservation found'}), 404
    if reservation.user_id != current_user.id:
        return jsonify({"error": "unautherized"}), 401
    
    # convert date input so it can be stored in db
    if data['date'] != "None":
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S')
    else:
        date_obj = None
    # check if user already has a reservation at the desired time
    double_resrvation = Reservations.query.filter_by(date= date_obj,user_id=current_user.id).all()
    if double_resrvation:
        return jsonify({'message': f'user has previously existing reservation at: {date_obj}'})
    
    # check if there is an open court and assign court number
    multiple_reservations = Reservations.query.filter_by(date= date_obj).all()

    if multiple_reservations and len(multiple_reservations) < 6:
        court_number = len(multiple_reservations) + 1
    elif multiple_reservations and len(multiple_reservations) >= 6:
        return jsonify({'message': f'all courts reserved for: {date_obj}'})
   
    # if first reservation, assign court number
    if not multiple_reservations:
        court_number = 1
    
    if date_obj != None:
        reservation.date= date_obj
    reservation.players= data['players']
    reservation.court_number= court_number

    db.session.commit()
    return jsonify(reservation.to_dict()), 200


@reservation_routes.route('/<int:reservation_id>', methods=['DELETE'])
@login_required
def delete_reservation(reservation_id):
    """
    Delete a reservation
    """
    reservation = Reservations.query.filter_by(id=reservation_id).first()
    if not reservation:
        return jsonify({"error": "reservation not found"}), 404
    if reservation.user_id != current_user.id:
        return jsonify({"error": "unautherized"}), 401
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"msg": "reservation deleted"}), 200


@reservation_routes.route('/reservation_check', methods=["POST"])
@login_required
def reservation_check():
    """
    Verifies that:
        1) User has no previously existing reservation for that date/time
        2) There is an open court at desired date and time
    Returns an error message if criteria is met, returns false if reservation is OK
    """
    data=request.json
    
    # convert date input so it can be stored in db
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S')
    
    # check if user already has a reservation at the desired time
    double_resrvation = Reservations.query.filter_by(date= date_obj,user_id=current_user.id).all()
    if double_resrvation:
        return jsonify({'error': f'user has previously existing reservation at: {date_obj}'})
    
    # check if there is an open court and assign court number
    multiple_reservations = Reservations.query.filter_by(date=date_obj).all()
    if multiple_reservations and len(multiple_reservations) >= 6:
        return jsonify({'error': f'all courts reserved for: {date_obj}'})
   
    # reservation passes all checks
    return jsonify(False), 200