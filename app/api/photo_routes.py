from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Photos, User, db
from flask_login import current_user

photo_routes = Blueprint("photos", __name__)

@photo_routes.route('/', methods=['GET'])
@login_required 
def get_all_photos(): 
    """
    Get all photos 
    """
    photos = Photos.query.all()
    if not photos: 
        return jsonify({'message': 'no photos found'}), 404 
    return jsonify([photo.to_dict() for photo in photos])


@photo_routes.route('/search', methods=["GET"])
def get_photo_by_username():
    """
    Search photos by username
    """
    search = request.args.get("input","").strip()
    if not search:
        return jsonify({"error":"no input"}),400
    search_result = User.query.filter(User.username.ilike(f'%{search}%')).all()

    result_list = []
    for user in search_result:
        photos = Photos.query.filter_by(user_id=user.id).all()  # Check if user has any photos
        if photos:
            for photo in photos:
                result_list.append({
                    "username":user.username,
                    "id": photo.id,
                    "photo_url": photo.photo_url
                })

    return jsonify({'results_list': result_list}), 200  


@photo_routes.route('/<int:photo_id>', methods=['GET'])
@login_required 
def get_photo_by_id(photo_id): 
    """
    Get photo by id 
    """
    photo = Photos.query.filter_by(id=photo_id).first()
    if not photo: 
        return jsonify({'message': 'no photo found'}), 404 
    return jsonify(photo.to_dict())


@photo_routes.route('/', methods=["POST"])
@login_required 
def post_photo():
    """
    Post a new photo
    """
    data = request.json
    if not data['photoUrl']:
        return jsonify({'error': 'no photo url'})
    new_photo = Photos(
        user_id= current_user.id,
        photo_url=data["photoUrl"],
        caption= data['caption']
    )
    db.session.add(new_photo)
    db.session.commit()
    return jsonify(new_photo.to_dict()), 200