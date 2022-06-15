import { WebGLRenderer } from "three";
import Size from "../../utils/Size";
import Canvas from "../Canvas";

export default class Renderer {
  constructor() {
    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: document.getElementById('canvas'),
    });
    this.instance.setPixelRatio(Size.pixelRatio);
    this.instance.setSize(Size.width, Size.height);
  }

  update() {
    this.instance.render(Canvas.scene, Canvas.camera.instance);
  }

  onResize() {
    this.instance.setPixelRatio(Size.pixelRatio);
    this.instance.setSize(Size.width, Size.height);
  }
}