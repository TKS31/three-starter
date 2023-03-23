import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Ticker } from '../utils/Ticker';
import { Size } from '../utils/Size';
import { id } from '../helpers/dom';

class Webgl {
  constructor() {
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      canvas: id('canvas'),
      alpha: false
    });
    this.renderer.setPixelRatio(Size.dpr);
    this.renderer.setSize(Size.width, Size.height);

    this.camera = new PerspectiveCamera(
      45,
      Size.width / Size.height,
      0.1,
      100
    );
    this.camera.position.z = 10;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resizeId = Size.addResizeHandler(this.onResize.bind(this), 10);
    this.tickId = Ticker.add(this.update.bind(this), 10);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.renderer.setPixelRatio(Size.dpr);
    this.renderer.setSize(Size.width, Size.height);

    this.camera.aspect = Size.width / Size.height;
    this.camera.updateProjectionMatrix();
  }

  get viewSize() {
    const fovInRadian = this.camera.fov * Math.PI / 180;
    const height = Math.tan(fovInRadian / 2) * this.camera.position.z * 2;
    const width = height * this.camera.aspect;
    return { width, height };
  }
}

const webgl = new Webgl();

export function useWebgl() {
  return webgl;
};
