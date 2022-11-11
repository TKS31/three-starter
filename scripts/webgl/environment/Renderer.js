import { ACESFilmicToneMapping, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from "three";

export default class Renderer extends WebGLRenderer {
  constructor() {
    super({
      canvas: document.getElementById('canvas'),
      alpha: false
    });
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.setSize(window.innerWidth, window.innerHeight);
  }

  renderPhisicalyBased() {
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;
    this.physicallyCorrectLights = true;
    this.outputEncoding = sRGBEncoding;
    this.toneMapping = ACESFilmicToneMapping;
  }

  onResize() {
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.setSize(window.innerWidth, window.innerHeight);
  }
}