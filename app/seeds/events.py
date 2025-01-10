from app.models import db, Events, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_events():
    events_data = [
        {'event_name': 'Grand Slam Tournament', 'registration_price': 100.00, 'event_date': datetime.strptime('2025-03-07', '%Y-%m-%d').date()},
        {'event_name': 'Summer Tennis Camp', 'registration_price': 250.00, 'event_date': datetime.strptime('2025-04-27', '%Y-%m-%d').date()},
        {'event_name': 'Charity Tennis Match',  'registration_price': 50.00, 'event_date': datetime.strptime('2025-05-07', '%Y-%m-%d').date()},
        {'event_name': 'Winter Open Championship',  'registration_price': 150.00, 'event_date': datetime.strptime('2025-06-27', '%Y-%m-%d').date()},
        {'event_name': 'Mixed Doubles League', 'registration_price': 75.00, 'event_date': datetime.strptime('2025-07-27', '%Y-%m-%d').date()},
        {'event_name': 'Youth Tennis Series', 'registration_price': 30.00, 'event_date': datetime.strptime('2025-08-26', '%Y-%m-%d').date()},
        {'event_name': 'Pro-Am Tennis Exhibition',  'registration_price': 200.00, 'event_date': datetime.strptime('2025-09-25', '%Y-%m-%d').date()},
        {'event_name': 'Local Club Championships',  'registration_price': 60.00, 'event_date': datetime.strptime('2025-10-15', '%Y-%m-%d').date()},
        {'event_name': 'Fall Classic Tournament',  'registration_price': 80.00, 'event_date': datetime.strptime('2025-11-14', '%Y-%m-%d').date()},
        {'event_name': "Women's Tennis Open",  "registration_price": 120.00, "event_date": datetime.strptime('2025-12-14', '%Y-%m-%d').date()},
        {"event_name": "Men's Singles Championship",  "registration_price": 110.00, "event_date": datetime.strptime('2026-01-13', '%Y-%m-%d').date()},
        {"event_name": "Tennis Fest",  "registration_price": 90.00, "event_date": datetime.strptime('2026-02-12', '%Y-%m-%d').date()},
        {"event_name": "Celebrity Charity Match",  "registration_price": 150.00, "event_date": datetime.strptime('2026-03-14', '%Y-%m-%d').date()},
        {"event_name": "Doubles Showdown",  "registration_price": 70.00, "event_date": datetime.strptime('2026-04-13', '%Y-%m-%d').date()},
        {"event_name": "Legends of Tennis Exhibition", "registration_price": 200.00, "event_date": datetime.strptime('2026-05-12', '%Y-%m-%d').date()},
    ]

    events = []
    for event in events_data:
        new_event = Events(
            event_name=event['event_name'],
            registration_price=event['registration_price'],
            event_date=event['event_date']
        )
        events.append(new_event)

    db.session.add_all(events)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
        
    db.session.commit()