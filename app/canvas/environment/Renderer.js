import { WebGLRenderer } from "three";

export default class Renderer {
  constructor({ size }) {
    this.size = size;
    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: document.getElementById('canvas'),
    });
    this.instance.setPixelRatio(this.size.pixelRatio);
    this.instance.setSize(this.size.width, this.size.height);
  }

  update({ scene, camera }) {
    this.instance.render(scene, camera);
  }

  onResize({ size }) {
    this.size = size;
    this.instance.setPixelRatio(this.size.pixelRatio);
    this.instance.setSize(this.size.width, this.size.height);
  }
}