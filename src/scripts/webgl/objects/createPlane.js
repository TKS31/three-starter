import { PlaneGeometry, ShaderMaterial, Mesh } from "three";
import vertexShader from '../shaders/plane/vertex.glsl';
import fragmentShader from '../shaders/plane/fragment.glsl';

export function createPlane() {
  const geometry = new PlaneGeometry();
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader
  });

  const mesh = new Mesh(geometry, material);

  return mesh;
}