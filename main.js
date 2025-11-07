// SuperDuolingo Main JavaScript
class SuperDuolingo {
    constructor() {
        this.user = {
            level: 23,
            xp: 2847,
            streak: 47,
            fluencyScore: 78,
            dailyProgress: 3,
            dailyGoal: 5,
            xpToday: 127,
            language: 'Spanish'
        };
        
        this.quests = [
            { name: 'Cultural Explorer', progress: 32, total: 50, reward: '100 XP + Badge' },
            { name: 'Language Warriors', progress: 847, total: 1000, reward: 'Guild Trophy' }
        ];
        
        this.init();
    }
    
    init() {
        this.setupParticleSystem();
        this.setupAnimations();
        this.setupInteractions();
        this.updateUI();
        this.startPeriodicUpdates();
        this.initCharacterCreation();
    }
    
    setupParticleSystem() {
        // Create particle system using p5.js
        const particleSketch = (p) => {
            let particles = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent('particle-container');
                canvas.style('position', 'fixed');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('pointer-events', 'none');
                canvas.style('z-index', '1');
                
                // Initialize particles
                for (let i = 0; i < 50; i++) {
                    particles.push(new Particle(p));
                }
            };
            
            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                for (let particle of particles) {
                    particle.update();
                    particle.draw();
                }
            };
            
            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
            };
            
            class Particle {
                constructor(p) {
                    this.p = p;
                    this.x = p.random(p.width);
                    this.y = p.random(p.height);
                    this.vx = p.random(-0.5, 0.5);
                    this.vy = p.random(-0.5, 0.5);
                    this.size = p.random(2, 6);
                    this.opacity = p.random(0.3, 0.8);
                    this.color = p.random(['#50C878', '#32CD32', '#98FB98', '#FFD700']);
                }
                
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    
                    // Wrap around edges
                    if (this.x < 0) this.x = this.p.width;
                    if (this.x > this.p.width) this.x = 0;
                    if (this.y < 0) this.y = this.p.height;
                    if (this.y > this.p.height) this.y = 0;
                }
                
                draw() {
                    this.p.fill(this.color + Math.floor(this.opacity * 255).toString(16));
                    this.p.noStroke();
                    this.p.circle(this.x, this.y, this.size);
                }
            }
        };
        
        new p5(particleSketch);
    }
    
    setupAnimations() {
        // Animate elements on page load
        anime({
            targets: '.gaming-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutExpo'
        });
        
        // Animate progress bars
        setTimeout(() => {
            this.animateProgressBars();
        }, 1000);
        
        // Animate streak counter
        this.animateCounter('#streak-counter', this.user.streak);
    }
    
    setupInteractions() {
        // Lesson card interactions
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleLessonClick(e.currentTarget);
            });
            
            card.addEventListener('mouseenter', (e) => {
                anime({
                    targets: e.currentTarget,
                    scale: 1.05,
                    rotate: '1deg',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', (e) => {
                anime({
                    targets: e.currentTarget,
                    scale: 1,
                    rotate: '0deg',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
        
        // Button interactions
        document.querySelectorAll('.gaming-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.currentTarget);
            });
        });
        
        // Navigation interactions
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                anime({
                    targets: e.currentTarget,
                    translateY: -2,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            link.addEventListener('mouseleave', (e) => {
                anime({
                    targets: e.currentTarget,
                    translateY: 0,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
    
    handleLessonClick(card) {
        // Create celebration effect
        this.createCelebrationEffect(card);
        
        // Show lesson modal or navigate to lessons page
        setTimeout(() => {
            window.location.href = 'lessons.html';
        }, 500);
    }
    
    handleButtonClick(button) {
        // Button press animation
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
        
        // Create ripple effect
        this.createRippleEffect(button);
        
        // Handle different button actions
        const buttonText = button.textContent.trim();
        switch(buttonText) {
            case 'Start Your Adventure':
            case 'Start Learning':
                setTimeout(() => {
                    window.location.href = 'lessons.html';
                }, 300);
                break;
            case 'Watch Demo':
                this.showDemoModal();
                break;
        }
    }
    
    createCelebrationEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create multiple particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${['#50C878', '#32CD32', '#FFD700', '#FF8C00'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            document.body.appendChild(particle);
            
            anime({
                targets: particle,
                translateX: (Math.random() - 0.5) * 200,
                translateY: (Math.random() - 0.5) * 200,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 1000,
                easing: 'easeOutQuad',
                complete: () => {
                    document.body.removeChild(particle);
                }
            });
        }
    }
    
    createRippleEffect(button) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            left: ${rect.width / 2 - size / 2}px;
            top: ${rect.height / 2 - size / 2}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        anime({
            targets: ripple,
            scale: [0, 2],
            opacity: [0.3, 0],
            duration: 600,
            easing: 'easeOutQuad',
            complete: () => {
                if (button.contains(ripple)) {
                    button.removeChild(ripple);
                }
            }
        });
    }
    
    animateProgressBars() {
        // Animate daily progress
        const dailyProgress = (this.user.dailyProgress / this.user.dailyGoal) * 100;
        anime({
            targets: '.progress-bar',
            width: `${dailyProgress}%`,
            duration: 1500,
            easing: 'easeOutExpo'
        });
        
        // Animate XP progress (simulated)
        anime({
            targets: '.xp-bar',
            width: '75%',
            duration: 2000,
            easing: 'easeOutExpo'
        });
    }
    
    animateCounter(selector, targetValue) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        anime({
            targets: { value: 0 },
            value: targetValue,
            duration: 2000,
            easing: 'easeOutExpo',
            update: function(anim) {
                element.textContent = Math.floor(anim.animatables[0].target.value);
            }
        });
    }
    
    updateUI() {
        // Update user stats
        document.querySelector('.gaming-card h3').textContent = `Level ${this.user.level}`;
        document.querySelector('.gaming-card:nth-child(2) h3').textContent = `${this.user.xp.toLocaleString()} XP`;
        document.querySelector('.gaming-card:nth-child(4) h3').textContent = `${this.user.fluencyScore}%`;
        
        // Update quest progress
        const questElements = document.querySelectorAll('.quest-card');
        questElements.forEach((element, index) => {
            if (this.quests[index]) {
                const quest = this.quests[index];
                const progressPercent = (quest.progress / quest.total) * 100;
                const progressBar = element.querySelector('.bg-golden-yellow');
                if (progressBar) {
                    progressBar.style.width = `${progressPercent}%`;
                }
            }
        });
    }
    
    startPeriodicUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.simulateProgress();
        }, 30000); // Update every 30 seconds
        
        // Update streak every day
        setInterval(() => {
            this.updateStreak();
        }, 86400000); // Update every 24 hours
    }
    
    simulateProgress() {
        // Simulate small XP gains
        const xpGain = Math.floor(Math.random() * 10) + 1;
        this.user.xp += xpGain;
        this.user.xpToday += xpGain;
        
        // Update UI
        this.animateCounter('.gaming-card:nth-child(2) h3', this.user.xp);
        
        // Show XP gain notification
        this.showXPGain(xpGain);
    }
    
    showXPGain(xp) {
        const notification = document.createElement('div');
        notification.textContent = `+${xp} XP`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #FFD700, #FF8C00);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateY: [-20, 0],
            opacity: [0, 1, 1, 0],
            duration: 3000,
            easing: 'easeOutQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }
    
    updateStreak() {
        // Check if user has completed daily goal
        if (this.user.dailyProgress >= this.user.dailyGoal) {
            this.user.streak += 1;
            this.animateCounter('#streak-counter', this.user.streak);
            
            // Show streak milestone celebration
            if (this.user.streak % 10 === 0) {
                this.showStreakMilestone();
            }
        }
    }
    
    showStreakMilestone() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔥</div>
                <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Streak Milestone!</h2>
                <p style="font-size: 1.2rem;">${this.user.streak} Days Strong!</p>
            </div>
        `;
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FF8C00, #FFD700);
            padding: 2rem;
            border-radius: 20px;
            z-index: 2000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(celebration);
        
        anime({
            targets: celebration,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutBack'
        });
        
        setTimeout(() => {
            anime({
                targets: celebration,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInBack',
                complete: () => {
                    document.body.removeChild(celebration);
                }
            });
        }, 3000);
    }
    
    showDemoModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 20px; max-width: 600px; margin: 2rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #2D5016;">Welcome to SuperDuolingo!</h2>
                <p style="margin-bottom: 1rem; color: #4A5568;">
                    Experience language learning like never before with our gaming-inspired platform. 
                    Complete quests, build your character, and master new languages through addictive gameplay!
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                    <button class="gaming-button" onclick="window.location.href='lessons.html'">
                        Start Learning Now
                    </button>
                    <button onclick="this.closest('.fixed').remove()" 
                            style="padding: 12px 24px; border: 2px solid #50C878; border-radius: 12px; background: white; color: #50C878; cursor: pointer;">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        document.body.appendChild(modal);
        
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: modal.querySelector('div'),
            scale: [0.8, 1],
            duration: 500,
            easing: 'easeOutBack',
            delay: 100
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user has created a character
    const characterData = localStorage.getItem('superduolingo-character');
    if (!characterData && !window.location.pathname.includes('create-character.html')) {
        window.location.href = 'create-character.html';
        return;
    }
    
    new SuperDuolingo();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update particle system if needed
    if (window.p5Instance) {
        window.p5Instance.resizeCanvas(window.innerWidth, window.innerHeight);
    }
});

// Add some fun Easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code for secret feature
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
        e.key === 'a' || e.key === 'b') {
        // Could implement Konami code here
    }
});

// Character creation functions for home page
function openQuickCharacterModal() {
    window.location.href = 'create-character.html';
}

function saveHomeCharacter() {
    const nameInput = document.getElementById('home-character-name-input');
    const name = nameInput ? nameInput.value.trim() : '';
    
    if (name.length < 3) {
        alert('Please enter a name with at least 3 characters');
        return;
    }
    
    const characterData = JSON.parse(localStorage.getItem('superduolingo-character') || '{}');
    characterData.name = name;
    localStorage.setItem('superduolingo-character', JSON.stringify(characterData));
    
    // Show success message
    const toast = document.createElement('div');
    toast.textContent = `Welcome, ${name}! Your character has been saved.`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--emerald-green);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(toast);
    
    anime({
        targets: toast,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    setTimeout(() => {
        anime({
            targets: toast,
            translateX: [0, 100],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(toast);
            }
        });
    }, 3000);
    
    // Redirect to lessons
    setTimeout(() => {
        window.location.href = 'lessons.html';
    }, 2000);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SuperDuolingo;
}