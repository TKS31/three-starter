import Resizer from "@roukara/resizer";
import Ticker from "@roukara/ticker";

import { Canvas } from "./components/Canvas";

function main() {
  const canvas = new Canvas();

  const resizer = new Resizer({ timeout: 200 });
  const ticker = new Ticker();

  const resizeId = resizer.add(resize);
  const tickId = ticker.add(raf);

  function raf() {
    canvas.raf();
  }

  function resize({ width, height, dpr }) {
    canvas.resize({ width, height, dpr });
  }
}

main();
