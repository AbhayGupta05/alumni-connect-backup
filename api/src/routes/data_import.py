from flask import Blueprint, jsonify, request, session
from src.models.user import User, UserRole, UserStatus, db
from src.models.institution import Institution, DataUploadBatch
from src.models.invite_token import InviteToken
from src.utils.auth_decorators import require_role
from src.utils.email_service import send_bulk_invitations
from datetime import datetime, timedelta
import json
import io
import secrets
import threading
from werkzeug.utils import secure_filename
import os
import csv

# Try to import pandas, provide fallback if not available
try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False
    print("Warning: pandas not available. Data import functionality will be limited.")

# Try to import openpyxl for Excel support
try:
    import openpyxl
    EXCEL_SUPPORT = True
except ImportError:
    EXCEL_SUPPORT = False
    print("Warning: openpyxl not available. Excel file support disabled.")

data_import_bp = Blueprint('data_import', __name__)

# Allowed file extensions (adjust based on available libraries)
if EXCEL_SUPPORT:
    ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}
else:
    ALLOWED_EXTENSIONS = {'csv'}

def read_csv_file(file):
    """Read CSV file with fallback for when pandas is not available"""
    if PANDAS_AVAILABLE:
        try:
            return pd.read_csv(file, encoding='utf-8')
        except Exception as e:
            print(f"Pandas CSV read failed: {e}, falling back to manual CSV reading")
    
    # Fallback CSV reading
    file.seek(0)
    content = file.read().decode('utf-8')
    lines = content.strip().split('\n')
    
    if not lines:
        return None
    
    # Parse CSV manually
    csv_reader = csv.DictReader(io.StringIO(content))
    rows = list(csv_reader)
    
    if not rows:
        return None
    
    # Create a simple DataFrame-like object
    class SimpleDataFrame:
        def __init__(self, data):
            self.data = data
            self.columns = list(data[0].keys()) if data else []
        
        def iterrows(self):
            for i, row in enumerate(self.data):
                yield i, row
        
        def empty(self):
            return len(self.data) == 0
        
        def __len__(self):
            return len(self.data)
    
    return SimpleDataFrame(rows)

def read_excel_file(file):
    """Read Excel file with pandas or fallback"""
    if not EXCEL_SUPPORT:
        raise ValueError("Excel files not supported - openpyxl not installed")
    
    if PANDAS_AVAILABLE:
        return pd.read_excel(file)
    else:
        raise ValueError("Excel files require pandas - not available")

def check_value_empty(value):
    """Check if a value is empty (works with pandas and regular values)"""
    if PANDAS_AVAILABLE:
        return pd.isna(value) or str(value).strip() == ''
    else:
        return value is None or value == '' or str(value).strip() == ''

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_required_columns(df, user_type):
    """Validate that required columns are present in the dataframe"""
    if user_type == 'alumni':
        required_columns = ['first_name', 'last_name', 'email', 'graduation_year', 'department']
    else:  # student
        required_columns = ['first_name', 'last_name', 'email', 'enrollment_year', 'expected_graduation_year', 'department']
    
    missing_columns = []
    for col in required_columns:
        if col not in df.columns:
            missing_columns.append(col)
    
    return missing_columns

def clean_and_validate_data(df, user_type):
    """Clean and validate the imported data"""
    errors = []
    cleaned_data = []
    
    for index, row in df.iterrows():
        row_errors = []
        row_data = {}
        
        # Basic required fields
        if check_value_empty(row.get('first_name')):
            row_errors.append('First name is required')
        else:
            row_data['first_name'] = str(row['first_name']).strip()
        
        if check_value_empty(row.get('last_name')):
            row_errors.append('Last name is required')
        else:
            row_data['last_name'] = str(row['last_name']).strip()
        
        # Email validation
        if check_value_empty(row.get('email')):
            row_errors.append('Email is required')
        else:
            email = str(row['email']).strip().lower()
            if '@' not in email:
                row_errors.append('Invalid email format')
            else:
                row_data['email'] = email
        
        # Department
        if check_value_empty(row.get('department')):
            row_errors.append('Department is required')
        else:
            row_data['department'] = str(row['department']).strip()
        
        # Type-specific validations
        if user_type == 'alumni':
            # Graduation year validation
            try:
                grad_year = int(row['graduation_year'])
                if grad_year < 1900 or grad_year > datetime.now().year:
                    row_errors.append('Invalid graduation year')
                else:
                    row_data['graduation_year'] = grad_year
            except (ValueError, TypeError):
                row_errors.append('Graduation year must be a valid number')
            
            # Optional alumni fields
            row_data['graduation_month'] = int(row['graduation_month']) if not check_value_empty(row.get('graduation_month')) else None
            row_data['degree_type'] = str(row['degree_type']).strip() if not check_value_empty(row.get('degree_type')) else None
            row_data['major'] = str(row['major']).strip() if not check_value_empty(row.get('major')) else None
            row_data['minor'] = str(row['minor']).strip() if not check_value_empty(row.get('minor')) else None
            row_data['current_position'] = str(row['current_position']).strip() if not check_value_empty(row.get('current_position')) else None
            row_data['current_company'] = str(row['current_company']).strip() if not check_value_empty(row.get('current_company')) else None
            row_data['location'] = str(row['location']).strip() if not check_value_empty(row.get('location')) else None
            row_data['linkedin_url'] = str(row['linkedin_url']).strip() if not check_value_empty(row.get('linkedin_url')) else None
            row_data['phone'] = str(row['phone']).strip() if not check_value_empty(row.get('phone')) else None
            row_data['bio'] = str(row['bio']).strip() if not check_value_empty(row.get('bio')) else None
            
            # Skills - expect comma-separated string
            if not check_value_empty(row.get('skills')):
                skills_str = str(row['skills']).strip()
                if skills_str:
                    row_data['skills'] = [skill.strip() for skill in skills_str.split(',') if skill.strip()]
                else:
                    row_data['skills'] = []
            else:
                row_data['skills'] = []
        
        else:  # student
            # Enrollment year validation
            try:
                enroll_year = int(row['enrollment_year'])
                if enroll_year < 1900 or enroll_year > datetime.now().year + 1:
                    row_errors.append('Invalid enrollment year')
                else:
                    row_data['enrollment_year'] = enroll_year
            except (ValueError, TypeError):
                row_errors.append('Enrollment year must be a valid number')
            
            # Expected graduation year validation
            try:
                expected_grad_year = int(row['expected_graduation_year'])
                if expected_grad_year < datetime.now().year or expected_grad_year > datetime.now().year + 10:
                    row_errors.append('Invalid expected graduation year')
                else:
                    row_data['expected_graduation_year'] = expected_grad_year
            except (ValueError, TypeError):
                row_errors.append('Expected graduation year must be a valid number')
            
            # Optional student fields
            row_data['student_id'] = str(row['student_id']).strip() if not check_value_empty(row.get('student_id')) else None
            row_data['current_year'] = int(row['current_year']) if not check_value_empty(row.get('current_year')) else None
            row_data['current_semester'] = str(row['current_semester']).strip() if not check_value_empty(row.get('current_semester')) else None
            row_data['major'] = str(row['major']).strip() if not check_value_empty(row.get('major')) else None
            row_data['minor'] = str(row['minor']).strip() if not check_value_empty(row.get('minor')) else None
            row_data['phone'] = str(row['phone']).strip() if not check_value_empty(row.get('phone')) else None
            row_data['address'] = str(row['address']).strip() if not check_value_empty(row.get('address')) else None
            row_data['bio'] = str(row['bio']).strip() if not check_value_empty(row.get('bio')) else None
            
            # Skills and interests - expect comma-separated strings
            if not check_value_empty(row.get('skills')):
                skills_str = str(row['skills']).strip()
                if skills_str:
                    row_data['skills'] = [skill.strip() for skill in skills_str.split(',') if skill.strip()]
                else:
                    row_data['skills'] = []
            else:
                row_data['skills'] = []
            
            if not check_value_empty(row.get('interests')):
                interests_str = str(row['interests']).strip()
                if interests_str:
                    row_data['interests'] = [interest.strip() for interest in interests_str.split(',') if interest.strip()]
                else:
                    row_data['interests'] = []
            else:
                row_data['interests'] = []
            
            if not check_value_empty(row.get('career_interests')):
                career_str = str(row['career_interests']).strip()
                if career_str:
                    row_data['career_interests'] = [interest.strip() for interest in career_str.split(',') if interest.strip()]
                else:
                    row_data['career_interests'] = []
            else:
                row_data['career_interests'] = []
        
        # Add row data and errors
        row_data['row_number'] = index + 2  # +2 because pandas is 0-indexed and we skip header
        row_data['errors'] = row_errors
        
        if row_errors:
            errors.append(row_data)
        else:
            cleaned_data.append(row_data)
    
    return cleaned_data, errors

def process_batch_async(batch_id):
    """Process upload batch asynchronously"""
    try:
        with db.session.begin():
            batch = DataUploadBatch.query.get(batch_id)
            if not batch:
                return
            
            batch.status = 'processing'
            batch.processed_at = datetime.utcnow()
            db.session.commit()
            
            # Read the uploaded data (in production, you'd read from a file)
            # For now, we'll simulate the processing
            
            successful_invites = []
            failed_records = []
            
            # Create invite tokens for valid records
            institution = Institution.query.get(batch.institution_id)
            admin_user = User.query.get(batch.uploaded_by)
            
            # In a real implementation, you'd read the cleaned data from storage
            # For demo purposes, we'll update the batch status
            
            batch.successful_records = batch.total_records
            batch.failed_records = 0
            batch.status = 'completed'
            db.session.commit()
            
    except Exception as e:
        # Update batch status to failed
        batch.status = 'failed'
        batch.error_log = str(e)
        db.session.commit()

@data_import_bp.route('/data-import/upload', methods=['POST'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def upload_data():
    """Upload and process alumni/student data from spreadsheet"""
    current_user = User.query.get(session.get('user_id'))
    
    # Check if file is present
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file provided'}), 400
    
    file = request.files['file']
    user_type = request.form.get('user_type')  # 'alumni' or 'student'
    institution_id = request.form.get('institution_id')
    
    if not file or file.filename == '':
        return jsonify({'success': False, 'message': 'No file selected'}), 400
    
    if not user_type or user_type not in ['alumni', 'student']:
        return jsonify({'success': False, 'message': 'Invalid user type'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'success': False, 'message': 'Invalid file format. Only CSV, Excel files are allowed'}), 400
    
    # Validate institution access
    if current_user.is_institution_admin():
        if not institution_id or int(institution_id) != current_user.institution_id:
            return jsonify({'success': False, 'message': 'Invalid institution access'}), 403
        institution_id = current_user.institution_id
    else:  # Super admin
        if not institution_id:
            return jsonify({'success': False, 'message': 'Institution ID is required'}), 400
        institution_id = int(institution_id)
    
    # Check institution exists and user limits
    institution = Institution.query.get(institution_id)
    if not institution:
        return jsonify({'success': False, 'message': 'Institution not found'}), 404
    
    try:
        # Read file into dataframe
        filename = secure_filename(file.filename)
        
        if filename.endswith('.csv'):
            df = read_csv_file(file)
        else:  # Excel file
            df = read_excel_file(file)
        
        # Basic validation
        if not df or (hasattr(df, 'empty') and df.empty) or len(df) == 0:
            return jsonify({'success': False, 'message': 'File is empty'}), 400
        
        # Check required columns
        missing_columns = validate_required_columns(df, user_type)
        if missing_columns:
            return jsonify({
                'success': False,
                'message': f'Missing required columns: {", ".join(missing_columns)}'
            }), 400
        
        # Check institution user limits
        potential_new_users = len(df)
        if not institution.can_add_users(potential_new_users):
            return jsonify({
                'success': False,
                'message': f'Adding {potential_new_users} users would exceed institution limit of {institution.max_users}'
            }), 400
        
        # Clean and validate data
        cleaned_data, errors = clean_and_validate_data(df, user_type)
        
        if not cleaned_data and errors:
            return jsonify({
                'success': False,
                'message': 'No valid records found in the uploaded file',
                'errors': errors[:10]  # Return first 10 errors
            }), 400
        
        # Create upload batch record
        batch = DataUploadBatch(
            institution_id=institution_id,
            batch_type=user_type,
            filename=filename,
            total_records=len(df),
            uploaded_by=current_user.id
        )
        db.session.add(batch)
        db.session.commit()
        
        # Process valid records - create invite tokens
        successful_invites = []
        failed_invites = []
        
        for record in cleaned_data:
            try:
                # Check if user already exists
                existing_user = User.query.filter_by(email=record['email']).first()
                if existing_user:
                    failed_invites.append({
                        'email': record['email'],
                        'error': 'User with this email already exists'
                    })
                    continue
                
                # Create invite token
                graduation_year = record.get('graduation_year') or record.get('expected_graduation_year')
                student_id = record.get('student_id', record['email'].split('@')[0])
                
                invite_token, raw_token = InviteToken.generate_token(
                    institution_id=institution_id,
                    email=record['email'],
                    user_type=user_type,
                    graduation_year=graduation_year,
                    student_id=student_id,
                    department=record['department'],
                    profile_data=record,
                    created_by=current_user.id,
                    expires_in_days=30
                )
                
                db.session.add(invite_token)
                
                successful_invites.append({
                    'email': record['email'],
                    'token': raw_token,
                    'user_type': user_type
                })
                
            except Exception as e:
                failed_invites.append({
                    'email': record['email'],
                    'error': str(e)
                })
        
        # Commit invite tokens
        db.session.commit()
        
        # Update batch statistics
        batch.successful_records = len(successful_invites)
        batch.failed_records = len(failed_invites) + len(errors)
        batch.processed_records = batch.total_records
        batch.status = 'completed'
        batch.processed_at = datetime.utcnow()
        
        if failed_invites or errors:
            error_log = {
                'data_validation_errors': errors,
                'invite_creation_errors': failed_invites
            }
            batch.error_log = json.dumps(error_log)
        
        db.session.commit()
        
        # Send invitation emails asynchronously
        if successful_invites:
            # In production, you'd use a task queue like Celery
            def send_invites():
                send_bulk_invitations(successful_invites, institution.name)
            
            thread = threading.Thread(target=send_invites)
            thread.daemon = True
            thread.start()
        
        return jsonify({
            'success': True,
            'batch_id': batch.id,
            'summary': {
                'total_records': batch.total_records,
                'successful_records': batch.successful_records,
                'failed_records': batch.failed_records,
                'invitation_emails_sent': len(successful_invites)
            },
            'errors': errors[:10] if errors else [],  # Return first 10 errors for review
            'message': f'Processed {batch.successful_records} records successfully. Invitation emails are being sent.'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'Error processing file: {str(e)}'}), 500

@data_import_bp.route('/data-import/template/<user_type>', methods=['GET'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def download_template(user_type):
    """Download CSV template for data import"""
    if user_type not in ['alumni', 'student']:
        return jsonify({'success': False, 'message': 'Invalid user type'}), 400
    
    if user_type == 'alumni':
        columns = [
            'first_name', 'last_name', 'email', 'graduation_year', 'graduation_month',
            'department', 'degree_type', 'major', 'minor', 'current_position',
            'current_company', 'location', 'linkedin_url', 'phone', 'bio', 'skills'
        ]
        sample_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'graduation_year': '2020',
            'graduation_month': '5',
            'department': 'Computer Science',
            'degree_type': "Bachelor's",
            'major': 'Software Engineering',
            'minor': 'Mathematics',
            'current_position': 'Software Engineer',
            'current_company': 'Tech Corp',
            'location': 'San Francisco, CA',
            'linkedin_url': 'https://linkedin.com/in/johndoe',
            'phone': '+1-555-0123',
            'bio': 'Experienced software engineer with 5+ years in web development',
            'skills': 'Python, JavaScript, React, Node.js'
        }
    else:  # student
        columns = [
            'first_name', 'last_name', 'email', 'student_id', 'enrollment_year',
            'expected_graduation_year', 'current_year', 'current_semester',
            'department', 'major', 'minor', 'phone', 'address', 'bio',
            'skills', 'interests', 'career_interests'
        ]
        sample_data = {
            'first_name': 'Jane',
            'last_name': 'Smith',
            'email': 'jane.smith@student.example.edu',
            'student_id': 'STU12345',
            'enrollment_year': '2022',
            'expected_graduation_year': '2026',
            'current_year': '2',
            'current_semester': 'Fall 2024',
            'department': 'Computer Science',
            'major': 'Computer Science',
            'minor': 'Business',
            'phone': '+1-555-0124',
            'address': '123 Campus Dr, University City, State 12345',
            'bio': 'Second-year computer science student interested in AI and machine learning',
            'skills': 'Python, Java, HTML, CSS',
            'interests': 'Artificial Intelligence, Web Development, Gaming',
            'career_interests': 'Software Development, Data Science, Research'
        }
    
    # Create CSV content
    csv_content = ','.join(columns) + '\n'
    csv_content += ','.join([sample_data.get(col, '') for col in columns]) + '\n'
    
    from flask import Response
    
    return Response(
        csv_content,
        mimetype='text/csv',
        headers={
            'Content-Disposition': f'attachment; filename={user_type}_import_template.csv'
        }
    )

@data_import_bp.route('/data-import/batch/<int:batch_id>', methods=['GET'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def get_batch_status(batch_id):
    """Get status of a data import batch"""
    current_user = User.query.get(session.get('user_id'))
    
    batch = DataUploadBatch.query.get_or_404(batch_id)
    
    # Check permissions
    if (current_user.role == UserRole.INSTITUTION_ADMIN and 
        current_user.institution_id != batch.institution_id):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    return jsonify({
        'success': True,
        'batch': batch.to_dict()
    }), 200

@data_import_bp.route('/data-import/batch/<int:batch_id>/retry', methods=['POST'])
@require_role([UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN])
def retry_batch(batch_id):
    """Retry processing a failed batch"""
    current_user = User.query.get(session.get('user_id'))
    
    batch = DataUploadBatch.query.get_or_404(batch_id)
    
    # Check permissions
    if (current_user.role == UserRole.INSTITUTION_ADMIN and 
        current_user.institution_id != batch.institution_id):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    if batch.status not in ['failed', 'completed']:
        return jsonify({'success': False, 'message': 'Batch cannot be retried'}), 400
    
    # Reset batch status
    batch.status = 'pending'
    batch.processed_at = None
    batch.error_log = None
    db.session.commit()
    
    # Start processing asynchronously
    thread = threading.Thread(target=process_batch_async, args=(batch_id,))
    thread.daemon = True
    thread.start()
    
    return jsonify({
        'success': True,
        'message': 'Batch processing restarted'
    }), 200
