from flask.cli import AppGroup
from .users import seed_users, undo_users
from .events import seed_events, undo_events
from .user_events import seed_user_events, undo_user_events
from .reservations import seed_reservations, undo_reservations
from .photos import seed_photos, undo_photos
from .photo_comments import seed_photo_comments, undo_photo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_events()
        undo_user_events()
        undo_reservations()
        undo_photos()
        undo_photo_comments()

    seed_users()
    seed_events()
    seed_user_events()
    seed_reservations()
    seed_photos()
    seed_photo_comments()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_events()
    undo_user_events()
    seed_reservations()
    undo_photos()
    undo_photo_comments()
    # Add other undo functions here
