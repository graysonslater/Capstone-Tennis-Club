from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comments, db
from flask_login import current_user

comment_routes = Blueprint("comments", __name__)


@comment_routes.route('/<int:url_photo_id>', methods=["GET"])
def all_comments(url_photo_id):
    """
    Get all comments for a photo
    """
    comments = Comments.query.filter_by(photo_id= url_photo_id).all()
    if not comments:
        return jsonify({'message': 'no comments found'}), 404
    return jsonify([comment.to_dict() for comment in comments]), 200


@comment_routes.route('/<int:url_photo_id>', methods=["POST"])
@login_required 
def post_comment(url_photo_id):
    """
    Post a new comment to a photo
    """
    data = request.json
    if not data['comment']:
        return jsonify({'error': 'comment cannot be empty'})
    new_comment = Comments(
        user_id= current_user.id,
        photo_id= url_photo_id,
        comment= data['comment']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify(new_comment.to_dict()), 200


@comment_routes.route('/edit_comment', methods=['PATCH'])
@login_required 
def edit_comment():
    """
    Post a new event to a user
    request must include the new comment, comments ID and the photos ID!!!
    """
    data = request.json
    comment = Comments.query.filter_by(user_id=current_user.id,photo_id=data["photoId"],id=data['id']).first()
    if not comment:
        return jsonify({"error": "comment not found"}), 404
    comment.comment= data["comment"]
    db.session.commit()
    return jsonify(comment.to_dict()), 200


@comment_routes.route('/', methods=['DELETE'])
@login_required
def delete_event():
    """
    Delete a comment a user has left on a photo
    request must include the comments ID and the photos ID!!!
    """
    data = request.json
    comment = Comments.query.filter_by(user_id=current_user.id,photo_id=data["photoId"],id=data['id']).first()
    if not comment:
        return jsonify({"error": "comment not found"}), 404
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"msg": "comment deleted"}), 200