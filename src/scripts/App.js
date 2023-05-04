import Resizer from "@chenziappu/resizer";
import Ticker from "@chenziappu/ticker";

import { Canvas } from "./components/Canvas";

export class App {
  constructor() {
    this.init();
  }

  async init() {
    this.canvas = new Canvas();
    
    this.resizer = new Resizer({ timeout: 200 });
    this.ticker = new Ticker();

    this.resizeId = this.resizer.add(this.resize.bind(this));
    this.tickId = this.ticker.add(this.raf.bind(this));
  }

  raf({ fps, deltaTime, ratio, elapsedTime }) {
    this.canvas.raf();
  }

  resize({ width, height, dpr }) {
    this.canvas.resize({ width, height, dpr });
  }
}
