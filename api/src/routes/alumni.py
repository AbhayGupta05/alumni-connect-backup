from flask import Blueprint, jsonify, request, session
from src.models.alumni import Alumni, db
from src.models.user import User

alumni_bp = Blueprint('alumni', __name__)

@alumni_bp.route('/alumni', methods=['GET'])
def get_alumni():
    # Get query parameters for filtering
    department = request.args.get('department')
    graduation_year = request.args.get('graduation_year')
    location = request.args.get('location')
    search = request.args.get('search')
    
    query = Alumni.query.join(User)
    
    # Apply filters
    if department and department != 'all':
        query = query.filter(Alumni.department.ilike(f'%{department}%'))
    
    if graduation_year and graduation_year != 'all':
        query = query.filter(Alumni.graduation_year == int(graduation_year))
    
    if location and location != 'all':
        query = query.filter(Alumni.location.ilike(f'%{location}%'))
    
    if search:
        search_filter = (
            Alumni.first_name.ilike(f'%{search}%') |
            Alumni.last_name.ilike(f'%{search}%') |
            Alumni.current_company.ilike(f'%{search}%') |
            Alumni.current_position.ilike(f'%{search}%') |
            Alumni.skills.ilike(f'%{search}%')
        )
        query = query.filter(search_filter)
    
    alumni = query.all()
    
    return jsonify({
        'success': True,
        'alumni': [alum.to_dict() for alum in alumni],
        'total': len(alumni)
    }), 200

@alumni_bp.route('/alumni/<int:alumni_id>', methods=['GET'])
def get_alumni_profile(alumni_id):
    alumni = Alumni.query.get_or_404(alumni_id)
    user = User.query.get(alumni.user_id)
    
    profile_data = alumni.to_dict()
    profile_data['user'] = user.to_dict() if user else None
    
    return jsonify({
        'success': True,
        'alumni': profile_data
    }), 200

@alumni_bp.route('/alumni/<int:alumni_id>', methods=['PUT'])
def update_alumni_profile(alumni_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    alumni = Alumni.query.get_or_404(alumni_id)
    
    # Check if user owns this profile or is admin
    if alumni.user_id != user_id and session.get('user_type') != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    data = request.json
    
    # Update fields
    alumni.first_name = data.get('first_name', alumni.first_name)
    alumni.last_name = data.get('last_name', alumni.last_name)
    alumni.graduation_year = data.get('graduation_year', alumni.graduation_year)
    alumni.department = data.get('department', alumni.department)
    alumni.current_position = data.get('current_position', alumni.current_position)
    alumni.current_company = data.get('current_company', alumni.current_company)
    alumni.location = data.get('location', alumni.location)
    alumni.bio = data.get('bio', alumni.bio)
    alumni.skills = data.get('skills', alumni.skills)
    alumni.linkedin_url = data.get('linkedin_url', alumni.linkedin_url)
    alumni.is_mentor = data.get('is_mentor', alumni.is_mentor)
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'alumni': alumni.to_dict(),
        'message': 'Profile updated successfully'
    }), 200

@alumni_bp.route('/alumni/stats', methods=['GET'])
def get_alumni_stats():
    total_alumni = Alumni.query.count()
    mentors_count = Alumni.query.filter_by(is_mentor=True).count()
    
    # Get graduation year distribution
    year_stats = db.session.query(
        Alumni.graduation_year,
        db.func.count(Alumni.id).label('count')
    ).group_by(Alumni.graduation_year).all()
    
    # Get department distribution
    dept_stats = db.session.query(
        Alumni.department,
        db.func.count(Alumni.id).label('count')
    ).group_by(Alumni.department).all()
    
    return jsonify({
        'success': True,
        'stats': {
            'total_alumni': total_alumni,
            'mentors_count': mentors_count,
            'graduation_years': [{'year': year, 'count': count} for year, count in year_stats],
            'departments': [{'department': dept, 'count': count} for dept, count in dept_stats]
        }
    }), 200

@alumni_bp.route('/alumni/search', methods=['POST'])
def search_alumni():
    data = request.json
    search_term = data.get('search', '')
    filters = data.get('filters', {})
    
    query = Alumni.query.join(User)
    
    if search_term:
        search_filter = (
            Alumni.first_name.ilike(f'%{search_term}%') |
            Alumni.last_name.ilike(f'%{search_term}%') |
            Alumni.current_company.ilike(f'%{search_term}%') |
            Alumni.current_position.ilike(f'%{search_term}%') |
            Alumni.skills.ilike(f'%{search_term}%')
        )
        query = query.filter(search_filter)
    
    # Apply additional filters
    if filters.get('department'):
        query = query.filter(Alumni.department.ilike(f'%{filters["department"]}%'))
    
    if filters.get('graduation_year_min'):
        query = query.filter(Alumni.graduation_year >= int(filters['graduation_year_min']))
    
    if filters.get('graduation_year_max'):
        query = query.filter(Alumni.graduation_year <= int(filters['graduation_year_max']))
    
    if filters.get('is_mentor') is not None:
        query = query.filter(Alumni.is_mentor == filters['is_mentor'])
    
    alumni = query.all()
    
    return jsonify({
        'success': True,
        'alumni': [alum.to_dict() for alum in alumni],
        'total': len(alumni)
    }), 200

