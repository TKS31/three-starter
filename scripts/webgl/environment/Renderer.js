import { WebGLRenderer } from "three";

export default class Renderer extends WebGLRenderer {
  constructor() {
    super({
      canvas: document.getElementById('canvas'),
      alpha: false
    });
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.setSize(window.innerWidth, window.innerHeight);
  }

  onResize() {
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.setSize(window.innerWidth, window.innerHeight);
  }
}