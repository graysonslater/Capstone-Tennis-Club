from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reservations(db.Model):
    __tablename__ = 'reservations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db. ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    court_number = db.Column(db.Integer, nullable=False)
    players = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date,
            'court_number': self.court_number,
            'players': self.players,
            'created_at': self.created_at,            
        }