from datetime import datetime, timedelta
import json
from src.models.user import User, db
from src.models.alumni import Alumni
from src.models.event import Event, EventRegistration
from src.models.message import Message, ForumPost
from src.models.job import Job, JobApplication
from src.models.donation import Donation, DonationCampaign

def create_sample_data():
    """Create sample data for the alumni management system"""
    
    # Create sample users
    users_data = [
        {'username': 'john_doe', 'email': 'john.doe@email.com'},
        {'username': 'sarah_johnson', 'email': 'sarah.johnson@email.com'},
        {'username': 'michael_chen', 'email': 'michael.chen@email.com'},
        {'username': 'emily_rodriguez', 'email': 'emily.rodriguez@email.com'},
        {'username': 'david_thompson', 'email': 'david.thompson@email.com'},
        {'username': 'lisa_wang', 'email': 'lisa.wang@email.com'},
        {'username': 'james_wilson', 'email': 'james.wilson@email.com'},
        {'username': 'admin', 'email': 'admin@university.edu'}
    ]
    
    users = []
    for user_data in users_data:
        user = User(username=user_data['username'], email=user_data['email'])
        db.session.add(user)
        users.append(user)
    
    db.session.commit()
    
    # Create sample alumni profiles
    alumni_data = [
        {
            'user_id': users[0].id,
            'first_name': 'John',
            'last_name': 'Doe',
            'graduation_year': 2018,
            'department': 'Computer Science',
            'current_position': 'Software Engineer',
            'current_company': 'Tech Corp',
            'location': 'San Francisco, CA',
            'bio': 'Passionate software engineer with 5+ years of experience.',
            'skills': json.dumps(['Python', 'JavaScript', 'React', 'Node.js']),
            'is_mentor': True
        },
        {
            'user_id': users[1].id,
            'first_name': 'Sarah',
            'last_name': 'Johnson',
            'graduation_year': 2018,
            'department': 'Computer Science',
            'current_position': 'Senior Software Engineer',
            'current_company': 'Google',
            'location': 'San Francisco, CA',
            'bio': 'Senior engineer passionate about AI and machine learning.',
            'skills': json.dumps(['Python', 'Machine Learning', 'TensorFlow', 'AI']),
            'is_mentor': True
        },
        {
            'user_id': users[2].id,
            'first_name': 'Michael',
            'last_name': 'Chen',
            'graduation_year': 2015,
            'department': 'Business Administration',
            'current_position': 'Product Manager',
            'current_company': 'Microsoft',
            'location': 'Seattle, WA',
            'bio': 'Product manager with expertise in enterprise software.',
            'skills': json.dumps(['Product Management', 'Strategy', 'Analytics', 'Leadership']),
            'is_mentor': True
        },
        {
            'user_id': users[3].id,
            'first_name': 'Emily',
            'last_name': 'Rodriguez',
            'graduation_year': 2020,
            'department': 'Marketing',
            'current_position': 'Digital Marketing Manager',
            'current_company': 'Adobe',
            'location': 'Austin, TX',
            'bio': 'Creative marketing professional specializing in digital campaigns.',
            'skills': json.dumps(['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics']),
            'is_mentor': False
        },
        {
            'user_id': users[4].id,
            'first_name': 'David',
            'last_name': 'Thompson',
            'graduation_year': 2012,
            'department': 'Mechanical Engineering',
            'current_position': 'Engineering Director',
            'current_company': 'Tesla',
            'location': 'Palo Alto, CA',
            'bio': 'Engineering leader with expertise in automotive technology.',
            'skills': json.dumps(['Mechanical Engineering', 'Leadership', 'Automotive', 'Innovation']),
            'is_mentor': True
        },
        {
            'user_id': users[5].id,
            'first_name': 'Lisa',
            'last_name': 'Wang',
            'graduation_year': 2019,
            'department': 'Data Science',
            'current_position': 'Data Scientist',
            'current_company': 'Netflix',
            'location': 'Los Gatos, CA',
            'bio': 'Data scientist working on recommendation algorithms.',
            'skills': json.dumps(['Python', 'Machine Learning', 'Statistics', 'SQL']),
            'is_mentor': True
        },
        {
            'user_id': users[6].id,
            'first_name': 'James',
            'last_name': 'Wilson',
            'graduation_year': 2016,
            'department': 'Finance',
            'current_position': 'Investment Analyst',
            'current_company': 'Goldman Sachs',
            'location': 'New York, NY',
            'bio': 'Investment analyst specializing in technology sector.',
            'skills': json.dumps(['Financial Analysis', 'Investment Strategy', 'Risk Management', 'Excel']),
            'is_mentor': False
        }
    ]
    
    for alum_data in alumni_data:
        alumni = Alumni(**alum_data)
        db.session.add(alumni)
    
    db.session.commit()
    
    # Create sample events
    events_data = [
        {
            'title': 'Annual Alumni Reunion 2024',
            'description': 'Join us for our annual reunion celebration with networking, dinner, and entertainment.',
            'event_date': datetime.now() + timedelta(days=30),
            'location': 'University Campus - Main Hall',
            'is_virtual': False,
            'max_attendees': 200,
            'registration_deadline': datetime.now() + timedelta(days=25),
            'organizer_id': users[7].id,
            'event_type': 'reunion'
        },
        {
            'title': 'Tech Industry Networking Night',
            'description': 'Connect with fellow alumni working in the technology industry.',
            'event_date': datetime.now() + timedelta(days=15),
            'location': 'San Francisco - Tech Hub',
            'is_virtual': False,
            'max_attendees': 100,
            'registration_deadline': datetime.now() + timedelta(days=10),
            'organizer_id': users[1].id,
            'event_type': 'networking'
        },
        {
            'title': 'Virtual Career Workshop',
            'description': 'Learn about career advancement strategies and networking tips.',
            'event_date': datetime.now() + timedelta(days=7),
            'location': 'Virtual Event',
            'is_virtual': True,
            'virtual_link': 'https://zoom.us/j/123456789',
            'max_attendees': 50,
            'registration_deadline': datetime.now() + timedelta(days=5),
            'organizer_id': users[7].id,
            'event_type': 'workshop'
        }
    ]
    
    for event_data in events_data:
        event = Event(**event_data)
        db.session.add(event)
    
    db.session.commit()
    
    # Create sample jobs
    jobs_data = [
        {
            'title': 'Senior Software Engineer',
            'company': 'Google',
            'location': 'Mountain View, CA',
            'job_type': 'full-time',
            'salary_min': 150000,
            'salary_max': 200000,
            'description': 'Join our team building next-generation cloud infrastructure.',
            'requirements': 'BS in Computer Science, 5+ years experience, Python/Java expertise',
            'posted_by': users[1].id,
            'application_deadline': datetime.now() + timedelta(days=30),
            'is_remote': False
        },
        {
            'title': 'Product Manager',
            'company': 'Microsoft',
            'location': 'Seattle, WA',
            'job_type': 'full-time',
            'salary_min': 130000,
            'salary_max': 180000,
            'description': 'Lead product strategy for enterprise software solutions.',
            'requirements': 'MBA or equivalent, 3+ years PM experience, technical background',
            'posted_by': users[2].id,
            'application_deadline': datetime.now() + timedelta(days=25),
            'is_remote': True
        },
        {
            'title': 'Data Scientist',
            'company': 'Netflix',
            'location': 'Los Gatos, CA',
            'job_type': 'full-time',
            'salary_min': 140000,
            'salary_max': 190000,
            'description': 'Work on recommendation algorithms and user behavior analysis.',
            'requirements': 'PhD or MS in related field, Python/R expertise, ML experience',
            'posted_by': users[5].id,
            'application_deadline': datetime.now() + timedelta(days=20),
            'is_remote': False
        }
    ]
    
    for job_data in jobs_data:
        job = Job(**job_data)
        db.session.add(job)
    
    db.session.commit()
    
    # Create sample donation campaigns
    campaigns_data = [
        {
            'title': 'Student Scholarship Fund',
            'description': 'Support deserving students with financial assistance for their education.',
            'goal_amount': 100000.0,
            'current_amount': 67500.0,
            'category': 'scholarships',
            'priority': 'high',
            'end_date': datetime.now() + timedelta(days=90)
        },
        {
            'title': 'New Engineering Lab Equipment',
            'description': 'Help modernize our engineering facilities with state-of-the-art equipment.',
            'goal_amount': 250000.0,
            'current_amount': 180000.0,
            'category': 'facilities',
            'priority': 'medium',
            'end_date': datetime.now() + timedelta(days=120)
        },
        {
            'title': 'Alumni Mentorship Program',
            'description': 'Fund the expansion of our mentorship program to reach more students.',
            'goal_amount': 50000.0,
            'current_amount': 32000.0,
            'category': 'programs',
            'priority': 'low',
            'end_date': datetime.now() + timedelta(days=60)
        }
    ]
    
    for campaign_data in campaigns_data:
        campaign = DonationCampaign(**campaign_data)
        db.session.add(campaign)
    
    db.session.commit()
    
    # Create sample forum posts
    forum_posts_data = [
        {
            'author_id': users[1].id,
            'title': 'Career Transition Tips',
            'content': 'I recently made a successful transition from startup to big tech. Happy to share insights!',
            'category': 'career',
            'likes_count': 15,
            'replies_count': 8
        },
        {
            'author_id': users[2].id,
            'title': 'Product Management Resources',
            'content': 'Here are some great resources for aspiring product managers...',
            'category': 'career',
            'likes_count': 12,
            'replies_count': 5
        },
        {
            'author_id': users[3].id,
            'title': 'Marketing Industry Trends',
            'content': 'The digital marketing landscape is evolving rapidly. Let\'s discuss the latest trends.',
            'category': 'industry',
            'likes_count': 8,
            'replies_count': 3
        }
    ]
    
    for post_data in forum_posts_data:
        post = ForumPost(**post_data)
        db.session.add(post)
    
    db.session.commit()
    
    print("Sample data created successfully!")

