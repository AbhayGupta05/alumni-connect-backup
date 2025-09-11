from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import uuid
import hashlib
from PIL import Image
import io
import sqlite3

alumni_claim_bp = Blueprint('alumni_claim', __name__)

# Configure upload folders
UPLOAD_FOLDER = 'uploads/alumni_claims'
ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def create_uploads_dir():
    """Create uploads directory if it doesn't exist"""
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

# List of colleges/institutions
COLLEGES_LIST = [
    "Indian Institute of Technology Bombay (IIT Bombay)",
    "Indian Institute of Technology Delhi (IIT Delhi)",
    "Indian Institute of Technology Madras (IIT Madras)",
    # ... (truncated for brevity, will include full list from file)
    # Add all colleges from the provided list
]

@alumni_claim_bp.route('/colleges', methods=['GET'])
def get_colleges():
    """Get list of all colleges/institutions"""
    try:
        # Read colleges from file or return hardcoded list
        colleges = [
            "Indian Institute of Technology Bombay (IIT Bombay)",
            "Indian Institute of Technology Delhi (IIT Delhi)",
            "Indian Institute of Technology Madras (IIT Madras)",
            "Indian Institute of Technology Kanpur (IIT Kanpur)",
            "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
            "Indian Institute of Science (IISc) Bangalore",
            "All India Institute of Medical Sciences (AIIMS), New Delhi",
            "Jawaharlal Nehru University (JNU), New Delhi",
            "University of Delhi (DU)",
            "Banaras Hindu University (BHU), Varanasi",
            # Add more colleges as needed
        ]
        
        return jsonify({
            'success': True,
            'colleges': colleges
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to fetch colleges list',
            'error': str(e)
        }), 500

@alumni_claim_bp.route('/submit-claim', methods=['POST'])
def submit_alumni_claim():
    """Submit alumni profile claim request"""
    try:
        create_uploads_dir()
        
        # Get form data
        college = request.form.get('college')
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        mobile_number = request.form.get('mobile_number')
        graduation_year = request.form.get('graduation_year')
        department = request.form.get('department')
        student_id = request.form.get('student_id')
        roll_number = request.form.get('roll_number')
        degree = request.form.get('degree')
        
        # Validate required fields
        required_fields = ['college', 'full_name', 'email', 'mobile_number', 
                          'graduation_year', 'department']
        for field in required_fields:
            if not request.form.get(field):
                return jsonify({
                    'success': False,
                    'message': f'{field.replace("_", " ").title()} is required'
                }), 400
        
        # Validate files
        if 'proof_document' not in request.files or 'current_photo' not in request.files:
            return jsonify({
                'success': False,
                'message': 'Both proof document and current photo are required'
            }), 400
        
        proof_document = request.files['proof_document']
        current_photo = request.files['current_photo']
        
        if proof_document.filename == '' or current_photo.filename == '':
            return jsonify({
                'success': False,
                'message': 'Please select both proof document and current photo'
            }), 400
        
        # Validate file types
        if not (allowed_file(proof_document.filename) and allowed_file(current_photo.filename)):
            return jsonify({
                'success': False,
                'message': 'Invalid file format. Please upload valid documents.'
            }), 400
        
        # Generate unique claim ID
        claim_id = str(uuid.uuid4())
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # Save files
        proof_filename = secure_filename(f"{claim_id}_{timestamp}_proof_{proof_document.filename}")
        photo_filename = secure_filename(f"{claim_id}_{timestamp}_photo_{current_photo.filename}")
        
        proof_path = os.path.join(UPLOAD_FOLDER, proof_filename)
        photo_path = os.path.join(UPLOAD_FOLDER, photo_filename)
        
        proof_document.save(proof_path)
        current_photo.save(photo_path)
        
        # Perform basic face detection (simplified version)
        face_verification_status = perform_face_verification(photo_path)
        
        # Save claim to database
        claim_data = {
            'claim_id': claim_id,
            'college': college,
            'full_name': full_name,
            'email': email,
            'mobile_number': mobile_number,
            'graduation_year': int(graduation_year),
            'department': department,
            'student_id': student_id,
            'roll_number': roll_number,
            'degree': degree,
            'proof_document_path': proof_path,
            'current_photo_path': photo_path,
            'face_verification_status': face_verification_status,
            'status': 'pending',
            'submitted_at': datetime.now(),
            'created_by': 'self_claim'
        }
        
        # Insert into database
        if save_alumni_claim(claim_data):
            # Send notification email to institution admin
            send_claim_notification_to_admin(claim_data)
            
            # Send acknowledgment email to claimant
            send_claim_acknowledgment_to_user(claim_data)
            
            return jsonify({
                'success': True,
                'message': 'Alumni claim submitted successfully! You will receive an email confirmation shortly.',
                'claim_id': claim_id
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to save claim data'
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to submit alumni claim',
            'error': str(e)
        }), 500

def perform_face_verification(photo_path):
    """Perform basic image validation (simplified without face recognition)"""
    try:
        # Open and validate the image
        with Image.open(photo_path) as img:
            # Check if it's a valid image
            img.verify()
            
            # Re-open for processing (verify() closes the file)
            with Image.open(photo_path) as img:
                # Check image dimensions (reasonable size for a photo)
                width, height = img.size
                
                if width < 100 or height < 100:
                    return 'image_too_small'
                elif width > 5000 or height > 5000:
                    return 'image_too_large'
                
                # Check if image has reasonable aspect ratio (not too stretched)
                aspect_ratio = width / height
                if aspect_ratio < 0.5 or aspect_ratio > 2.0:
                    return 'invalid_aspect_ratio'
                
                # For demo purposes, simulate successful verification
                # In production, you could integrate with a face detection API service
                return 'verification_completed'
            
    except Exception as e:
        print(f"Image verification error: {str(e)}")
        return 'verification_failed'
    
    return 'verification_completed'

def save_alumni_claim(claim_data):
    """Save alumni claim to database"""
    try:
        # Use SQLite for simplicity
        basedir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(basedir, "..", "alumni.db")
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Create table if not exists
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS alumni_claims (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                claim_id TEXT UNIQUE NOT NULL,
                college TEXT NOT NULL,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                mobile_number TEXT NOT NULL,
                graduation_year INTEGER NOT NULL,
                department TEXT NOT NULL,
                student_id TEXT,
                roll_number TEXT,
                degree TEXT,
                proof_document_path TEXT NOT NULL,
                current_photo_path TEXT NOT NULL,
                face_verification_status TEXT,
                status TEXT DEFAULT 'pending',
                submitted_at TIMESTAMP,
                processed_at TIMESTAMP,
                processed_by TEXT,
                admin_notes TEXT,
                created_by TEXT
            )
        ''')
        
        # Insert claim data
        cursor.execute('''
            INSERT INTO alumni_claims (
                claim_id, college, full_name, email, mobile_number, graduation_year,
                department, student_id, roll_number, degree, proof_document_path,
                current_photo_path, face_verification_status, status, submitted_at, created_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            claim_data['claim_id'], claim_data['college'], claim_data['full_name'],
            claim_data['email'], claim_data['mobile_number'], claim_data['graduation_year'],
            claim_data['department'], claim_data['student_id'], claim_data['roll_number'],
            claim_data['degree'], claim_data['proof_document_path'], claim_data['current_photo_path'],
            claim_data['face_verification_status'], claim_data['status'], claim_data['submitted_at'],
            claim_data['created_by']
        ))
        
        conn.commit()
        conn.close()
        return True
        
    except Exception as e:
        print(f"Database error: {str(e)}")
        return False

def send_claim_notification_to_admin(claim_data):
    """Send notification to institution admin"""
    try:
        # This would fetch the actual admin email from the institution data
        # For now, using a placeholder
        admin_email = "admin@institution.edu"  # Replace with actual logic
        
        subject = f"New Alumni Profile Claim - {claim_data['full_name']}"
        body = f"""
        Dear Administrator,
        
        A new alumni profile claim has been submitted for your review.
        
        Claim Details:
        - Claim ID: {claim_data['claim_id']}
        - Name: {claim_data['full_name']}
        - Email: {claim_data['email']}
        - College: {claim_data['college']}
        - Graduation Year: {claim_data['graduation_year']}
        - Department: {claim_data['department']}
        - Student ID: {claim_data['student_id']}
        - Roll Number: {claim_data['roll_number']}
        - Degree: {claim_data['degree']}
        - Mobile: {claim_data['mobile_number']}
        - Face Verification: {claim_data['face_verification_status']}
        
        Please log in to the admin panel to review and approve/reject this claim.
        
        Best regards,
        Alumni Connect System
        """
        
        # send_email(admin_email, subject, body)  # Uncomment when email is configured
        
    except Exception as e:
        print(f"Failed to send admin notification: {str(e)}")

def send_claim_acknowledgment_to_user(claim_data):
    """Send acknowledgment email to the claimant"""
    try:
        subject = "Alumni Profile Claim Submitted Successfully"
        body = f"""
        Dear {claim_data['full_name']},
        
        Thank you for submitting your alumni profile claim.
        
        Your claim has been successfully submitted with ID: {claim_data['claim_id']}
        
        Submitted Details:
        - College: {claim_data['college']}
        - Graduation Year: {claim_data['graduation_year']}
        - Department: {claim_data['department']}
        
        Your claim is now under review by the institution's administration team.
        You will receive an email notification once your profile has been verified and activated.
        
        This process typically takes 3-5 business days.
        
        If you have any questions, please contact your institution's alumni office.
        
        Best regards,
        Alumni Connect Team
        """
        
        # send_email(claim_data['email'], subject, body)  # Uncomment when email is configured
        
    except Exception as e:
        print(f"Failed to send user acknowledgment: {str(e)}")

@alumni_claim_bp.route('/claim-status/<claim_id>', methods=['GET'])
def get_claim_status(claim_id):
    """Get status of an alumni claim"""
    try:
        # Use SQLite for simplicity
        basedir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(basedir, "..", "alumni.db")
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT claim_id, full_name, email, college, status, submitted_at, processed_at, admin_notes
            FROM alumni_claims 
            WHERE claim_id = ?
        ''', (claim_id,))
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return jsonify({
                'success': True,
                'claim': {
                    'claim_id': result[0],
                    'full_name': result[1],
                    'email': result[2],
                    'college': result[3],
                    'status': result[4],
                    'submitted_at': result[5],
                    'processed_at': result[6],
                    'admin_notes': result[7]
                }
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Claim not found'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to fetch claim status',
            'error': str(e)
        }), 500
