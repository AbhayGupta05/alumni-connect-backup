from flask import Blueprint, jsonify, request, session
from src.models.message import Message, ForumPost, db
from src.models.user import User
from src.models.alumni import Alumni

messages_bp = Blueprint('messages', __name__)

@messages_bp.route('/messages', methods=['GET'])
def get_messages():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    # Get messages where user is sender or recipient
    messages = Message.query.filter(
        (Message.sender_id == user_id) | (Message.recipient_id == user_id)
    ).order_by(Message.created_at.desc()).all()
    
    # Group messages by conversation
    conversations = {}
    for message in messages:
        other_user_id = message.sender_id if message.recipient_id == user_id else message.recipient_id
        
        if other_user_id not in conversations:
            other_user = User.query.get(other_user_id)
            alumni = Alumni.query.filter_by(user_id=other_user_id).first()
            
            conversations[other_user_id] = {
                'user': other_user.to_dict() if other_user else None,
                'alumni': alumni.to_dict() if alumni else None,
                'messages': [],
                'unread_count': 0,
                'last_message_date': None
            }
        
        message_data = message.to_dict()
        conversations[other_user_id]['messages'].append(message_data)
        
        # Count unread messages
        if message.recipient_id == user_id and not message.is_read:
            conversations[other_user_id]['unread_count'] += 1
        
        # Update last message date
        if not conversations[other_user_id]['last_message_date'] or message.created_at > conversations[other_user_id]['last_message_date']:
            conversations[other_user_id]['last_message_date'] = message.created_at
    
    # Convert to list and sort by last message date
    conversations_list = list(conversations.values())
    conversations_list.sort(key=lambda x: x['last_message_date'] or '', reverse=True)
    
    return jsonify({
        'success': True,
        'conversations': conversations_list
    }), 200

@messages_bp.route('/messages/conversation/<int:other_user_id>', methods=['GET'])
def get_conversation(other_user_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    # Get messages between current user and other user
    messages = Message.query.filter(
        ((Message.sender_id == user_id) & (Message.recipient_id == other_user_id)) |
        ((Message.sender_id == other_user_id) & (Message.recipient_id == user_id))
    ).order_by(Message.created_at.asc()).all()
    
    # Mark messages as read
    Message.query.filter(
        (Message.sender_id == other_user_id) & 
        (Message.recipient_id == user_id) & 
        (Message.is_read == False)
    ).update({'is_read': True})
    db.session.commit()
    
    # Get other user info
    other_user = User.query.get(other_user_id)
    alumni = Alumni.query.filter_by(user_id=other_user_id).first()
    
    return jsonify({
        'success': True,
        'messages': [msg.to_dict() for msg in messages],
        'other_user': other_user.to_dict() if other_user else None,
        'other_user_alumni': alumni.to_dict() if alumni else None
    }), 200

@messages_bp.route('/messages', methods=['POST'])
def send_message():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.json
    
    message = Message(
        sender_id=user_id,
        recipient_id=data['recipient_id'],
        subject=data.get('subject'),
        content=data['content'],
        message_type=data.get('message_type', 'direct')
    )
    
    db.session.add(message)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': message.to_dict()
    }), 201

@messages_bp.route('/messages/<int:message_id>/read', methods=['PUT'])
def mark_message_read(message_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    message = Message.query.get_or_404(message_id)
    
    # Only recipient can mark message as read
    if message.recipient_id != user_id:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    message.is_read = True
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Message marked as read'
    }), 200

# Forum Posts
@messages_bp.route('/forum/posts', methods=['GET'])
def get_forum_posts():
    category = request.args.get('category')
    
    query = ForumPost.query
    
    if category and category != 'all':
        query = query.filter(ForumPost.category == category)
    
    posts = query.order_by(ForumPost.created_at.desc()).all()
    
    # Add author info to each post
    posts_data = []
    for post in posts:
        post_data = post.to_dict()
        author = User.query.get(post.author_id)
        alumni = Alumni.query.filter_by(user_id=post.author_id).first()
        
        post_data['author'] = author.to_dict() if author else None
        post_data['author_alumni'] = alumni.to_dict() if alumni else None
        posts_data.append(post_data)
    
    return jsonify({
        'success': True,
        'posts': posts_data
    }), 200

@messages_bp.route('/forum/posts', methods=['POST'])
def create_forum_post():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.json
    
    post = ForumPost(
        author_id=user_id,
        title=data['title'],
        content=data['content'],
        category=data.get('category', 'general')
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'post': post.to_dict()
    }), 201

@messages_bp.route('/forum/posts/<int:post_id>/like', methods=['POST'])
def like_forum_post(post_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    post = ForumPost.query.get_or_404(post_id)
    post.likes_count += 1
    db.session.commit()
    
    return jsonify({
        'success': True,
        'likes_count': post.likes_count
    }), 200

@messages_bp.route('/unread-count', methods=['GET'])
def get_unread_count():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    unread_count = Message.query.filter_by(
        recipient_id=user_id,
        is_read=False
    ).count()
    
    return jsonify({
        'success': True,
        'unread_count': unread_count
    }), 200

