import Resizer from "@roukara/resizer";
import Ticker from "@roukara/ticker";

import { WebGL } from "./components/Webgl";

function main() {
  const webgl = new WebGL({ alpha: true });

  const resizer = new Resizer({ timeout: 200 });
  const ticker = new Ticker();

  const resizeId = resizer.add(resize);
  const tickId = ticker.add(raf);

  function raf() {
    webgl.update();
  }

  function resize({ width, height, dpr }) {
    webgl.onResize(width, height, dpr);
  }
}

main();
