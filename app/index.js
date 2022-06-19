import Canvas from './canvas/Canvas.js';
import Cube from './canvas/objects/Cube.js';

class App {
  constructor() {
    this.timeoutId = null;
    this.previousTime = null;
    this.createCube();
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  createCube() {
    this.cube = new Cube();
  }

  update(timestamp) {
    if (!this.previousTime) this.previousTime = timestamp;
    const deltaTime = (timestamp - this.previousTime) / 1000;
    this.previousTime = timestamp;
    
    Canvas.update({ deltaTime });

    if (this.cube) this.cube.update({ deltaTime });

    window.requestAnimationFrame(this.update.bind(this));
  }

  addEvents() {
    window.addEventListener('resize', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.onResize.bind(this), 200);
    });
  }

  onResize() {
    Canvas.onResize();

    if (this.cube) this.cube.onResize();
  }
}

new App();