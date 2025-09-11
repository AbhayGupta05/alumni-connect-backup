import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import logging
from typing import List, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Email configuration
EMAIL_CONFIG = {
    'smtp_server': os.environ.get('SMTP_SERVER', 'smtp.gmail.com'),
    'smtp_port': int(os.environ.get('SMTP_PORT', '587')),
    'email_address': os.environ.get('EMAIL_ADDRESS'),
    'email_password': os.environ.get('EMAIL_PASSWORD'),
    'use_tls': os.environ.get('EMAIL_USE_TLS', 'true').lower() == 'true',
    'from_name': os.environ.get('EMAIL_FROM_NAME', 'Alumni Platform'),
    'base_url': os.environ.get('BASE_URL', 'http://localhost:5173')
}

class EmailService:
    def __init__(self):
        self.smtp_server = EMAIL_CONFIG['smtp_server']
        self.smtp_port = EMAIL_CONFIG['smtp_port']
        self.email_address = EMAIL_CONFIG['email_address']
        self.email_password = EMAIL_CONFIG['email_password']
        self.use_tls = EMAIL_CONFIG['use_tls']
        self.from_name = EMAIL_CONFIG['from_name']
        self.base_url = EMAIL_CONFIG['base_url']
    
    def _create_connection(self):
        """Create SMTP connection"""
        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            if self.use_tls:
                server.starttls()
            if self.email_address and self.email_password:
                server.login(self.email_address, self.email_password)
            return server
        except Exception as e:
            logger.error(f"Failed to create SMTP connection: {e}")
            return None
    
    def _send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None):
        """Send email with HTML and optional text content"""
        if not self.email_address:
            logger.warning("Email service not configured - EMAIL_ADDRESS not set")
            return False
        
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['From'] = f"{self.from_name} <{self.email_address}>"
            msg['To'] = to_email
            msg['Subject'] = subject
            
            # Add text version if provided
            if text_content:
                text_part = MIMEText(text_content, 'plain')
                msg.attach(text_part)
            
            # Add HTML version
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            # Send email
            server = self._create_connection()
            if not server:
                return False
            
            server.send_message(msg)
            server.quit()
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {e}")
            return False
    
    def send_admin_credentials_email(self, email: str, institution_name: str, username: str, password: str, is_reset: bool = False):
        """Send admin credentials email"""
        subject = f"{'Password Reset' if is_reset else 'Admin Account'} - {institution_name} Alumni Platform"
        
        action = "reset" if is_reset else "created"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }}
                .credentials {{ background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb; }}
                .button {{ display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }}
                .warning {{ background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Admin Account {action.title()}</h1>
                    <p>{institution_name} Alumni Platform</p>
                </div>
                <div class="content">
                    <h2>Hello Administrator,</h2>
                    <p>Your admin account has been {'reset' if is_reset else 'created'} for the {institution_name} Alumni Platform.</p>
                    
                    <div class="credentials">
                        <h3>Login Credentials:</h3>
                        <p><strong>Login URL:</strong> <a href="{self.base_url}/login">{self.base_url}/login</a></p>
                        <p><strong>Username:</strong> {username}</p>
                        <p><strong>Temporary Password:</strong> <code>{password}</code></p>
                    </div>
                    
                    <div class="warning">
                        <p><strong>Important Security Notice:</strong></p>
                        <ul>
                            <li>You must change this password on your first login</li>
                            <li>This email contains sensitive information - please delete it after use</li>
                            <li>If you didn't request this {'reset' if is_reset else 'account'}, contact support immediately</li>
                        </ul>
                    </div>
                    
                    <a href="{self.base_url}/login" class="button">Login to Admin Panel</a>
                    
                    <p>Best regards,<br>Alumni Platform Team</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Admin Account {'Reset' if is_reset else 'Created'} - {institution_name} Alumni Platform
        
        Hello Administrator,
        
        Your admin account has been {'reset' if is_reset else 'created'} for the {institution_name} Alumni Platform.
        
        Login Credentials:
        - Login URL: {self.base_url}/login
        - Username: {username}
        - Temporary Password: {password}
        
        IMPORTANT SECURITY NOTICE:
        - You must change this password on your first login
        - This email contains sensitive information - please delete it after use
        - If you didn't request this {'reset' if is_reset else 'account'}, contact support immediately
        
        Best regards,
        Alumni Platform Team
        """
        
        return self._send_email(email, subject, html_content, text_content)
    
    def send_invite_email(self, email: str, user_type: str, institution_name: str, invite_token: str):
        """Send account invitation email"""
        subject = f"Account Invitation - {institution_name} Alumni Platform"
        user_type_display = "Alumni" if user_type == "alumni" else "Student"
        
        invite_url = f"{self.base_url}/create-account?token={invite_token}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }}
                .button {{ display: inline-block; padding: 15px 30px; background: #059669; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }}
                .features {{ background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }}
                .feature-list {{ list-style-type: none; padding: 0; }}
                .feature-list li {{ padding: 8px 0; }}
                .feature-list li:before {{ content: "✓ "; color: #059669; font-weight: bold; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎓 You're Invited!</h1>
                    <p>Join the {institution_name} Alumni Platform</p>
                </div>
                <div class="content">
                    <h2>Hello {user_type_display},</h2>
                    <p>You have been invited to join the {institution_name} Alumni Platform! This exclusive network connects {user_type_display.lower()}s with their university community.</p>
                    
                    <div class="features">
                        <h3>What you can do:</h3>
                        <ul class="feature-list">
                            <li>Connect with fellow alumni and students</li>
                            <li>Access career opportunities and job postings</li>
                            <li>Join events, reunions, and networking sessions</li>
                            <li>Participate in mentorship programs</li>
                            <li>Share your professional journey</li>
                            <li>Stay updated with university news</li>
                        </ul>
                    </div>
                    
                    <p>To create your account, simply click the button below and follow the verification process:</p>
                    
                    <a href="{invite_url}" class="button">Create My Account</a>
                    
                    <p><small>This invitation link will expire in 30 days. If you have any questions, please contact your institution's administration.</small></p>
                    
                    <p>Welcome to the community!<br>Alumni Platform Team</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        You're Invited! - {institution_name} Alumni Platform
        
        Hello {user_type_display},
        
        You have been invited to join the {institution_name} Alumni Platform! This exclusive network connects {user_type_display.lower()}s with their university community.
        
        What you can do:
        ✓ Connect with fellow alumni and students
        ✓ Access career opportunities and job postings
        ✓ Join events, reunions, and networking sessions
        ✓ Participate in mentorship programs
        ✓ Share your professional journey
        ✓ Stay updated with university news
        
        To create your account, visit: {invite_url}
        
        This invitation link will expire in 30 days. If you have any questions, please contact your institution's administration.
        
        Welcome to the community!
        Alumni Platform Team
        """
        
        return self._send_email(email, subject, html_content, text_content)
    
    def send_verification_code_email(self, email: str, code: str):
        """Send email verification code"""
        subject = "Email Verification Code - Alumni Platform"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; text-align: center; }}
                .code {{ font-size: 32px; font-weight: bold; color: #7c3aed; background: white; padding: 20px; margin: 20px 0; border-radius: 8px; letter-spacing: 8px; }}
                .expires {{ color: #dc2626; font-weight: bold; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📧 Email Verification</h1>
                    <p>Alumni Platform</p>
                </div>
                <div class="content">
                    <h2>Verify Your Email Address</h2>
                    <p>Enter the following verification code to confirm your email address:</p>
                    
                    <div class="code">{code}</div>
                    
                    <p class="expires">This code will expire in 15 minutes.</p>
                    
                    <p>If you didn't request this verification code, please ignore this email.</p>
                    
                    <p>Best regards,<br>Alumni Platform Team</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Email Verification Code - Alumni Platform
        
        Verify Your Email Address
        
        Enter the following verification code to confirm your email address:
        
        {code}
        
        This code will expire in 15 minutes.
        
        If you didn't request this verification code, please ignore this email.
        
        Best regards,
        Alumni Platform Team
        """
        
        return self._send_email(email, subject, html_content, text_content)
    
    def send_bulk_invitations(self, invitations: List[dict], institution_name: str):
        """Send bulk invitation emails"""
        successful = 0
        failed = 0
        
        for invitation in invitations:
            try:
                success = self.send_invite_email(
                    invitation['email'],
                    invitation['user_type'],
                    institution_name,
                    invitation['token']
                )
                if success:
                    successful += 1
                else:
                    failed += 1
            except Exception as e:
                logger.error(f"Failed to send invitation to {invitation['email']}: {e}")
                failed += 1
        
        return {'successful': successful, 'failed': failed}
    
    def send_password_reset_email(self, email: str, reset_token: str):
        """Send password reset email"""
        subject = "Password Reset Request - Alumni Platform"
        reset_url = f"{self.base_url}/reset-password?token={reset_token}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }}
                .button {{ display: inline-block; padding: 15px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }}
                .warning {{ background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔒 Password Reset</h1>
                    <p>Alumni Platform</p>
                </div>
                <div class="content">
                    <h2>Reset Your Password</h2>
                    <p>We received a request to reset the password for your account. Click the button below to create a new password:</p>
                    
                    <a href="{reset_url}" class="button">Reset My Password</a>
                    
                    <div class="warning">
                        <p><strong>Security Notice:</strong></p>
                        <ul>
                            <li>This link will expire in 1 hour</li>
                            <li>If you didn't request this reset, please ignore this email</li>
                            <li>For security, this link can only be used once</li>
                        </ul>
                    </div>
                    
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p><a href="{reset_url}">{reset_url}</a></p>
                    
                    <p>Best regards,<br>Alumni Platform Team</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self._send_email(email, subject, html_content)

# Initialize global email service
email_service = EmailService()

# Convenience functions
def send_admin_credentials_email(email: str, institution_name: str, username: str, password: str, is_reset: bool = False):
    return email_service.send_admin_credentials_email(email, institution_name, username, password, is_reset)

def send_invite_email(email: str, user_type: str, institution_name: str, invite_token: str):
    return email_service.send_invite_email(email, user_type, institution_name, invite_token)

def send_verification_code_email(email: str, code: str):
    return email_service.send_verification_code_email(email, code)

def send_bulk_invitations(invitations: List[dict], institution_name: str):
    return email_service.send_bulk_invitations(invitations, institution_name)

def send_password_reset_email(email: str, reset_token: str):
    return email_service.send_password_reset_email(email, reset_token)
