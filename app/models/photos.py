from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Photos(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db. ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    photo_url = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    comments = db.relationship("Comments", backref="photos", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_url': self.photo_url,
            'caption': self.caption,
            'created_at': self.created_at,
            'updated_at': self.updated_at,            
        }