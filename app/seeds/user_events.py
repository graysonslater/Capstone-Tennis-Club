from app.models import db, User_Events, environment, SCHEMA

def seed_user_events():
    user_events_data =[ 
        {'user_id': 3, 'event_id': 7, 'guests': 2},
        {'user_id': 5, 'event_id': 2, 'guests': 0},
        {'user_id': 1, 'event_id': 11, 'guests': 3},
        {'user_id': 4, 'event_id': 9, 'guests': 1},
        {'user_id': 6, 'event_id': 4, 'guests': 4},
        {'user_id': 2, 'event_id': 10, 'guests': 2},
        {'user_id': 8, 'event_id': 3, 'guests': 0},
        {'user_id': 7, 'event_id': 5, 'guests': 1},
        {'user_id': 3, 'event_id': 12, 'guests': 3},
        {'user_id': 5, 'event_id': 14, 'guests': 2},
    ]

    user_events = []
    for user_events_data in user_events_data:
        UE = User_Events(
            user_id=user_events_data['user_id'],
            event_id=user_events_data['event_id'],
            guests=user_events_data['guests'],
        )
        user_events.append(UE)

    db.session.add_all(user_events)
    db.session.commit()

def undo_user_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_events"))
        
    db.session.commit()