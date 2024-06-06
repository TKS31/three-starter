import WebGLCanvas from "./components/webgl-canvas";

function app() {
  const webgl = new WebGLCanvas();

  window.addEventListener('resize', handleResize);
  raf();
  
  function handleResize() {
    webgl.resize(window.innerWidth, window.innerHeight);
  }
  
  function raf() {
    webgl.update();
    requestAnimationFrame(raf);
  }
}

app();