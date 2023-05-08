import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class WebGL {
  constructor({ width, height, dpr }) {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);

    this.canvas = this.renderer.domElement;

    this.camera = new PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );
    this.camera.position.z = 10;

    this.scene = new Scene();

    this.controls = new OrbitControls(this.camera, this.canvas);
  }

  add = (...obj) => {
    this.scene.add(...obj);
  }

  remove = (...obj) => {
    this.scene.remove(...obj);
  }

  render = () => {
    this.renderer.render(this.scene, this.camera);
  }

  resize = ({ width, height, dpr }) => {
    const { renderer, camera } = this;
    
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}