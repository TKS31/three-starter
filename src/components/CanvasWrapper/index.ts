import Nodo from '@gozentyuclub/nodo'
import WebGL from '@/webgl';

export default class CanvasWrapper extends Nodo<HTMLDivElement> {
  webgl: WebGL;
  
  constructor() {
    super('canvas-wrapper');

    this.webgl = new WebGL();
    this.el.appendChild(this.webgl.canvas);
  }

  update(timestamp: number) {
    this.webgl.update(timestamp);
    this.webgl.render();
  }

  resize() {
    this.webgl.resize();
  }
}