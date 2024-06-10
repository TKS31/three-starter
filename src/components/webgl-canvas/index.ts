import WebGL from "@/webgl";
import Plane from "./Plane";

export default class WebGLCanvas extends WebGL {
  el: HTMLCanvasElement;
  plane: Plane;
  
  constructor() {
    const canvas = document.querySelector('[data-el="webgl"]') as HTMLCanvasElement;
    super({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });

    this.el = canvas;

    this.plane = new Plane();
    this.scene.add(this.plane.mesh);
  }

  update(timestamp: number) {
    this.tick(timestamp);
    this.plane.update(this.time.elapsed);
    this.render();
  }
}