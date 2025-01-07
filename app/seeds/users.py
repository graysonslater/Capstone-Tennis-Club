from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users_data = [
        {'username': 'Pistol Pete', 'firstname': 'Pete', 'lastname': 'Sampras', 'email': 'demo@aa.io', 'password': 'password'},
        {'username': 'Ace1 ', 'firstname': 'Ace ', 'lastname': 'Servington', 'email': 'marnie@aa.io', 'password': 'password'},
        {'username': 'Volley1 ', 'firstname': 'Volley', 'lastname': 'McSlam', 'email': 'bobbie@aa.io', 'password': 'password'},
        {'username': 'Racket1', 'firstname': 'Racket', 'lastname': 'McBackhand', 'email': 'demo1@aa.io', 'password': 'password'},
        {'username': 'FedEx', 'firstname': 'Roger', 'lastname': 'Federer', 'email': 'demo2@aa.io', 'password': 'password'},
        {'username': 'The Djoker', 'firstname': 'Novak', 'lastname': 'Djokovic', 'email': 'demo3@aa.io', 'password': 'password'},
        {'username': 'Wild Thing', 'firstname': 'Nick', 'lastname': 'Kyrgios', 'email': 'demo4@aa.io', 'password': 'password'},
        {'username': 'Cool Guy', 'firstname': 'Grayson', 'lastname': 'Slater', 'email': 'demo5@aa.io', 'password': 'password'},
    ]

    users = []
    for user_data in users_data:
        user = User(
            username=user_data['username'],
            firstname=user_data['firstname'],
            lastname=user_data['lastname'],
            email=user_data['email'],
            password=user_data['password'], 
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
