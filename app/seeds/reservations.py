from app.models import db, Reservations, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reservations():
    reservations_data = [
        {'user_id': 3, 'date': datetime(2025, 7, 1, 10, 0), 'court_number': 1, 'players': 2},
        {'user_id': 1, 'date': datetime(2025, 7, 1, 11, 0), 'court_number': 2, 'players': 4},
        {'user_id': 5, 'date': datetime(2025, 7, 1, 12, 0), 'court_number': 3, 'players': 1},
        {'user_id': 2, 'date': datetime(2025, 7, 1, 13, 0), 'court_number': 4, 'players': 3},
        {'user_id': 7, 'date': datetime(2025, 7, 2, 10, 0), 'court_number': 1, 'players': 2},
        {'user_id': 4, 'date': datetime(2025, 7, 2, 11, 0), 'court_number': 2, 'players': 4},
        {'user_id': 6, 'date': datetime(2025, 7, 2, 12, 0), 'court_number': 3, 'players': 1},
        {'user_id': 8, 'date': datetime(2025, 7, 2, 13, 0), 'court_number': 4, 'players': 3},
        {'user_id': 1, 'date': datetime(2025, 7, 3, 14, 0), 'court_number': 1, 'players': 2},
        {'user_id': 3, 'date': datetime(2025, 7, 3, 15, 0), 'court_number': 2, 'players': 4},
        {'user_id': 5, 'date': datetime(2025, 7, 3, 16, 0), 'court_number': 3, 'players': 1},
        {'user_id': 2, 'date': datetime(2025, 7, 3, 17, 0), 'court_number': 4, 'players': 3},
        {'user_id': 7, 'date': datetime(2025, 7, 4, 10, 0), 'court_number': 1, 'players': 2},
        {'user_id': 4, 'date': datetime(2025, 7, 4, 11, 0), 'court_number': 2, 'players': 4},
        {'user_id': 6, 'date': datetime(2025, 7, 4, 12, 0), 'court_number': 3, 'players': 1},
        {'user_id': 8, 'date': datetime(2025, 7, 4, 13, 0), 'court_number': 4, 'players': 3},
        {'user_id': 1, 'date': datetime(2025, 7, 5, 14, 0), 'court_number': 1, 'players': 2},
        {'user_id': 3, 'date': datetime(2025, 7, 5, 15, 0), 'court_number': 2, 'players': 4},
        {'user_id': 5, 'date': datetime(2025, 7, 5, 16, 0), 'court_number': 3, 'players': 1},
        {'user_id': 2, 'date': datetime(2025, 7, 5, 17, 0), 'court_number': 4, 'players': 3},
        {'user_id': 7, 'date': datetime(2025, 7, 6, 18, 0), 'court_number': 1, 'players': 2},
        {'user_id': 4, 'date': datetime(2025, 7, 6, 18, 0), 'court_number': 2, 'players': 4},
        {'user_id': 6, 'date': datetime(2025, 7, 6, 18, 0), 'court_number': 3, 'players': 1},
        {'user_id': 8, 'date': datetime(2025, 7, 6, 18, 0), 'court_number': 4, 'players': 3},
        {'user_id': 1, 'date': datetime(2025, 7, 7, 19, 0), 'court_number': 1, 'players': 2},
    ]

    reservations = []
    for reservation_data in reservations_data:
        reservation = Reservations(
            user_id=reservation_data['user_id'],
            date=reservation_data['date'],
            court_number=reservation_data['court_number'],
            players=reservation_data['players'],
        )
        reservations.append(reservation)

    db.session.add_all(reservations)
    db.session.commit()

def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reservations"))
        
    db.session.commit()