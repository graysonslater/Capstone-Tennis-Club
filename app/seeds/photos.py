from app.models import db, Photos, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photos():
    photos_data= [
        {'user_id': 1, 'photo_url': 'https://media.gettyimages.com/id/512686280/photo/below-view-of-young-man-and-woman-playing-squash.jpg?s=612x612&w=gi&k=20&c=N0WqXU5xbINADB9GEVyEnXarL8g6hx2_O5xlfRIT7Qs='},
        {'user_id': 2, 'photo_url': 'https://media.gettyimages.com/id/1341102562/photo/asian-squash-coach-father-guiding-teaching-his-daughter-squash-sport-practicing-together-in.jpg?s=612x612&w=gi&k=20&c=aBtJF5SynZKVcYsTSSiKYfM32mIpbWGjsTVjINunHfw='},
        {'user_id': 3, 'photo_url': 'https://media.gettyimages.com/id/510475384/photo/reaching-for-the-squash-ball.jpg?s=612x612&w=gi&k=20&c=zyvhX6GrGUO3s5aLSXHDQaRuHFDtJklwWAcVzEvRutM='},
        {'user_id': 4, 'photo_url': 'https://pixabay.com/images/search/racquetball/'},
        {'user_id': 5, 'photo_url': 'https://media.istockphoto.com/id/1443733283/photo/young-woman-with-squash-clothing-and-racquet.jpg?s=612x612&w=0&k=20&c=VjFmO4xhWXMgCnv4HJfDex62iv8OPp2fQ5mjDNOQ-2Y='},
        {'user_id': 6, 'photo_url': 'https://media.istockphoto.com/id/175417347/photo/racquetball.jpg?s=612x612&w=0&k=20&c=zGEHuIPsBO6tqpBOwlji42rGZIBv3__GVdb10Vpe5G4='},
        {'user_id': 7, 'photo_url': 'https://media.istockphoto.com/id/1031705704/photo/two-male-squash-players-during-a-game.jpg?s=612x612&w=0&k=20&c=TnIytEubh8iC8lg0OObwNHTSbiMzjytRGOnhDT6o_0U='},
        {'user_id': 8, 'photo_url': 'https://previews.123rf.com/images/blueskyimage/blueskyimage1411/blueskyimage141100209/33945662-%D0%B4%D0%B2%D0%BE%D0%B5-%D0%BC%D1%83%D0%B6%D1%87%D0%B8%D0%BD-%D0%B8%D0%B3%D1%80%D0%B0%D1%8E%D1%82-%D0%BC%D0%B0%D1%82%D1%87-%D0%B2-%D1%81%D0%BA%D0%B2%D0%BE%D1%88-%D1%81%D0%BA%D0%B2%D0%BE%D1%88-%D0%B8%D0%B3%D1%80%D0%BE%D0%BA%D0%BE%D0%B2-%D0%B2-%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B8-%D0%BD%D0%B0.jpg'},
        {'user_id': 1, 'photo_url': 'https://st3.depositphotos.com/2117297/16284/i/1600/depositphotos_162848396-stock-photo-two-men-playing-squash.jpg'},
        {'user_id': 2, 'photo_url': 'https://media.istockphoto.com/id/1358033606/photo/full-length-portrait-of-sportive-boy-training-playing-squash-in-sport-studio.jpg?s=612x612&w=0&k=20&c=qYvm0pUNNg12PNuD_WKbZioVglaGIQ3-Jpl3QypdYyk='},
        {'user_id': 3, 'photo_url': 'https://media.gettyimages.com/id/1006571198/photo/two-young-women-playing-squash-game.jpg?s=612x612&w=gi&k=20&c=JSi3DTyAXhcXGTGxJGsZ-w8JVHM7i-k_QYpyBTn8OfY='},
        {'user_id': 4, 'photo_url': 'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1698673970/cbury/enav8ztdvzebxykxsgvv/Hero3.jpg'},
        {'user_id': 5, 'photo_url': 'https://thumbs.dreamstime.com/b/racquetball-equipment-court-squash-racket-balls-wooden-floor-red-lines-photo-selective-focus-104754565.jpg'},
        {'user_id': 6, 'photo_url': 'https://thumbs.dreamstime.com/b/squash-player-serving-ball-racket-men-s-hand-racquetball-equipment-photo-selective-focus-prepares-to-serve-88287481.jpg'},
        {'user_id': 7, 'photo_url': 'https://www.shutterstock.com/image-photo/empty-squash-court-rackets-on-260nw-2503648707.jpg'},
    ]

    photos = []
    for photo_data in photos_data:
        photo = Photos(
            user_id=photo_data['user_id'],
            photo_url=photo_data['photo_url'],
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