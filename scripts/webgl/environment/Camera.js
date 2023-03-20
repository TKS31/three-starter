import { PerspectiveCamera } from "three";
import { Size } from "../../utils/Size";

export class Camera extends PerspectiveCamera {
  constructor() {
    super(
      45,
      Size.width / Size.height,
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
    this.aspect = Size.width / Size.height;
    this.updateProjectionMatrix();
  }
}