import { Scene } from 'three';
import Renderer from './environment/Renderer.js';
import Camera from './environment/Camera.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let instance = null;

class Canvas {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.scene = new Scene();
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.viewPort = this.camera.viewPort;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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

const useCanvas = () => {
  if (!instance) instance = new Canvas();
  return instance;
};

export default useCanvas;