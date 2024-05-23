import WebGL from "./webgl";

function app() {
  const webgl = new WebGL();
  document.body.appendChild(webgl.canvas);

  window.addEventListener('resize', handleResize);
  raf(0);
  
  function handleResize() {
    webgl.resize();
  }
  
  function raf(timestamp: number) {
    webgl.update(timestamp);
    webgl.render();
    requestAnimationFrame(raf);
  }
}

app();