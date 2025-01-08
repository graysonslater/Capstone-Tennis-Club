from app.models import db, Photos, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photos():
    photos_data = [
        {'user_id': 1, 'photo_url': 'https://media.gettyimages.com/id/512686280/photo/below-view-of-young-man-and-woman-playing-squash.jpg?s=612x612&w=gi&k=20&c=N0WqXU5xbINADB9GEVyEnXarL8g6hx2_O5xlfRIT7Qs=', 'caption': "Just caught this awesome angle during my squash match! Love how it shows the intensity of the game. Who's up for a round?"},
        {'user_id': 2, 'photo_url': 'https://media.gettyimages.com/id/1341102562/photo/asian-squash-coach-father-guiding-teaching-his-daughter-squash-sport-practicing-together-in.jpg?s=612x612&w=gi&k=20&c=aBtJF5SynZKVcYsTSSiKYfM32mIpbWGjsTVjINunHfw=', 'caption': "Teaching my daughter the ropes of squash. It's amazing to share my passion with her. Family bonding at its best!"},
        {'user_id': 3, 'photo_url': 'https://media.gettyimages.com/id/510475384/photo/reaching-for-the-squash-ball.jpg?s=612x612&w=gi&k=20&c=zyvhX6GrGUO3s5aLSXHDQaRuHFDtJklwWAcVzEvRutM=', 'caption': "Caught in action! This shot captures the split-second decisions we make in squash. It's all about quick reflexes and determination."},
        {'user_id': 4, 'photo_url': 'https://pixabay.com/images/search/racquetball/', 'caption': "Check out this awesome collection of racquetball pics I found! So many great shots that capture the essence of our sport. Which one's your favorite?"},
        {'user_id': 5, 'photo_url': 'https://media.istockphoto.com/id/1443733283/photo/young-woman-with-squash-clothing-and-racquet.jpg?s=612x612&w=0&k=20&c=VjFmO4xhWXMgCnv4HJfDex62iv8OPp2fQ5mjDNOQ-2Y=', 'caption': "Ready for my match! New gear, fresh mindset. Let's see what today's game brings. Wish me luck!"},
        {'user_id': 6, 'photo_url': 'https://media.istockphoto.com/id/175417347/photo/racquetball.jpg?s=612x612&w=0&k=20&c=zGEHuIPsBO6tqpBOwlji42rGZIBv3__GVdb10Vpe5G4=', 'caption': "My trusty racquet and ball - the only things I need for a great game. Simple pleasures of racquetball. Who's up for a match?"},
        {'user_id': 7, 'photo_url': 'https://media.istockphoto.com/id/1031705704/photo/two-male-squash-players-during-a-game.jpg?s=612x612&w=0&k=20&c=TnIytEubh8iC8lg0OObwNHTSbiMzjytRGOnhDT6o_0U=', 'caption': "Intense rally with my buddy today. Love how this pic captures the energy of our game. Nothing beats a good squash workout!"},
        {'user_id': 8, 'photo_url': 'https://previews.123rf.com/images/blueskyimage/blueskyimage1411/blueskyimage141100209/33945662-%D0%B4%D0%B2%D0%BE%D0%B5-%D0%BC%D1%83%D0%B6%D1%87%D0%B8%D0%BD-%D0%B8%D0%B3%D1%80%D0%B0%D1%8E%D1%82-%D0%BC%D0%B0%D1%82%D1%87-%D0%B2-%D1%81%D0%BA%D0%B2%D0%BE%D1%88-%D1%81%D0%BA%D0%B2%D0%BE%D1%88-%D0%B8%D0%B3%D1%80%D0%BE%D0%BA%D0%BE%D0%B2-%D0%B2-%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B8-%D0%BD%D0%B0.jpg', 'caption': "Action shot from my match yesterday. It was a close game, but I managed to pull through. Love the intensity squash brings out in us!"},
        {'user_id': 1, 'photo_url': 'https://st3.depositphotos.com/2117297/16284/i/1600/depositphotos_162848396-stock-photo-two-men-playing-squash.jpg', 'caption': "Great game with my regular squash partner. We always push each other to the limit. This shot really shows how focused we get!"},
        {'user_id': 2, 'photo_url': 'https://media.istockphoto.com/id/1358033606/photo/full-length-portrait-of-sportive-boy-training-playing-squash-in-sport-studio.jpg?s=612x612&w=0&k=20&c=qYvm0pUNNg12PNuD_WKbZioVglaGIQ3-Jpl3QypdYyk=', 'caption': "My son's first official squash training session. So proud to see him following in my footsteps. Future champion in the making!"},
        {'user_id': 3, 'photo_url': 'https://media.gettyimages.com/id/1006571198/photo/two-young-women-playing-squash-game.jpg?s=612x612&w=gi&k=20&c=JSi3DTyAXhcXGTGxJGsZ-w8JVHM7i-k_QYpyBTn8OfY=', 'caption': "Girls' night out on the squash court! Nothing beats unwinding with a friend and a good game. Who says squash isn't a social sport?"},
        {'user_id': 4, 'photo_url': 'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1698673970/cbury/enav8ztdvzebxykxsgvv/Hero3.jpg', 'caption': "Caught in mid-swing during our club tournament. The energy was electric! Can't wait for the next round. #SquashLife"},
        {'user_id': 5, 'photo_url': 'https://thumbs.dreamstime.com/b/racquetball-equipment-court-squash-racket-balls-wooden-floor-red-lines-photo-selective-focus-104754565.jpg', 'caption': "My squash essentials laid out and ready to go. There's something so satisfying about a clean court and fresh equipment. Game time!"},
        {'user_id': 6, 'photo_url': 'https://thumbs.dreamstime.com/b/squash-player-serving-ball-racket-men-s-hand-racquetball-equipment-photo-selective-focus-prepares-to-serve-88287481.jpg', 'caption': "Perfecting my serve. It's all in the wrist! Been practicing this move for weeks and finally feeling confident. Watch out, opponents!"},
        {'user_id': 7, 'photo_url': 'https://www.shutterstock.com/image-photo/empty-squash-court-rackets-on-260nw-2503648707.jpg', 'caption': "The calm before the storm. Love this moment right before a match begins. Two rackets, one court, endless possibilities. Let's play!"}
    ]

    photos = []
    for photo_data in photos_data:
        photo = Photos(
            user_id=photo_data['user_id'],
            photo_url=photo_data['photo_url'],
            caption=photo_data['caption']
        )
        photos.append(photo)

    db.session.add_all(photos)
    db.session.commit()

def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))
        
    db.session.commit()