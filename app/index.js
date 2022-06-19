import Canvas from './canvas/Canvas.js';
import Cube from './canvas/objects/Cube.js';

class App {
  constructor() {
    this.timeoutId = null;
    this.startTime = null;
    this.createCube();
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  createCube() {
    this.cube = new Cube();
  }

  update(timestamp) {
    if (!this.startTime) this.startTime = timestamp;
    const elapsedTime = (timestamp - this.startTime) / 1000;
    this.startTime = timestamp;
    
    Canvas.update({ elapsedTime });

    if (this.cube) this.cube.update({ elapsedTime });

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