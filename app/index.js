import Canvas from './canvas/Canvas.js';
import Sphere from './canvas/objects/Sphere.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.sphere = new Sphere();
    this.timeoutId = null;
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    Canvas.update();

    if (this.sphere) this.sphere.update();

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

    if (this.sphere) this.sphere.onResize();
  }
}

new App();