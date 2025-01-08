from flask.cli import AppGroup
from .users import seed_users, undo_users
from .events import seed_events, undo_events
from .user_events import seed_user_events, undo_user_events
from .reservations import seed_reservations, undo_reservations
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_events()
        undo_user_events()
        undo_reservations()
        undo_photos()
        undo_comments()

    seed_users()
    seed_events()
    seed_user_events()
    seed_reservations()
    seed_photos()
    seed_comments()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_events()
    undo_user_events()
    seed_reservations()
    undo_photos()
    undo_comments()