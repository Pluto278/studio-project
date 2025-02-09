
 📌 Tasks 
- Develop an interactive particle system using p5.js.  
- Implement mouse movement interaction: Particles are generated at the mouse position.  
- Implement mouse click interaction: Clicking generates additional particles.  
- Implement sound interaction: The number of particles is influenced by the microphone input volume.  
- Use object-oriented programming (OOP) to manage particle behavior efficiently.  
- Fully document the development process, including problem-solving strategies, references, and AI tool usage.  

---

1. Initial Concept & Research 

1.1 Why This Project? 
The goal of this project was to explore **interactivity in generative art, inspired by:  
- Golan Levin - Interactive particle systems and generative animations.  
- Casey Reas - p5.js as an artistic medium for rule-based creation.  
- Daniel Shiffman’s Coding Train** - Algorithmic animation techniques.  

I wanted to experiment with **real-time user interaction** using **mouse movement, clicks, and microphone input** to create an immersive, dynamic visual experience.  

---

2. Technical Implementation

2.1 Setting Up the Canvas and Microphone 
This project initializes a **full-screen canvas** and a **microphone input** using `p5.AudioIn()`. The microphone is used to capture real-time volume levels, which influence the number of particles generated.  

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);

  // ✅ ChatGPT: Added microphone initialization for sound-based interaction
  mic = new p5.AudioIn();
  mic.start();
}
```

---

2.2 Mouse and Sound-Based Particle Generation  
Particles are dynamically generated based on user input:  

- Mouse movement: Generates particles at the mouse position.  
- Mouse click: Clicking increases the number of particles.  
- Sound input: Louder sounds generate more particles, creating a dynamic effect based on real-world audio input.  

```javascript
function draw() {
  background(0, 20); // ✅ ChatGPT: Reduced background opacity to create a fading effect

  let vol = mic.getLevel(); // ✅ ChatGPT: Retrieves microphone volume level
  let numParticles = map(vol, 0, 1, 5, 50); // ✅ ChatGPT: Maps volume level to dynamically adjust particle count

  // ✅ ChatGPT: Introduced sound-based particle generation
  for (let i = 0; i < numParticles; i++) {
    let p = new Particle(mouseX, mouseY);
    particles.push(p);
  }

  // ✅ ChatGPT: Optimized loop for memory efficiency (removes faded-out particles)
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1); // ✅ ChatGPT: Prevents memory issues by removing faded particles
    }
  }
}
```

---

2.3 Mouse Click Interaction 
Clicking generates 10 extra particles at the mouse position.  

```javascript
function mousePressed() {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}
```

---

2.4 Object-Oriented Particle System 
Each particle is an instance of the `Particle` class, which manages its properties and behavior.  

Particle Class Features
- Dynamic movement: Random velocities for natural motion.  
- Opacity fade-out: Particles slowly disappear for a smoother animation.  
- Color variation: Randomized color for a vibrant effect.  

```javascript
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
    this.alpha -= 2; // ✅ ChatGPT: Implements fade-out effect
  }

  finished() {
    return this.alpha < 0; // ✅ ChatGPT: Removes fully faded particles
  }

  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}
```

---

3. Problem-Solving & Debugging 

3.1 Initial Issues & Fixes
❌ Particles accumulating infinitely, causing performance issues  
✅ Implemented `splice(i, 1)` to remove faded particles and prevent memory leaks.  

❌ Microphone input too sensitive, generating excessive particles
✅ Mapped `mic.getLevel()` to limit the maximum number of particles dynamically.  

❌Particles moving too fast or too slow 
✅ Adjusted velocity range (`vx`, `vy`) to ensure natural motion**.  

---


Key Takeaways from AI Assistance:  
- Learned how to limit particle array size to prevent memory overflow.  
- Understood how `p5.AudioIn()` works and how to map input levels correctly.  
- Improved efficiency by using object-oriented programming principles.  

---


