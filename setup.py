#!/usr/bin/env python3
"""
Alumni Platform Setup Script

This script helps you set up the backend for the first time.
"""

import os
import sys
import secrets
import shutil

def generate_secret_key():
    """Generate a secure secret key"""
    return secrets.token_urlsafe(32)

def create_env_file():
    """Create .env file from template"""
    template_path = ".env.template"
    env_path = ".env"
    
    if os.path.exists(env_path):
        print("⚠️  .env file already exists. Backing up as .env.backup")
        shutil.copy(env_path, ".env.backup")
    
    if not os.path.exists(template_path):
        print("❌ .env.template not found!")
        return False
    
    # Read template
    with open(template_path, 'r') as f:
        content = f.read()
    
    # Replace placeholders
    secret_key = generate_secret_key()
    content = content.replace('your-super-secret-key-change-in-production', secret_key)
    
    # Get user input for basic settings
    print("\n🔧 Basic Configuration:")
    print("Please provide the following information (press Enter for defaults):")
    
    admin_email = input("Super Admin Email [admin@yourplatform.com]: ").strip()
    if not admin_email:
        admin_email = "admin@yourplatform.com"
    
    admin_password = input("Super Admin Password [auto-generate]: ").strip()
    if not admin_password:
        admin_password = generate_secret_key()[:16]  # First 16 chars for readability
    
    email_address = input("SMTP Email Address [leave empty to skip]: ").strip()
    email_password = input("SMTP Email Password [leave empty to skip]: ").strip()
    
    # Update content with user input
    content = content.replace('admin@yourplatform.com', admin_email)
    content = content.replace('your-secure-admin-password', admin_password)
    
    if email_address:
        content = content.replace('your-email@gmail.com', email_address)
    
    if email_password:
        content = content.replace('your-app-password', email_password)
    
    # Write .env file
    with open(env_path, 'w') as f:
        f.write(content)
    
    print(f"\n✅ .env file created successfully!")
    print(f"📧 Super Admin Email: {admin_email}")
    print(f"🔐 Super Admin Password: {admin_password}")
    print(f"🔑 Secret Key: Generated automatically")
    
    if not email_address:
        print("\n⚠️  Email not configured. Email invitations will not work.")
        print("   You can update EMAIL_ADDRESS and EMAIL_PASSWORD in .env later.")
    
    return True

def check_dependencies():
    """Check if all required packages are installed"""
    print("🔍 Checking dependencies...")
    
    required_packages = [
        'flask',
        'flask_cors',
        'flask_sqlalchemy',
        'flask_socketio',
        'sqlalchemy',
        'pandas',
        'openpyxl'
    ]
    
    missing = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"  ✅ {package}")
        except ImportError:
            print(f"  ❌ {package} - MISSING")
            missing.append(package)
    
    if missing:
        print(f"\n❌ Missing packages: {', '.join(missing)}")
        print("Run the installation script first: install-requirements.bat")
        return False
    
    print("✅ All dependencies installed!")
    return True

def main():
    print("🎓 Alumni Platform Setup")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists("api"):
        print("❌ Please run this script from the project root directory")
        print("   (the directory containing the 'api' folder)")
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Create .env file
    if not create_env_file():
        sys.exit(1)
    
    print("\n🚀 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Review and update .env file if needed")
    print("2. Start the backend server:")
    print("   cd api")
    print("   python -m flask --app src.index run --debug --host=0.0.0.0 --port=5000")
    print("3. The database and super admin user will be created automatically")
    print("4. Access the API at http://localhost:5000")
    
    print(f"\n🔐 Your super admin credentials:")
    print(f"   Email: Check the .env file")
    print(f"   Password: Check the .env file")

if __name__ == "__main__":
    main()
