import Stage from './stage.js';
import Mesh from './mesh.js';

class App {
  constructor() {
    this.stage = new Stage();
    this.mesh = new Mesh();
    this.timeoutId = null;

    window.addEventListener('resize', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.onResize.bind(this), 200);
    });

    this.render();
  }

  render() {
    this.stage.render();
    this.mesh.update();
    requestAnimationFrame(this.render.bind(this));
  }

  onResize() {
    this.stage.onResize();
    this.mesh.onResize();
  }
}

new App();