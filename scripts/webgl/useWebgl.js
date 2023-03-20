import { Scene } from 'three';
import { Renderer } from './environment/Renderer.js';
import { Camera } from './environment/Camera.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Ticker } from '../utils/Ticker.js';
import { Size } from '../utils/Size.js';

let instance;

class Webgl {
  constructor() {
    this.scene = new Scene();
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.viewPort = this.camera.viewPort;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.resizeId = Size.addResizeHandler(this.onResize.bind(this), 10);
    this.tickId = Ticker.add(this.update.bind(this), 10);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.renderer.onResize();
    this.camera.onResize();
    this.viewPort = this.camera.viewPort;
  }
}

export function useWebgl() {
  return instance || (instance = new Webgl());
};
