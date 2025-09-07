from flask import Blueprint, jsonify, request, session
from datetime import datetime
from src.models.job import Job, JobApplication, db
from src.models.user import User
from src.models.alumni import Alumni

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    # Get query parameters
    job_type = request.args.get('job_type')
    location = request.args.get('location')
    company = request.args.get('company')
    search = request.args.get('search')
    status = request.args.get('status', 'active')
    
    query = Job.query
    
    # Apply filters
    if job_type and job_type != 'all':
        query = query.filter(Job.job_type == job_type)
    
    if location and location != 'all':
        query = query.filter(Job.location.ilike(f'%{location}%'))
    
    if company:
        query = query.filter(Job.company.ilike(f'%{company}%'))
    
    if search:
        search_filter = (
            Job.title.ilike(f'%{search}%') |
            Job.company.ilike(f'%{search}%') |
            Job.description.ilike(f'%{search}%') |
            Job.requirements.ilike(f'%{search}%')
        )
        query = query.filter(search_filter)
    
    if status != 'all':
        query = query.filter(Job.status == status)
    
    jobs = query.order_by(Job.created_at.desc()).all()
    
    # Add poster info and application count
    jobs_data = []
    for job in jobs:
        job_data = job.to_dict()
        
        # Get poster info
        poster = User.query.get(job.posted_by)
        alumni = Alumni.query.filter_by(user_id=job.posted_by).first()
        
        job_data['posted_by_user'] = poster.to_dict() if poster else None
        job_data['posted_by_alumni'] = alumni.to_dict() if alumni else None
        
        # Get application count
        application_count = JobApplication.query.filter_by(job_id=job.id).count()
        job_data['application_count'] = application_count
        
        # Check if current user has applied
        user_id = session.get('user_id')
        if user_id:
            user_application = JobApplication.query.filter_by(
                job_id=job.id,
                applicant_id=user_id
            ).first()
            job_data['user_applied'] = user_application is not None
            job_data['application_status'] = user_application.status if user_application else None
        
        jobs_data.append(job_data)
    
    return jsonify({
        'success': True,
        'jobs': jobs_data,
        'total': len(jobs_data)
    }), 200

@jobs_bp.route('/jobs', methods=['POST'])
def create_job():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.json
    
    job = Job(
        title=data['title'],
        company=data['company'],
        location=data.get('location'),
        job_type=data.get('job_type', 'full-time'),
        salary_min=data.get('salary_min'),
        salary_max=data.get('salary_max'),
        description=data.get('description'),
        requirements=data.get('requirements'),
        posted_by=user_id,
        application_deadline=datetime.fromisoformat(data['application_deadline'].replace('Z', '+00:00')) if data.get('application_deadline') else None,
        is_remote=data.get('is_remote', False)
    )
    
    db.session.add(job)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'job': job.to_dict(),
        'message': 'Job posted successfully'
    }), 201

@jobs_bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    
    job_data = job.to_dict()
    
    # Get poster info
    poster = User.query.get(job.posted_by)
    alumni = Alumni.query.filter_by(user_id=job.posted_by).first()
    
    job_data['posted_by_user'] = poster.to_dict() if poster else None
    job_data['posted_by_alumni'] = alumni.to_dict() if alumni else None
    
    # Get application count
    application_count = JobApplication.query.filter_by(job_id=job.id).count()
    job_data['application_count'] = application_count
    
    # Check if current user has applied
    user_id = session.get('user_id')
    if user_id:
        user_application = JobApplication.query.filter_by(
            job_id=job.id,
            applicant_id=user_id
        ).first()
        job_data['user_applied'] = user_application is not None
        job_data['application_status'] = user_application.status if user_application else None
    
    return jsonify({
        'success': True,
        'job': job_data
    }), 200

@jobs_bp.route('/jobs/<int:job_id>/apply', methods=['POST'])
def apply_for_job(job_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    job = Job.query.get_or_404(job_id)
    
    # Check if already applied
    existing_application = JobApplication.query.filter_by(
        job_id=job_id,
        applicant_id=user_id
    ).first()
    
    if existing_application:
        return jsonify({
            'success': False,
            'message': 'Already applied for this job'
        }), 400
    
    # Check application deadline
    if job.application_deadline and datetime.utcnow() > job.application_deadline:
        return jsonify({
            'success': False,
            'message': 'Application deadline has passed'
        }), 400
    
    data = request.json
    
    application = JobApplication(
        job_id=job_id,
        applicant_id=user_id,
        cover_letter=data.get('cover_letter'),
        resume_url=data.get('resume_url')
    )
    
    db.session.add(application)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'application': application.to_dict(),
        'message': 'Application submitted successfully'
    }), 201

@jobs_bp.route('/jobs/<int:job_id>/applications', methods=['GET'])
def get_job_applications(job_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    job = Job.query.get_or_404(job_id)
    
    # Check if user is the job poster or admin
    if job.posted_by != user_id and session.get('user_type') != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    applications = JobApplication.query.filter_by(job_id=job_id).all()
    
    applications_data = []
    for app in applications:
        app_data = app.to_dict()
        
        # Get applicant info
        applicant = User.query.get(app.applicant_id)
        alumni = Alumni.query.filter_by(user_id=app.applicant_id).first()
        
        app_data['applicant'] = applicant.to_dict() if applicant else None
        app_data['applicant_alumni'] = alumni.to_dict() if alumni else None
        
        applications_data.append(app_data)
    
    return jsonify({
        'success': True,
        'applications': applications_data,
        'total': len(applications_data)
    }), 200

@jobs_bp.route('/my-jobs', methods=['GET'])
def get_my_jobs():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    # Get jobs posted by user
    posted_jobs = Job.query.filter_by(posted_by=user_id).all()
    
    # Get jobs user has applied to
    applications = JobApplication.query.filter_by(applicant_id=user_id).all()
    applied_jobs = []
    
    for app in applications:
        job = Job.query.get(app.job_id)
        if job:
            job_data = job.to_dict()
            job_data['application_status'] = app.status
            job_data['applied_at'] = app.applied_at.isoformat()
            applied_jobs.append(job_data)
    
    return jsonify({
        'success': True,
        'posted_jobs': [job.to_dict() for job in posted_jobs],
        'applied_jobs': applied_jobs
    }), 200

@jobs_bp.route('/applications/<int:application_id>/status', methods=['PUT'])
def update_application_status(application_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    application = JobApplication.query.get_or_404(application_id)
    job = Job.query.get(application.job_id)
    
    # Check if user is the job poster or admin
    if job.posted_by != user_id and session.get('user_type') != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    data = request.json
    application.status = data['status']
    db.session.commit()
    
    return jsonify({
        'success': True,
        'application': application.to_dict(),
        'message': 'Application status updated'
    }), 200

