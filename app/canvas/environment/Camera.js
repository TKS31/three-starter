import { PerspectiveCamera } from "three";

export default class Camera {
  constructor({ size }) {
    this.size = size;
    this.setInstance();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      60,
      this.size.width / this.size.height,
      0.1,
      20
    );
    this.instance.position.z = 10;
  }

  getViewSize() {
    const fovInRadian = this.instance.fov * Math.PI / 180;
    const height = Math.tan(fovInRadian / 2) * this.instance.position.z * 2;
    const width = height * this.instance.aspect;
    return { width, height };
  }

  onResize({ size }) {
    this.size = size;
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
  }
}