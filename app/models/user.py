from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from typing import List


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.String(40), nullable=False, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # user_to_events : Mapped[List["user_events"]] = relationship("Events"back_populates="event_to_user")
    #                       point to model  points to connecter on user_events          
    # events = db.relationship("User_Events", back_populates='user',cascade="all, delete-orphan")
    
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

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,            
        }
    