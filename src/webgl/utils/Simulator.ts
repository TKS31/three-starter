import { Camera, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, type RawShaderMaterial, type WebGLRenderTarget, WebGLRenderer } from "three";

export class Simulator {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  mesh: Mesh;
  
  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;
    this.scene = new Scene();
    this.camera = new Camera();
    this.mesh = new Mesh(
      new PlaneGeometry(2, 2),
      new MeshBasicMaterial()
    );
    this.scene.add(this.mesh);
  }

  render(target: WebGLRenderTarget, material: RawShaderMaterial) {
    this.renderer.setRenderTarget(target);
    this.mesh.material = material;
    this.renderer.render(this.scene, this.camera);
  }
}