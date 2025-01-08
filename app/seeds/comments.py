from app.models import db, Comments, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments_data = [
        {'user_id': 2, 'photo_id': 1, 'comment': 'Great backhand technique!'},
        {'user_id': 3, 'photo_id': 1, 'comment': 'Nice court, where is this?'},
        {'user_id': 4, 'photo_id': 1, 'comment': 'Intense rally, well played!'},
        {'user_id': 5, 'photo_id': 1, 'comment': 'Love the energy in this shot'},
        {'user_id': 1, 'photo_id': 2, 'comment': 'Father-daughter goals!'},
        {'user_id': 3, 'photo_id': 2, 'comment': 'Teaching moment, love it!'},
        {'user_id': 4, 'photo_id': 2, 'comment': 'Great form on that serve'},
        {'user_id': 5, 'photo_id': 2, 'comment': 'Future champion in making'},
        {'user_id': 1, 'photo_id': 3, 'comment': 'What a stretch for the ball'},
        {'user_id': 2, 'photo_id': 3, 'comment': 'Impressive agility there!'},
        {'user_id': 4, 'photo_id': 3, 'comment': 'Close call on that shot'},
        {'user_id': 5, 'photo_id': 3, 'comment': 'Racquet control on point'},
        {'user_id': 1, 'photo_id': 4, 'comment': 'Classic racquetball stance'},
        {'user_id': 2, 'photo_id': 4, 'comment': 'Ready for a power serve!'},
        {'user_id': 3, 'photo_id': 4, 'comment': 'Nice wrist position there'},
        {'user_id': 5, 'photo_id': 4, 'comment': 'Focused and ready to play'},
        {'user_id': 1, 'photo_id': 5, 'comment': 'Stylish racquetball outfit'},
        {'user_id': 2, 'photo_id': 5, 'comment': 'Perfect grip on racquet'},
        {'user_id': 3, 'photo_id': 5, 'comment': 'Ready for a tough match!'},
        {'user_id': 4, 'photo_id': 5, 'comment': 'Confidence in every pose'},
        {'user_id': 1, 'photo_id': 6, 'comment': 'Classic blue court setup'},
        {'user_id': 2, 'photo_id': 6, 'comment': 'Ready for a power serve!'},
        {'user_id': 3, 'photo_id': 6, 'comment': 'Great follow-through form'},
        {'user_id': 4, 'photo_id': 6, 'comment': 'Intense focus pre-serve'},
        {'user_id': 1, 'photo_id': 7, 'comment': 'Intense rally in progress'},
        {'user_id': 2, 'photo_id': 7, 'comment': 'Great defensive stance'},
        {'user_id': 3, 'photo_id': 7, 'comment': 'Watch that corner shot!'},
        {'user_id': 4, 'photo_id': 7, 'comment': 'Impressive speed on court'},
        {'user_id': 1, 'photo_id': 8, 'comment': 'Fierce competition here!'},
        {'user_id': 2, 'photo_id': 8, 'comment': 'Nice backhand preparation'},
        {'user_id': 3, 'photo_id': 8, 'comment': 'Eyes on the ball, perfect'},
        {'user_id': 4, 'photo_id': 8, 'comment': 'Great use of court space'},
        {'user_id': 2, 'photo_id': 9, 'comment': 'Powerful serve incoming!'},
        {'user_id': 3, 'photo_id': 9, 'comment': 'Perfect stance for serve'},
        {'user_id': 4, 'photo_id': 9, 'comment': 'Watch the ball placement'},
        {'user_id': 5, 'photo_id': 9, 'comment': 'Ready for any return shot'},
        {'user_id': 1, 'photo_id': 10, 'comment': 'Future champion for sure'},
        {'user_id': 3, 'photo_id': 10, 'comment': 'Great form for a youngster'},
        {'user_id': 4, 'photo_id': 10, 'comment': 'Nice grip on the racquet'},
        {'user_id': 5, 'photo_id': 10, 'comment': 'Focused and ready to play'},
        {'user_id': 1, 'photo_id': 11, 'comment': 'Doubles match looks fun!'},
        {'user_id': 2, 'photo_id': 11, 'comment': 'Great teamwork on display'},
        {'user_id': 4, 'photo_id': 11, 'comment': 'Nice court positioning'},
        {'user_id': 5, 'photo_id': 11, 'comment': 'Ready for a tough rally'},
        {'user_id': 1, 'photo_id': 12, 'comment': 'Love the court design'},
        {'user_id': 2, 'photo_id': 12, 'comment': 'Perfect lighting for play'},
        {'user_id': 3, 'photo_id': 12, 'comment': 'Ready for an intense game'},
        {'user_id': 5, 'photo_id': 12, 'comment': 'Great facility for matches'},
        {'user_id': 1, 'photo_id': 13, 'comment': 'Classic racquetball gear'},
        {'user_id': 2, 'photo_id': 13, 'comment': 'Ready for a power serve!'},
        {'user_id': 3, 'photo_id': 13, 'comment': 'Nice wrist position there'},
        {'user_id': 4, 'photo_id': 13, 'comment': 'Focused and ready to play'},
        {'user_id': 1, 'photo_id': 14, 'comment': 'Serve looks powerful!'},
        {'user_id': 2, 'photo_id': 14, 'comment': 'Great form on that swing'},
        {'user_id': 3, 'photo_id': 14, 'comment': 'Eyes on the ball, perfect'},
        {'user_id': 4, 'photo_id': 14, 'comment': 'Ready for any return shot'},
        {'user_id': 1, 'photo_id': 15, 'comment': 'Perfect court conditions'},
        {'user_id': 2, 'photo_id': 15, 'comment': 'Ready for an epic match'},
        {'user_id': 3, 'photo_id': 15, 'comment': 'Love the clean court look'},
        {'user_id': 4, 'photo_id': 15, 'comment': 'Set for an intense game'}
    ]

    comments = []
    for comment_data in comments_data:
        comment = Comments(
            user_id=comment_data['user_id'],
            photo_id=comment_data['photo_id'],
            comment=comment_data['comment'],
        )
        comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()