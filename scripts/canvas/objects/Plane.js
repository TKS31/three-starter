import { PlaneGeometry, ShaderMaterial, Mesh } from "three";
import vertexShader from '../shaders/plane/vertex.glsl';
import fragmentShader from '../shaders/plane/fragment.glsl';
import Size from "../../utils/Size";

export default class Plane {
  constructor() {
    this.createMesh();
  }

  createMesh() {
    const geometry = new PlaneGeometry(2, 2, 64, 64);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: Size.width / Size.height }
      }
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
  }

  update({ elapsedTime }) {
    this.mesh.material.uniforms.uTime.value = elapsedTime;
  }

  onResize() {
    this.mesh.material.uniforms.uAspect.value = Size.width / Size.height;
  }
}