import { PerspectiveCamera } from "three";
import Size from "../../utils/Size";

export default class Camera {
  constructor() {
    this.setInstance();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      60,
      Size.width / Size.height,
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

  onResize() {
    this.instance.aspect = Size.width / Size.height;
    this.instance.updateProjectionMatrix();
  }
}