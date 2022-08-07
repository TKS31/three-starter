import { SphereBufferGeometry, ShaderMaterial, Mesh } from "three";
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import Time from '../../utils/Time';

export default class Sphere {
  constructor() {
    this.createMesh();
  }

  createMesh() {
    const geometry = new SphereBufferGeometry(3, 64, 64);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 }
      }
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
  }

  update() {
    this.mesh.material.uniforms.uTime.value = Time.elapsed;
  }

  onResize() {

  }
}