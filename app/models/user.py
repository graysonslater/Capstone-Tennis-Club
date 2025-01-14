from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #!FAILED ASSOSIATION ATTEMPT!!!!
    user_events = db.relationship('User_Events', back_populates='user', cascade="all, delete-orphan")
    events = db.relationship('Events', secondary='user_events', back_populates='users')

    reservations = db.relationship("Reservations", backref="users", cascade="all, delete-orphan")
    photos = db.relationship("Photos", backref="users", cascade="all, delete-orphan")
    comments = db.relationship("Comments", backref="users", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    #!COME BACK TO UNDERTAND THIS!!!!!
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,     
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'events': [{
                'event_id': user_event.event_id,
                'event_name': user_event.event.event_name,
                'registration_price': user_event.event.registration_price,
                'event_date': user_event.event.event_date.isoformat(), 
                'guests': user_event.guests
            } for user_event in self.user_events]  ,
            "reservations": [{
                'id': reservation.id,
                'date': reservation.date.isoformat(), 
                'court_number': reservation.court_number,
                'players': reservation.players,
                'created_at': reservation.created_at.isoformat(), 
                'updated_at': reservation.updated_at.isoformat() 
            } for reservation in self.reservations]

        }
    