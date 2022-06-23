import { PerspectiveCamera } from "three";
import Size from "../../utils/Size";

export default class Camera extends PerspectiveCamera {
  constructor({ fov, aspect, near, far, position }) {
    super(fov, aspect, near, far);
    this.position.set(position.x, position.y, position.z);
  }

  get viewSize() {
    const fovInRadian = this.fov * Math.PI / 180;
    const height = Math.tan(fovInRadian / 2) * this.position.z * 2;
    const width = height * this.aspect;
    return { width, height };
  }

  onResize() {
    this.aspect = Size.width / Size.height;
    this.updateProjectionMatrix();
  }
}