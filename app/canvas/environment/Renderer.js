import { WebGLRenderer } from "three";
import Size from "../../utils/Size";

export default class Renderer extends WebGLRenderer {
  constructor() {
    super({
      canvas: document.getElementById('canvas'),
      alpha: false
    });
    this.setPixelRatio(Size.pixelRatio);
    this.setSize(Size.width, Size.height);
  }

  onResize() {
    this.setPixelRatio(Size.pixelRatio);
    this.setSize(Size.width, Size.height);
  }
}