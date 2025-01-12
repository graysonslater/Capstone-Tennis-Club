from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class User_Events(db.Model):
    __tablename__ = 'user_events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id= db.Column(db.Integer, nullable=False,primary_key=True) # removed db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'),
    event_id = db.Column(db.Integer, nullable=False,primary_key=True) #removed db.ForeignKey(add_prefix_for_prod('events.id')),
    guests = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # user = db.relationship('User', back_populates="events")
    # event = db.relationship('Event', back_populates="user_events")

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'event_id': self.event_id,
            'guests': self.guests,
            'created_at': self.created_at,
            'updated_at': self.updated_at,            
        }