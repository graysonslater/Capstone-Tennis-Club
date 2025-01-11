from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class User_Events(db.Model):
    __tablename__ = 'user_events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id= db.Column(db.Integer, nullable=False,primary_key=True) # removed db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'),
    event_id = db.Column(db.Integer, nullable=False,primary_key=True) #removed db.ForeignKey(add_prefix_for_prod('events.id')),
    guests = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'event_id': self.event_id,
            'guests': self.guests,
            'created_at': self.created_at,
            'updated_at': self.updated_at,            
        }