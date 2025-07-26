document.addEventListener("DOMContentLoaded", () => {
    // --- STATE MANAGEMENT ---
    const userName = localStorage.getItem("userName") || "Guest";
    const userCategory = localStorage.getItem("userCategory") || "tech";
    const userTeachSkills = JSON.parse(localStorage.getItem("userTeachSkills")) || [];

    let skillMoney = parseInt(localStorage.getItem("skillMoney")) || 0;
    let userLearnSkills = [];
    let analytics = { earned: 0, spent: 0, taught: 0, learned: 0 };

    // --- EXPANDED & DETAILED FAKE DATABASE ---
    const fakeUsers = [
        { name: "Aditya Sharma", skills: ["React", "JavaScript", "Node.js"], category: "tech", experience: "5 Yrs Exp", education: "B.Tech in CS" },
        { name: "Sahana Rao", skills: ["Python", "AI/ML", "Data Science"], category: "tech", experience: "7 Yrs Exp", education: "M.S. in Data Science" },
        { name: "Vetri Maxwell", skills: ["UI/UX Design", "Figma", "Illustration"], category: "creative", experience: "6 Yrs Exp", education: "B.Des in Graphic Design" },
        { name: "Dhiya Kumar", skills: ["Public Speaking", "Negotiation", "Sales Pitch"], category: "communication", experience: "10+ Yrs Exp", education: "MBA" },
        { name: "Arjun Prasad", skills: ["Content Marketing", "SEO", "Google Analytics"], category: "marketing", experience: "4 Yrs Exp", education: "BBA in Marketing" },
        { name: "Meera Reddy", skills: ["Cloud (AWS/GCP)", "DevOps", "Kubernetes"], category: "tech", experience: "8 Yrs Exp", education: "B.E. in IT" },
        { name: "Kavya Singh", skills: ["Video Editing", "After Effects", "Canva"], category: "creative", experience: "3 Yrs Exp", education: "Diploma in Film" },
        { name: "Rohan Gupta", skills: ["Social Media Ads", "Email Marketing", "Storytelling"], category: "marketing", experience: "5 Yrs Exp", education: "M.A. in Comm." },
    ];

    // --- DOM ELEMENTS ---
    const matchedUsersListEl = document.getElementById("matched-users-list");
    const newSkillInputEl = document.getElementById("new-skill-input");

    // --- RENDER FUNCTIONS ---
    function renderDashboard() {
        document.getElementById("greeting").textContent = `👋 Welcome, ${userName}`;
        document.getElementById("category-display").textContent = userCategory.charAt(0).toUpperCase() + userCategory.slice(1);
        document.getElementById("wallet-balance").textContent = `💰 ${skillMoney}`;

        document.getElementById("teach-skills-list").innerHTML = userTeachSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        
        renderSmartRequests();
        renderAnalytics();
        matchAndDisplayTutors(); // Initial render of tutors
    }
    
    // --- GUARANTEED TUTOR LOGIC ---
    function matchAndDisplayTutors() {
        matchedUsersListEl.innerHTML = "";
        
        // Find direct matches
        const matchedTutors = new Set(fakeUsers.filter(user => 
            user.skills.some(skill => userLearnSkills.includes(skill)) &&
            user.name.toLowerCase() !== userName.toLowerCase()
        ));

        // Find tutors from the same broad category if no direct matches
        let recommendedTutors = new Set(fakeUsers.filter(user =>
            user.category === userCategory && 
            user.name.toLowerCase() !== userName.toLowerCase()
        ));

        // Combine lists, ensuring no duplicates
        const finalTutorList = new Set([...matchedTutors, ...recommendedTutors]);

        // Ensure we always have at least 4 tutors by adding random ones if needed
        while (finalTutorList.size < 4 && finalTutorList.size < fakeUsers.length) {
            const randomTutor = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
             if (randomTutor.name.toLowerCase() !== userName.toLowerCase()) {
                finalTutorList.add(randomTutor);
            }
        }
        
        // Render the final list
        finalTutorList.forEach(user => {
            const cost = 50;
            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `
                <h4>${user.name}</h4>
                <p class="details">${user.experience} • ${user.education}</p>
                <p class="skills-label">Teaches:</p>
                <div class="skills-tag-list">${user.skills.slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
                <button class="button-primary connect-btn" data-cost="${cost}" data-user="${user.name}">Connect (-${cost} 💰)</button>
            `;
            matchedUsersListEl.appendChild(card);
        });
    }


    function renderSmartRequests() {
        // ... (This function remains the same as the previous version)
        const requestedUsersListEl = document.getElementById("requested-users-list");
        requestedUsersListEl.innerHTML = "";
        if (userTeachSkills.length === 0) return;
        const potentialRequesters = ["David Lee", "Priya Sharma", "Omar Ahmed", "Chloe Chen"];
        for (let i = 0; i < 2; i++) {
            const randomSkill = userTeachSkills[Math.floor(Math.random() * userTeachSkills.length)];
            const randomRequester = potentialRequesters[Math.floor(Math.random() * potentialRequesters.length)];
            const cost = 50;
            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `<h4>${randomRequester}</h4><p class="bio">Wants to learn your skill:</p><strong>${randomSkill}</strong><button class="button-secondary accept-btn" data-cost="${cost}" data-user="${randomRequester}">Accept (+${cost} 💰)</button>`;
            requestedUsersListEl.appendChild(card);
        }
    }


    function renderAnalytics() {
        // ... (This function remains the same)
        document.getElementById("analytics-earned").innerHTML = `<strong>${analytics.earned}</strong>`;
        document.getElementById("analytics-spent").innerHTML = `<strong>${analytics.spent}</strong>`;
        document.getElementById("analytics-taught").innerHTML = `<strong>${analytics.taught}</strong>`;
        document.getElementById("analytics-learned").innerHTML = `<strong>${analytics.learned}</strong>`;
    }

    // --- EVENT LISTENERS & CORE FUNCTIONALITY ---
    window.addLearnSkill = function() {
        const skill = newSkillInputEl.value.trim();
        if (skill && !userLearnSkills.includes(skill)) {
            userLearnSkills.push(skill);
            document.getElementById("learn-skills-list").innerHTML = userLearnSkills.map(s => `<span class="skill-tag">${s}</span>`).join('');
            matchAndDisplayTutors(); // Re-render tutors when a new skill is added
            newSkillInputEl.value = "";
        }
    };

    newSkillInputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addLearnSkill();
    });

    document.body.addEventListener('click', function(event) {
        // ... (This event listener logic remains the same as the previous version)
        const target = event.target;
        if (target.classList.contains('connect-btn')) {
            const cost = parseInt(target.dataset.cost);
            const user = target.dataset.user;
            if (skillMoney >= cost) {
                skillMoney -= cost; analytics.spent += cost; analytics.learned++;
                localStorage.setItem("skillMoney", skillMoney);
                document.getElementById("wallet-balance").textContent = `💰 ${skillMoney}`;
                renderAnalytics();
                alert(`Connected with ${user}! A meeting link would be generated here.`);
                target.textContent = "Connected!";
                target.disabled = true;
            } else {
                alert("Not enough SkillMoney!");
            }
        }
        if (target.classList.contains('accept-btn')) {
            const cost = parseInt(target.dataset.cost);
            const user = target.dataset.user;
            skillMoney += cost; analytics.earned += cost; analytics.taught++;
            localStorage.setItem("skillMoney", skillMoney);
            document.getElementById("wallet-balance").textContent = `💰 ${skillMoney}`;
            renderAnalytics();
            alert(`Request from ${user} accepted! You earned ${cost} SkillMoney.`);
            target.closest('.user-card').remove();
        }
    });

    // --- INITIALIZATION ---
    renderDashboard();
});