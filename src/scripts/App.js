import Resizer from "@chenziappu/resizer";
import Ticker from "@chenziappu/ticker";

import { Webgl } from "./webgl/Webgl";
import { Plane } from "./webgl/objects/Plane";
import { $ } from "./helpers/dom";

export class App {
  constructor() {
    this.init();
  }

  async init() {
    this.resizer = new Resizer({ timeout: 200 });
    this.ticker = new Ticker();

    this.webgl = new Webgl($('.canvas'));

    this.plane = new Plane();
    this.webgl.add(this.plane.mesh);

    this.resizeId = this.resizer.add(this.resize.bind(this));
    this.tickId = this.ticker.add(this.raf.bind(this));
  }

  raf({ fps, deltaTime, ratio, elapsedTime }) {
    this.webgl.raf();
  }

  resize({ width, height, dpr }) {
    this.webgl.resize({ width, height, dpr });
  }
}
