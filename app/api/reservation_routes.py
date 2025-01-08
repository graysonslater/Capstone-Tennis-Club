from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Reservations, db
from flask_login import current_user
from datetime import datetime

reservation_routes = Blueprint("reservations", __name__)


@reservation_routes.route('/<int:url_user_id>', methods=["GET"])
def users_reservations(url_user_id):
    """
    Get all reservations for a user
    """
    reservations = Reservations.query.filter_by(user_id= url_user_id).all()
    if not reservations:
        return jsonify({'message': 'no reservations found'}), 404
    return jsonify([reservation.to_dict() for reservation in reservations])


@reservation_routes.route('/', methods=["POST"])
def post_reservation():
    """
    Post a new reservation for the current user
    """
    data=request.json
    
    # convert date input so it can be stored in db
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S.%f')
    
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
def edit_reservation(reservation_id):
    """
    Edit a reservation, change date and number of players 
    """
    
    data=request.json
    reservation = Reservations.query.filter_by(id=reservation_id).first()
    if not reservation:
        return jsonify({'message': 'no reservation found'}), 404
    
    # convert date input so it can be stored in db
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S.%f')
    
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
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"msg": "reservation deleted"}), 200