import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Component from '../core/Component'

export default class WebGLCanvas extends Component<HTMLCanvasElement> {
  width: number;
  height: number;
  dpr: number;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  scene: Scene;
  
  constructor() {
    super('.webgl');

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(2, window.devicePixelRatio);

    this.renderer = new WebGLRenderer({
      canvas: this.el,
      alpha: true
    });
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height);

    this.camera = new PerspectiveCamera(
      45,
      this.width / this.height,
      .1,
      100
    );
    this.camera.position.z = 10;

    this.scene = new Scene();
  }

  render() {
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