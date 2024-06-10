import WebGLCanvas from "./components/webgl-canvas";

function app() {
  const webgl = new WebGLCanvas();

  handleResize();
  window.addEventListener('resize', handleResize);
  
  animate(0);
  
  function handleResize() {
    webgl.resize(window.innerWidth, window.innerHeight);
  }
  
  function animate(timestamp: number) {
    webgl.update(timestamp);
    requestAnimationFrame(animate);
  }
}

app();