from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Events, User_Events, db

event_routes = Blueprint("events", __name__)


@event_routes.route('/', methods=['GET'])
@login_required 
def get_all_events(): 
    """
    Get all events 
    """
    events = Events.query.all()
    if not events: 
        return jsonify({'message': 'no events found'}), 404 
    return jsonify([event.to_dict() for event in events])


@event_routes.route('/user_events', methods=['GET'])
@login_required 
def get_users_events(): 
    """
    Get all events for current user
    """
    events = User_Events.query.filter_by(user_id=current_user.id).all()
    if not events: 
        return jsonify({'message': 'no events found'}), 404 
    return jsonify([event.to_dict() for event in events])


@event_routes.route('/<int:event_id>', methods=['POST'])
@login_required 
def post_event(event_id):
    """
    Post a new event to a user
    """
    data = request.json
    event = User_Events.query.filter_by(user_id=current_user.id,event_id=event_id).first()
    if event:
        return jsonify({"error": "User has already signed up for this event"})
    event = Events.query.filter_by(id=event_id).first()
    new_event = User_Events(
        user_id=current_user.id,
        event_id=event.id,
        guests=data['guests']
        )
    db.session.add(new_event)
    db.session.commit()
    return_event = {
        "user_id" : new_event.user_id,
        "event_id": new_event.event_id,
        "guests": new_event.guests
    }
    return jsonify(return_event)


@event_routes.route('/<int:url_event_id>', methods=['PATCH'])
@login_required 
def edit_event(url_event_id):
    """
    Edit an event, changes number of guests
    """
    data = request.get_json()
    event = User_Events.query.filter_by(user_id=current_user.id,event_id=url_event_id).first()
    if not event:
        return jsonify({"error": "Event not found"}), 404
    if event.user_id != current_user.id:
        return jsonify({"error": "unautherized"}), 401
    event.guests= data["guests"]
    db.session.commit()
    return jsonify(event.to_dict()), 200


@event_routes.route('/<int:url_event_id>', methods=['DELETE'])
@login_required
def delete_event(url_event_id):
    """
    Delete an event the user has signed up for
    """
    event = User_Events.query.filter_by(user_id=current_user.id,event_id=url_event_id).first()
    if not event:
        return jsonify({"error": "event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "event removed successfully"}), 200