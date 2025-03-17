// HUD Navigation System
const navItems = document.querySelectorAll('.nav-modules li');
const sections = document.querySelectorAll('.section');
const ctaBtn = document.querySelector('.cta-btn');

// Check if site is already unlocked in this browser
const isSiteUnlocked = localStorage.getItem('visionaryCodexUnlocked') === 'true';

// Function to show a section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}

// Update navigation visuals
function updateNavVisuals() {
    navItems.forEach(item => {
        item.classList.add('unlocked');
    });
}

// Handle navigation clicks
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        
        if (isSiteUnlocked) {
            // If already unlocked, just switch sections
            showSection(sectionId);
        } else {
            // First-time unlock with gamified prompt
            if (confirm(`Initiate scan to access "${item.textContent}"?`)) {
                item.style.opacity = '0.5';
                setTimeout(() => {
                    localStorage.setItem('visionaryCodexUnlocked', 'true');
                    updateNavVisuals();
                    showSection(sectionId);
                    alert('System fully unlocked! Explore freely.');
                }, 1000);
            }
        }
    });
});

// Start Mission Button
ctaBtn.addEventListener('click', () => {
    if (!isSiteUnlocked) {
        localStorage.setItem('visionaryCodexUnlocked', 'true');
        updateNavVisuals();
    }
    showSection('about');
});

// Initial Load
if (isSiteUnlocked) {
    updateNavVisuals();
}
showSection('hero');