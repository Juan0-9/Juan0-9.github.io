const countdown = () => {
    const countDate = new Date("Aug 04, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById('timer').innerText = `${textDay}d ${textHour}h ${textMinute}m ${textSecond}s`;
};

setInterval(countdown, 1000);

// script.js

// Utility function to get a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Firework particle constructor
function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = random(1, 3);
    this.alpha = 1;
    this.velocity = {
        x: random(-2, 2),
        y: random(-2, 2)
    };
}

// Update particle properties
Particle.prototype.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.02;
}

// Draw particle on canvas
Particle.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
}

// Create a fireworks burst
function createFirework(x, y, color) {
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, color));
    }
    return particles;
}

// Initialize canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

// Handle click event to create fireworks
window.addEventListener('click', (event) => {
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particles = createFirework(event.clientX, event.clientY, color);
    fireworks.push(...particles);
});

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    fireworks.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            fireworks.splice(index, 1);
        } else {
            particle.update();
            particle.draw(ctx);
        }
    });

    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

