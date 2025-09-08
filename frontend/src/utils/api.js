// API utility for communicating with the Flask backend
const API_BASE_URL = '/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for session management
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email, password, userType = 'alumni') {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password, user_type: userType },
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  // Alumni endpoints
  async getAlumni(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/alumni?${params}`);
  }

  async getAlumniProfile(alumniId) {
    return this.request(`/alumni/${alumniId}`);
  }

  async updateAlumniProfile(alumniId, profileData) {
    return this.request(`/alumni/${alumniId}`, {
      method: 'PUT',
      body: profileData,
    });
  }

  async searchAlumni(searchData) {
    return this.request('/alumni/search', {
      method: 'POST',
      body: searchData,
    });
  }

  async getAlumniStats() {
    return this.request('/alumni/stats');
  }

  // Events endpoints
  async getEvents(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/events?${params}`);
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: eventData,
    });
  }

  async registerForEvent(eventId) {
    return this.request(`/events/${eventId}/register`, {
      method: 'POST',
    });
  }

  async unregisterFromEvent(eventId) {
    return this.request(`/events/${eventId}/unregister`, {
      method: 'DELETE',
    });
  }

  async getMyEvents() {
    return this.request('/my-events');
  }

  // Messages endpoints
  async getMessages() {
    return this.request('/messages');
  }

  async getConversation(otherUserId) {
    return this.request(`/messages/conversation/${otherUserId}`);
  }

  async sendMessage(messageData) {
    return this.request('/messages', {
      method: 'POST',
      body: messageData,
    });
  }

  async markMessageRead(messageId) {
    return this.request(`/messages/${messageId}/read`, {
      method: 'PUT',
    });
  }

  async getUnreadCount() {
    return this.request('/unread-count');
  }

  // Forum endpoints
  async getForumPosts(category = 'all') {
    return this.request(`/forum/posts?category=${category}`);
  }

  async createForumPost(postData) {
    return this.request('/forum/posts', {
      method: 'POST',
      body: postData,
    });
  }

  async likeForumPost(postId) {
    return this.request(`/forum/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  // Jobs endpoints
  async getJobs(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/jobs?${params}`);
  }

  async getJob(jobId) {
    return this.request(`/jobs/${jobId}`);
  }

  async createJob(jobData) {
    return this.request('/jobs', {
      method: 'POST',
      body: jobData,
    });
  }

  async applyForJob(jobId, applicationData) {
    return this.request(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: applicationData,
    });
  }

  async getMyJobs() {
    return this.request('/my-jobs');
  }

  // Donations endpoints
  async getCampaigns(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/campaigns?${params}`);
  }

  async getCampaign(campaignId) {
    return this.request(`/campaigns/${campaignId}`);
  }

  async makeDonation(donationData) {
    return this.request('/donate', {
      method: 'POST',
      body: donationData,
    });
  }

  async getMyDonations() {
    return this.request('/my-donations');
  }

  async getDonationStats() {
    return this.request('/stats');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;

