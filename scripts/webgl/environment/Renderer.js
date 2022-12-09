import { ACESFilmicToneMapping, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from "three";
import { Size } from "../../utils/Size";

export default class Renderer extends WebGLRenderer {
  constructor() {
    super({
      canvas: document.getElementById('canvas'),
      alpha: false
    });
    this.setPixelRatio(Size.dpr);
    this.setSize(Size.width, Size.height);
  }

  renderPhisicalyBased() {
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;
    this.physicallyCorrectLights = true;
    this.outputEncoding = sRGBEncoding;
    this.toneMapping = ACESFilmicToneMapping;
  }

  onResize() {
    this.setPixelRatio(Size.dpr);
    this.setSize(Size.width, Size.height);
  }
}