import Canvas from './canvas/useCanvas.js';
import Sphere from './canvas/objects/Sphere.js';
import useCanvas from './canvas/useCanvas.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.canvas = useCanvas();
    this.sphere = new Sphere();
    this.canvas.scene.add(this.sphere.mesh);
    this.timeoutId = null;
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    this.canvas.update();

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
    this.canvas.onResize();

    if (this.sphere) this.sphere.onResize();
  }
}

new App();