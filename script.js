// SkillSwap Application Logic
class SkillSwapApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'landing';
        this.selectedTeachSkills = [];
        this.selectedLearnSkills = [];
        this.selectedTeachCategory = '';
        this.selectedLearnCategory = '';
        this.currentBooking = null;
        
        // Mock data
        this.skillsData = {
            technology: ['JavaScript', 'Python', 'React', 'Node.js', 'AI/ML', 'Cloud Computing', 'Mobile Development', 'DevOps'],
            design: ['UI/UX Design', 'Graphic Design', 'Figma', 'Adobe Creative Suite', 'Web Design', 'Brand Design', 'Illustration'],
            business: ['Project Management', 'Business Strategy', 'Leadership', 'Entrepreneurship', 'Finance', 'Operations'],
            marketing: ['Digital Marketing', 'SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'Analytics'],
            communication: ['Public Speaking', 'Writing', 'Negotiation', 'Sales', 'Presentation Skills', 'Storytelling']
        };

        this.mockUsers = [
            {
                id: 1,
                name: 'Sarah Chen',
                email: 'sarah@example.com',
                avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
                skills: ['React', 'JavaScript', 'UI/UX Design'],
                category: 'technology',
                rating: 4.9,
                experience: '5+ years',
                bio: 'Full-stack developer passionate about creating beautiful user experiences.',
                hourlyRate: 50
            },
            {
                id: 2,
                name: 'Marcus Johnson',
                email: 'marcus@example.com',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
                skills: ['Python', 'AI/ML', 'Data Science'],
                category: 'technology',
                rating: 4.8,
                experience: '7+ years',
                bio: 'AI researcher and data scientist helping others unlock the power of machine learning.',
                hourlyRate: 60
            },
            {
                id: 3,
                name: 'Emma Rodriguez',
                email: 'emma@example.com',
                avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
                skills: ['Graphic Design', 'Brand Design', 'Adobe Creative Suite'],
                category: 'design',
                rating: 4.9,
                experience: '4+ years',
                bio: 'Creative designer specializing in brand identity and visual storytelling.',
                hourlyRate: 45
            },
            {
                id: 4,
                name: 'David Kim',
                email: 'david@example.com',
                avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
                skills: ['Digital Marketing', 'SEO', 'Content Marketing'],
                category: 'marketing',
                rating: 4.7,
                experience: '6+ years',
                bio: 'Marketing strategist helping businesses grow their online presence.',
                hourlyRate: 55
            },
            {
                id: 5,
                name: 'Lisa Wang',
                email: 'lisa@example.com',
                avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
                skills: ['Public Speaking', 'Leadership', 'Presentation Skills'],
                category: 'communication',
                rating: 4.8,
                experience: '8+ years',
                bio: 'Executive coach and public speaking expert empowering professionals.',
                hourlyRate: 70
            },
            {
                id: 6,
                name: 'Alex Thompson',
                email: 'alex@example.com',
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
                skills: ['Node.js', 'Cloud Computing', 'DevOps'],
                category: 'technology',
                rating: 4.6,
                experience: '5+ years',
                bio: 'Backend engineer specializing in scalable cloud architectures.',
                hourlyRate: 65
            }
        ];

        this.userSessions = [];
        this.userStats = {
            coinsEarned: 0,
            coinsSpent: 0,
            sessionsTaught: 0,
            sessionsLearned: 0,
            rating: 5.0
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.showPage('landing');
    }

    setupEventListeners() {
        // Auth forms
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('booking-form').addEventListener('submit', (e) => this.handleBooking(e));

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => this.handleSearch(e));

        // Filters
        document.getElementById('category-filter').addEventListener('change', (e) => this.handleCategoryFilter(e));
        document.getElementById('skill-filter').addEventListener('change', (e) => this.handleSkillFilter(e));

        // Tab navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleTabClick(e));
        });

        // Session tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSessionTabClick(e));
        });
    }

    loadUserData() {
        const userData = localStorage.getItem('skillswap_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.showPage('dashboard');
        }
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('skillswap_user', JSON.stringify(this.currentUser));
        }
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        document.getElementById(`${pageName}-page`).classList.add('active');
        this.currentPage = pageName;

        // Initialize page-specific content
        if (pageName === 'dashboard') {
            this.initDashboard();
        } else if (pageName === 'skills') {
            this.initSkillsPage();
        }
    }

    showLogin() {
        this.showPage('login');
    }

    showRegister() {
        this.showPage('register');
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Mock authentication
        if (email && password) {
            // Check if user exists in localStorage
            const existingUser = localStorage.getItem(`user_${email}`);
            if (existingUser) {
                this.currentUser = JSON.parse(existingUser);
                this.saveUserData();
                this.showPage('dashboard');
                this.showMessage('Welcome back!', 'success');
            } else {
                this.showMessage('User not found. Please register first.', 'error');
            }
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (name && email && password) {
            // Create new user
            this.currentUser = {
                id: Date.now(),
                name,
                email,
                password,
                coins: 100,
                teachSkills: [],
                learnSkills: [],
                joinDate: new Date().toISOString()
            };

            // Save to localStorage
            localStorage.setItem(`user_${email}`, JSON.stringify(this.currentUser));
            this.showPage('skills');
        }
    }

    initSkillsPage() {
        this.renderCategories('teach-categories', 'teach');
        this.renderCategories('learn-categories', 'learn');
    }

    renderCategories(containerId, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        Object.keys(this.skillsData).forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryCard.addEventListener('click', () => this.selectCategory(category, type));
            container.appendChild(categoryCard);
        });
    }

    selectCategory(category, type) {
        // Update selected category
        if (type === 'teach') {
            this.selectedTeachCategory = category;
        } else {
            this.selectedLearnCategory = category;
        }

        // Update UI
        const container = document.getElementById(`${type}-categories`);
        container.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.classList.add('selected');

        // Render skills for selected category
        this.renderSkills(category, type);
    }

    renderSkills(category, type) {
        const container = document.getElementById(`${type}-skills`);
        container.innerHTML = '';

        this.skillsData[category].forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.textContent = skill;
            skillCard.addEventListener('click', () => this.toggleSkill(skill, type, skillCard));
            container.appendChild(skillCard);
        });
    }

    toggleSkill(skill, type, element) {
        const skillsArray = type === 'teach' ? this.selectedTeachSkills : this.selectedLearnSkills;
        const index = skillsArray.indexOf(skill);

        if (index > -1) {
            skillsArray.splice(index, 1);
            element.classList.remove('selected');
        } else {
            skillsArray.push(skill);
            element.classList.add('selected');
        }
    }

    completeRegistration() {
        if (this.selectedTeachSkills.length === 0) {
            this.showMessage('Please select at least one skill you can teach.', 'error');
            return;
        }

        // Update user data
        this.currentUser.teachSkills = this.selectedTeachSkills;
        this.currentUser.learnSkills = this.selectedLearnSkills;
        this.currentUser.category = this.selectedTeachCategory;

        this.saveUserData();
        this.showPage('dashboard');
        this.showMessage('Registration completed! Welcome to SkillSwap!', 'success');
    }

    initDashboard() {
        this.updateUserInfo();
        this.renderPeopleGrid();
        this.updateAnalytics();
        this.updateProfile();
        this.showTab('discover');
    }

    updateUserInfo() {
        if (this.currentUser) {
            document.getElementById('user-name').textContent = this.currentUser.name;
            document.getElementById('coins-count').textContent = this.currentUser.coins || 100;
        }
    }

    renderPeopleGrid() {
        const container = document.getElementById('people-grid');
        container.innerHTML = '';

        this.mockUsers.forEach(user => {
            const personCard = this.createPersonCard(user);
            container.appendChild(personCard);
        });
    }

    createPersonCard(user) {
        const card = document.createElement('div');
        card.className = 'person-card';
        
        card.innerHTML = `
            <div class="person-header">
                <img src="${user.avatar}" alt="${user.name}" class="person-avatar">
                <div class="person-info">
                    <h3>${user.name}</h3>
                    <p>${user.experience} • ${user.category}</p>
                </div>
            </div>
            <div class="person-skills">
                <h4>Can teach:</h4>
                <div class="skills-tags">
                    ${user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="person-footer">
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${user.rating}</span>
                </div>
                <button class="btn btn-primary" onclick="app.openBookingModal(${user.id})">
                    Book Session (${user.hourlyRate} coins)
                </button>
            </div>
        `;

        return card;
    }

    openBookingModal(userId) {
        const user = this.mockUsers.find(u => u.id === userId);
        if (!user) return;

        this.currentBooking = user;
        
        // Update modal content
        document.getElementById('booking-teacher-pic').src = user.avatar;
        document.getElementById('booking-teacher-name').textContent = user.name;
        document.getElementById('booking-skill').textContent = user.skills.join(', ');
        document.getElementById('booking-cost').textContent = `${user.hourlyRate} SS Coins`;

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-date').min = today;

        // Show modal
        document.getElementById('booking-modal').classList.add('active');
    }

    closeBookingModal() {
        document.getElementById('booking-modal').classList.remove('active');
        this.currentBooking = null;
        document.getElementById('booking-form').reset();
    }

    handleBooking(e) {
        e.preventDefault();
        
        if (!this.currentBooking) return;

        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const duration = document.getElementById('booking-duration').value;
        const message = document.getElementById('booking-message').value;

        const cost = this.currentBooking.hourlyRate;

        if (this.currentUser.coins < cost) {
            this.showMessage('Insufficient SS Coins! Earn more by teaching others.', 'error');
            return;
        }

        // Deduct coins
        this.currentUser.coins -= cost;
        
        // Create session
        const session = {
            id: Date.now(),
            teacher: this.currentBooking,
            student: this.currentUser,
            date,
            time,
            duration: parseInt(duration),
            message,
            cost,
            status: 'upcoming',
            createdAt: new Date().toISOString()
        };

        this.userSessions.push(session);
        this.userStats.sessionsLearned++;
        this.userStats.coinsSpent += cost;

        this.saveUserData();
        this.updateUserInfo();
        this.updateAnalytics();
        this.closeBookingModal();
        
        this.showMessage(`Session booked with ${this.currentBooking.name} for ${date} at ${time}!`, 'success');
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.person-card');
        
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const skills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = name.includes(query) || skills.some(skill => skill.includes(query));
            card.style.display = matches ? 'block' : 'none';
        });
    }

    handleCategoryFilter(e) {
        const category = e.target.value;
        this.filterPeople({ category });
    }

    handleSkillFilter(e) {
        const skill = e.target.value;
        this.filterPeople({ skill });
    }

    filterPeople(filters) {
        const cards = document.querySelectorAll('.person-card');
        
        cards.forEach(card => {
            let show = true;
            
            if (filters.category) {
                const categoryText = card.querySelector('.person-info p').textContent.toLowerCase();
                show = show && categoryText.includes(filters.category);
            }
            
            if (filters.skill) {
                const skills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
                show = show && skills.some(s => s.includes(filters.skill.toLowerCase()));
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }

    handleTabClick(e) {
        e.preventDefault();
        const tab = e.target.closest('.menu-item').dataset.tab;
        this.showTab(tab);
    }

    showTab(tabName) {
        // Update menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Initialize tab-specific content
        if (tabName === 'ai-match') {
            this.initAIMatching();
        } else if (tabName === 'my-sessions') {
            this.renderSessions();
        }
    }

    initAIMatching() {
        // Populate skill filter options
        const skillFilter = document.getElementById('skill-filter');
        skillFilter.innerHTML = '<option value="">All Skills</option>';
        
        const allSkills = Object.values(this.skillsData).flat();
        allSkills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill;
            option.textContent = skill;
            skillFilter.appendChild(option);
        });
    }

    async getAIMatches() {
        const prompt = document.getElementById('ai-prompt').value.trim();
        if (!prompt) {
            this.showMessage('Please enter what you want to learn or achieve.', 'error');
            return;
        }

        const resultsContainer = document.getElementById('ai-results');
        resultsContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        // Simulate AI processing
        setTimeout(() => {
            const matches = this.generateAIMatches(prompt);
            this.renderAIResults(matches);
        }, 2000);
    }

    generateAIMatches(prompt) {
        // Simple keyword matching for demo
        const keywords = prompt.toLowerCase().split(' ');
        const matches = [];

        this.mockUsers.forEach(user => {
            let score = 0;
            user.skills.forEach(skill => {
                keywords.forEach(keyword => {
                    if (skill.toLowerCase().includes(keyword)) {
                        score += 1;
                    }
                });
            });

            if (score > 0) {
                matches.push({ user, score });
            }
        });

        // Sort by score and return top matches
        return matches.sort((a, b) => b.score - a.score).slice(0, 3);
    }

    renderAIResults(matches) {
        const container = document.getElementById('ai-results');
        
        if (matches.length === 0) {
            container.innerHTML = '<p>No matches found. Try different keywords or browse all available tutors.</p>';
            return;
        }

        container.innerHTML = `
            <h3>AI Recommended Matches</h3>
            <div class="people-grid">
                ${matches.map(match => this.createPersonCard(match.user).outerHTML).join('')}
            </div>
        `;
    }

    handleSessionTabClick(e) {
        const tab = e.target.dataset.sessionTab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Render sessions for selected tab
        this.renderSessions(tab);
    }

    renderSessions(type = 'upcoming') {
        const container = document.getElementById('sessions-content');
        const filteredSessions = this.userSessions.filter(session => {
            if (type === 'upcoming') return session.status === 'upcoming';
            if (type === 'completed') return session.status === 'completed';
            if (type === 'teaching') return session.teacher.id === this.currentUser.id;
            return true;
        });

        if (filteredSessions.length === 0) {
            container.innerHTML = `<p>No ${type} sessions found.</p>`;
            return;
        }

        container.innerHTML = filteredSessions.map(session => `
            <div class="session-card">
                <div class="session-header">
                    <img src="${session.teacher.avatar}" alt="${session.teacher.name}">
                    <div>
                        <h4>${session.teacher.name}</h4>
                        <p>${session.date} at ${session.time}</p>
                    </div>
                </div>
                <div class="session-details">
                    <p><strong>Duration:</strong> ${session.duration} minutes</p>
                    <p><strong>Cost:</strong> ${session.cost} SS Coins</p>
                    ${session.message ? `<p><strong>Message:</strong> ${session.message}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    updateAnalytics() {
        document.getElementById('total-earned').textContent = this.userStats.coinsEarned;
        document.getElementById('sessions-taught').textContent = this.userStats.sessionsTaught;
        document.getElementById('sessions-learned').textContent = this.userStats.sessionsLearned;
        document.getElementById('avg-rating').textContent = this.userStats.rating.toFixed(1);
    }

    updateProfile() {
        if (this.currentUser) {
            document.getElementById('profile-name').value = this.currentUser.name || '';
            document.getElementById('profile-email').value = this.currentUser.email || '';
            document.getElementById('profile-bio').value = this.currentUser.bio || '';
            
            // Render skills
            const teachSkillsContainer = document.getElementById('profile-teach-skills');
            const learnSkillsContainer = document.getElementById('profile-learn-skills');
            
            teachSkillsContainer.innerHTML = (this.currentUser.teachSkills || [])
                .map(skill => `<span class="skill-tag">${skill}</span>`).join('');
            
            learnSkillsContainer.innerHTML = (this.currentUser.learnSkills || [])
                .map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        }
    }

    updateProfile() {
        const name = document.getElementById('profile-name').value;
        const bio = document.getElementById('profile-bio').value;
        
        this.currentUser.name = name;
        this.currentUser.bio = bio;
        
        this.saveUserData();
        this.updateUserInfo();
        this.showMessage('Profile updated successfully!', 'success');
    }

    showMessage(text, type = 'info') {
        // Create message element
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        // Add to page
        const container = document.querySelector('.main-content') || document.body;
        container.insertBefore(message, container.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
function showLogin() {
    app.showLogin();
}

function showRegister() {
    app.showRegister();
}

function completeRegistration() {
    app.completeRegistration();
}

function getAIMatches() {
    app.getAIMatches();
}

function closeBookingModal() {
    app.closeBookingModal();
}

function updateProfile() {
    app.updateProfile();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SkillSwapApp();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        app.closeBookingModal();
    }
});