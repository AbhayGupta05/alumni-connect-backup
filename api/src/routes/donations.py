from flask import Blueprint, jsonify, request, session
from datetime import datetime
from src.models.donation import Donation, DonationCampaign, db
from src.models.user import User
from src.models.alumni import Alumni

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/campaigns', methods=['GET'])
def get_campaigns():
    category = request.args.get('category')
    status = request.args.get('status', 'active')
    
    query = DonationCampaign.query
    
    if category and category != 'all':
        query = query.filter(DonationCampaign.category == category)
    
    if status != 'all':
        query = query.filter(DonationCampaign.status == status)
    
    campaigns = query.order_by(DonationCampaign.priority.desc(), DonationCampaign.created_at.desc()).all()
    
    # Add donor count for each campaign
    campaigns_data = []
    for campaign in campaigns:
        campaign_data = campaign.to_dict()
        
        donor_count = Donation.query.filter_by(
            campaign_id=campaign.id,
            status='completed'
        ).count()
        
        campaign_data['donor_count'] = donor_count
        campaigns_data.append(campaign_data)
    
    return jsonify({
        'success': True,
        'campaigns': campaigns_data,
        'total': len(campaigns_data)
    }), 200

@donations_bp.route('/campaigns', methods=['POST'])
def create_campaign():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    # Only admins can create campaigns
    if session.get('user_type') != 'admin':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    
    data = request.json
    
    campaign = DonationCampaign(
        title=data['title'],
        description=data.get('description'),
        goal_amount=float(data['goal_amount']),
        category=data.get('category', 'general'),
        priority=data.get('priority', 'medium'),
        end_date=datetime.fromisoformat(data['end_date'].replace('Z', '+00:00')) if data.get('end_date') else None
    )
    
    db.session.add(campaign)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'campaign': campaign.to_dict(),
        'message': 'Campaign created successfully'
    }), 201

@donations_bp.route('/campaigns/<int:campaign_id>', methods=['GET'])
def get_campaign(campaign_id):
    campaign = DonationCampaign.query.get_or_404(campaign_id)
    
    campaign_data = campaign.to_dict()
    
    # Get recent donations
    recent_donations = Donation.query.filter_by(
        campaign_id=campaign_id,
        status='completed'
    ).order_by(Donation.donated_at.desc()).limit(10).all()
    
    donations_data = []
    for donation in recent_donations:
        donation_data = donation.to_dict()
        
        if not donation.is_anonymous:
            donor = User.query.get(donation.donor_id)
            alumni = Alumni.query.filter_by(user_id=donation.donor_id).first()
            
            donation_data['donor'] = donor.to_dict() if donor else None
            donation_data['donor_alumni'] = alumni.to_dict() if alumni else None
        
        donations_data.append(donation_data)
    
    campaign_data['recent_donations'] = donations_data
    
    # Get donor count
    donor_count = Donation.query.filter_by(
        campaign_id=campaign_id,
        status='completed'
    ).count()
    
    campaign_data['donor_count'] = donor_count
    
    return jsonify({
        'success': True,
        'campaign': campaign_data
    }), 200

@donations_bp.route('/donate', methods=['POST'])
def make_donation():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.json
    
    donation = Donation(
        donor_id=user_id,
        campaign_id=data.get('campaign_id'),
        amount=float(data['amount']),
        message=data.get('message'),
        is_anonymous=data.get('is_anonymous', False),
        payment_method=data.get('payment_method', 'credit_card'),
        transaction_id=f"txn_{user_id}_{int(datetime.utcnow().timestamp())}"
    )
    
    db.session.add(donation)
    
    # Update campaign current amount if campaign specified
    if donation.campaign_id:
        campaign = DonationCampaign.query.get(donation.campaign_id)
        if campaign:
            campaign.current_amount += donation.amount
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'donation': donation.to_dict(),
        'message': 'Donation successful'
    }), 201

@donations_bp.route('/my-donations', methods=['GET'])
def get_my_donations():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    donations = Donation.query.filter_by(donor_id=user_id).order_by(Donation.donated_at.desc()).all()
    
    donations_data = []
    for donation in donations:
        donation_data = donation.to_dict()
        
        # Add campaign info
        if donation.campaign_id:
            campaign = DonationCampaign.query.get(donation.campaign_id)
            donation_data['campaign'] = campaign.to_dict() if campaign else None
        
        donations_data.append(donation_data)
    
    # Calculate total donated
    total_donated = sum(d.amount for d in donations if d.status == 'completed')
    
    return jsonify({
        'success': True,
        'donations': donations_data,
        'total_donated': total_donated,
        'donation_count': len(donations)
    }), 200

@donations_bp.route('/stats', methods=['GET'])
def get_donation_stats():
    # Total donations
    total_donations = db.session.query(db.func.sum(Donation.amount)).filter_by(status='completed').scalar() or 0
    
    # Total donors
    total_donors = db.session.query(db.func.count(db.func.distinct(Donation.donor_id))).filter_by(status='completed').scalar() or 0
    
    # Active campaigns
    active_campaigns = DonationCampaign.query.filter_by(status='active').count()
    
    # Recent donations
    recent_donations = Donation.query.filter_by(status='completed').order_by(Donation.donated_at.desc()).limit(5).all()
    
    recent_donations_data = []
    for donation in recent_donations:
        donation_data = donation.to_dict()
        
        if not donation.is_anonymous:
            donor = User.query.get(donation.donor_id)
            alumni = Alumni.query.filter_by(user_id=donation.donor_id).first()
            
            donation_data['donor'] = donor.to_dict() if donor else None
            donation_data['donor_alumni'] = alumni.to_dict() if alumni else None
        
        # Add campaign info
        if donation.campaign_id:
            campaign = DonationCampaign.query.get(donation.campaign_id)
            donation_data['campaign'] = campaign.to_dict() if campaign else None
        
        recent_donations_data.append(donation_data)
    
    return jsonify({
        'success': True,
        'stats': {
            'total_donations': total_donations,
            'total_donors': total_donors,
            'active_campaigns': active_campaigns,
            'recent_donations': recent_donations_data
        }
    }), 200

