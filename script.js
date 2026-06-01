// --- NAVIGATION SCREEN DOM ELEMENTS ---
const homeScreen = document.getElementById("home-screen");
const letterScreenWrapper = document.getElementById("letter-screen-wrapper");
const rainScreen = document.getElementById("rain-screen");

// --- INTERACTIVE LINK SELECTION HANDLERS ---
const readLetterBtn = document.getElementById("read-letter-btn");
const backToHomeBtn = document.getElementById("back-to-home-btn");
const rainToggleBtn = document.getElementById("rain-toggle-btn");
const stopRainBtn = document.getElementById("stop-rain-btn");

// --- MODAL POPUP DOM TARGETS ---
const calendarBtn = document.getElementById("calendar-btn");
const countdownModal = document.getElementById("countdown-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

// --- RUNTIME TIMEOUT TRACKING HANDLES ---
let rainInterval = null;
let countdownInterval = null;

const secretMessages = [
  "I love you, Samprita, more than words can say. Happy today! 😘",
  "Baby don't you have any shame being thissss cutee? 🥺",
  "You are my universe ✨",
  "I love you I love you I love you I love you I love you I love you. ❤️",
  "You are the cutest and best gf in the world 🌎",
  "Do you have a name or can I just call you mine? 😉",
  "You're my favorite notification, Samprita. Real talk. 🥰",
  "If you were a triangle, you'd be acute one. 😂",
  "Just a reminder: you look absolutely breathtaking today. Yes, you.",
  "Sending a massive virtual hug to my favorite human ever! 🤗❤️",
  "How did I get so lucky to have Miss Dey in my life? 🥺",
  "You hold my whole heart, cutie. Completely and entirely. 🔐💖",
  "My days are just 100x better when I'm talking to you. 😘",
  "You're my absolute happy place, baby. ❤️"
];

// --- SCREEN NAVIGATION HANDLERS ---

readLetterBtn.addEventListener("click", function () {
  for (let i = 0; i < 5; i++) {
    createHeart(readLetterBtn);
  }
  homeScreen.classList.remove("active");
  setTimeout(() => {
    letterScreenWrapper.classList.add("active");
  }, 150);
});

backToHomeBtn.addEventListener("click", function () {
  letterScreenWrapper.classList.remove("active");
  setTimeout(() => {
    homeScreen.classList.add("active");
  }, 150);
});

// --- SURPRISE BUTTON INTERACTIVE TOGGLE ---
document.getElementById("surprise-btn").addEventListener("click", function (event) {
  const message = document.getElementById("secret-message");
  const button = event.currentTarget;

  if (message.style.display === "block") {
    message.style.display = "none";
    button.textContent = "Click for a surprise";
  } else {
    message.style.display = "block";
    message.textContent = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    button.textContent = "Close message";

    // Generates 25 intensive burst micro-particles matching touch radius
    for (let i = 0; i < 25; i++) {
      createHeart(button);
    }
  }
});

// --- CLICK BURST GENERATOR ---
function createHeart(button) {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = "❤️";

  const rect = button.getBoundingClientRect();
  const activeCard = button.closest(".container");
  const containerRect = activeCard.getBoundingClientRect();

  const x = rect.left - containerRect.left + Math.random() * rect.width;
  const y = rect.top - containerRect.top - 15 * Math.random();

  heart.style.left = x + "px";
  heart.style.top = y + "px";

  activeCard.appendChild(heart);
  setTimeout(() => { heart.remove(); }, 2000);
}

// --- SCREEN 3: FULLSCREEN CONTINUOUS RAIN SYSTEM ---
function startHeartRain() {
  homeScreen.classList.remove("active");
  letterScreenWrapper.classList.remove("active");

  setTimeout(() => {
    rainScreen.classList.add("active");
    rainInterval = setInterval(createFallingHeart, 300);
  }, 150);
}

function stopHeartRain() {
  rainScreen.classList.remove("active");
  clearInterval(rainInterval);

  document.querySelectorAll(".falling-heart").forEach((h) => h.remove());
  setTimeout(() => {
    homeScreen.classList.add("active");
  }, 150);
}

function createFallingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("falling-heart");
  heart.innerHTML = "❤️";

  const startPos = Math.random() * window.innerWidth;
  const duration = Math.random() * 3 + 2; 
  const size = Math.random() * 20 + 15; 
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.left = startPos + "px";
  heart.style.animationDuration = duration + "s";
  heart.style.fontSize = size + "px";
  heart.style.opacity = opacity;

  document.body.appendChild(heart);
  setTimeout(() => { heart.remove(); }, duration * 1000);
}

rainToggleBtn.addEventListener("click", startHeartRain);
stopRainBtn.addEventListener("click", stopHeartRain);

// --- SCREEN 4: COUNT-UP CALENDAR CALCULATION ENGINE ---
function updateCountdown() {
  const now = new Date();
  
  // Hard-locks computation rules strictly onto September 20, 2025
  const targetDate = new Date("September 20, 2025 00:00:00").getTime();
  const nowTime = now.getTime();
  
  let difference = nowTime - targetDate;
  document.getElementById("countdown-title").textContent = "Time Since Sept 20, 2025 🗓️";

  if (difference < 0) difference = 0; // Pre-date safety clamp

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

calendarBtn.addEventListener("click", function () {
  countdownModal.classList.add("active");
  updateCountdown(); 
  countdownInterval = setInterval(updateCountdown, 1000);
});

function closeModal() {
  countdownModal.classList.remove("active");
  clearInterval(countdownInterval);
}

closeModalBtn.addEventListener("click", closeModal);
countdownModal.addEventListener("click", function (e) {
  if (e.target === countdownModal) closeModal();
});

// --- EXTRA RANDOM EVENT: BACKGROUND HEART METEOR SHOWER ---
const canvas = document.getElementById("meteor-canvas");
const ctx = canvas.getContext("2d");
let meteors = [];
let meteorAnimationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class HeartMeteor {
  constructor() {
    this.reset();
    this.y = Math.random() * -canvas.height;
  }

  reset() {
    this.x = Math.random() * (canvas.width + 200);
    this.y = Math.random() * -100;
    this.length = Math.random() * 80 + 60;
    this.speed = Math.random() * 12 + 8;  
    this.size = Math.random() * 14 + 10;   
    this.opacity = Math.random() * 0.6 + 0.4;
  }

  update() {
    this.x -= this.speed * 0.8;
    this.y += this.speed;
    if (this.y > canvas.height || this.x < -100) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    let gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length * 0.8, this.y - this.length);
    gradient.addColorStop(0, "rgba(255, 117, 151, 1)");
    gradient.addColorStop(1, "rgba(255, 179, 198, 0)");
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length * 0.8, this.y - this.length);
    ctx.stroke();

    ctx.fillStyle = "#ff7597";
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
    ctx.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
    ctx.fill();

    ctx.restore();
  }
}

function animateMeteors() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  meteors.forEach(meteor => {
    meteor.update();
    meteor.draw();
  });
  meteorAnimationId = requestAnimationFrame(animateMeteors);
}

function triggerMeteorShower() {
  if (homeScreen.classList.contains("meteor-active") || !homeScreen.classList.contains("active")) return;

  homeScreen.classList.add("meteor-active");
  meteors = [];
  for (let i = 0; i < 15; i++) {
    meteors.push(new HeartMeteor());
  }
  animateMeteors();

  // Run the beautiful shooting star event cycle for exactly 25 seconds
  setTimeout(() => {
    homeScreen.classList.remove("meteor-active");
    setTimeout(() => {
      cancelAnimationFrame(meteorAnimationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2000); 
  }, 25000); 
}

// Runs every 20 seconds behind the scenes with a 15% drop-rate activation probability
setInterval(() => {
  if (Math.random() < 0.15) {
    triggerMeteorShower();
  }
}, 20000);
