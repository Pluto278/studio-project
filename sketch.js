let particles = [];
let mic; // ✅ ChatGPT: Added microphone input to enable audio-based interaction

function setup() {
  createCanvas(windowWidth, windowHeight);

  // ✅ ChatGPT: Added microphone initialization to allow interaction with sound input
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0, 20); // ✅ ChatGPT: Reduced background opacity to create a smooth fading effect

  let vol = mic.getLevel(); // ✅ ChatGPT: Retrieves microphone volume level
  let numParticles = map(vol, 0, 1, 5, 50); // ✅ ChatGPT: Maps volume level to dynamically adjust particle count

  // ✅ ChatGPT: Introduced sound-based particle generation (generates particles dynamically based on audio input)
  for (let i = 0; i < numParticles; i++) {
    let p = new Particle(mouseX, mouseY);
    particles.push(p);
  }

  // ✅ ChatGPT: Optimized loop for memory efficiency (removes faded-out particles)
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1); // ✅ ChatGPT: Ensures that particles are removed when they fade out to prevent memory issues
    }
  }
}

// ✅ ChatGPT: Added mouse click interaction to generate additional particles, increasing interactivity
function mousePressed() {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

// ✅ ChatGPT: Optimized and refined the Particle Class for better motion, fading effects, and dynamic color changes
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
    this.size = random(5, 15);
    this.color = [random(255), random(255), random(255)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2; // ✅ ChatGPT: Implements a smooth fade-out effect for a more visually appealing animation
  }

  finished() {
    return this.alpha < 0; // ✅ ChatGPT: Checks whether the particle should be removed when fully faded
  }

  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}
