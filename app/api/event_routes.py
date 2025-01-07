from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Events, User_Events, db
from flask_login import current_user

event_routes = Blueprint("events", __name__)

@event_routes.route('/', methods=['GET'])
@login_required 
def get_events(): 
    """
    Get all events for current user
    """
    events = User_Events.query.filter_by(user_id=current_user.id).all()
    if not events: 
        return jsonify({'message': 'no events found'}), 404 
    events_list = [event.to_dict() for event in events]
    return jsonify({'events': events_list})

@event_routes.route('/<int:event_id>', methods=['POST'])
@login_required 
def post_event(event_id):
    """
    Post a new event to a user
    """
    data = request.json
    event = Events.query.filter_by(id=event_id).first()
    print("EVENT TEST= ", event.id)
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