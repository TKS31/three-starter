import WebGL from "@/webgl";
import Plane from "./Plane";

export default class WebGLApp extends WebGL {
  el: HTMLCanvasElement;
  wrapper: HTMLDivElement;
  plane: Plane;
  
  constructor() {
    super({
      antialias: true,
      alpha: false,
      stencil: false,
      powerPreference: 'default',
    });

    this.el = this.renderer.domElement;
    this.wrapper = document.querySelector('[data-el="webgl-wrapper"]') as HTMLDivElement;
    this.wrapper.appendChild(this.el);

    this.resize();

    this.plane = new Plane();
    this.scene.add(this.plane.mesh);
  }

  update(timestamp: number) {
    this.tick(timestamp);
    this.plane.update(this.time.elapsed);
    this.render();
  }

  resize() {
    super.resize(this.wrapper.clientWidth, this.wrapper.clientHeight);
  }
}