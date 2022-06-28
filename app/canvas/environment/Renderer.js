import { WebGLRenderer } from "three";
import Size from "../../utils/Size";
import Canvas from "../Canvas";

export default class Renderer extends WebGLRenderer {
  constructor() {
    super({
      canvas: document.getElementById('canvas'),
      alpha: false
    });
    this.setPixelRatio(Size.pixelRatio);
    this.setSize(Size.width, Size.height);
  }

  update() {
    this.render(Canvas.scene, Canvas.camera);
  }

  onResize() {
    this.setPixelRatio(Size.pixelRatio);
    this.setSize(Size.width, Size.height);
  }
}