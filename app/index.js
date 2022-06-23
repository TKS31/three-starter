import Canvas from './canvas/Canvas.js';
import Cube from './canvas/objects/Cube.js';
import Time from './utils/Time.js';

class App {
  constructor() {
    this.createCube();
    this.timeoutId = null;
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  createCube() {
    this.cube = new Cube();
  }

  update(timestamp) {
    if (!Time.previous) Time.previous = timestamp;
    Time.delta = (timestamp - Time.previous) / 1000;
    Time.previous = timestamp;
    Time.elapsed = (Date.now() - Time.start) / 1000;
    
    Canvas.update();

    if (this.cube) this.cube.update();

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