import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Simulator from './Simulator';

export default class WebGL {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  dpr: number;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  scene: Scene;
  simulator: Simulator;
  clock: { elapsed: number, delta: number, last: number, frame: number };
  
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(2, window.devicePixelRatio);

    this.renderer = new WebGLRenderer({
      alpha: true
    });
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height);
    this.canvas = this.renderer.domElement;

    this.camera = new PerspectiveCamera(
      45,
      this.width / this.height,
      .1,
      100
    );
    this.camera.position.z = 10;

    this.scene = new Scene();
    this.simulator = new Simulator(this.renderer);

    this.clock = {
      elapsed: 0,
      delta: 0,
      last: 0,
      frame: 0
    };
  }

  update(timestamp: number) {
    if (!this.clock.last) this.clock.last = timestamp;
    this.clock.delta = (timestamp - this.clock.last) * .001;
    this.clock.elapsed += this.clock.delta;
    this.clock.last = timestamp;
    this.clock.frame++;
  }

  render() {
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(2, window.devicePixelRatio);

    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height);

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
}