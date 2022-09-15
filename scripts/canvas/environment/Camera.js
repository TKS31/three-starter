import { PerspectiveCamera } from "three";

export default class Camera extends PerspectiveCamera {
  constructor() {
    super(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      20
    );
    this.position.set(0, 0, 10);
  }

  get viewPort() {
    const fovInRadian = this.fov * Math.PI / 180;
    const height = Math.tan(fovInRadian / 2) * this.position.z * 2;
    const width = height * this.aspect;
    return { width, height };
  }

  onResize() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }
}