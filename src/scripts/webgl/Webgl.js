import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Webgl {
  constructor(canvas) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: false
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);

    this.camera = new PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );
    this.camera.position.z = 10;

    this.scene = new Scene();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  raf() {
    this.renderer.render(this.scene, this.camera);
  }

  resize({ width, height, dpr }) {
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  add(...object) {
    this.scene.add(...object);
  }

  remove(...object) {
    this.scene.remove(...object);
  }

  get viewSize() {
    const fovInRadian = this.camera.fov * Math.PI / 180;
    const height = Math.tan(fovInRadian * 0.5) * this.camera.position.z * 2;
    const width = height * this.camera.aspect;
    return { width, height };
  }
}
