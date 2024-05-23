import CanvasWrapper from "./components/CanvasWrapper";

function app() {
  const canvasWrapper = new CanvasWrapper();

  window.addEventListener('resize', handleResize);
  raf(0);
  
  function handleResize() {
    canvasWrapper.resize();
  }
  
  function raf(timestamp: number) {
    canvasWrapper.update(timestamp);
    requestAnimationFrame(raf);
  }
}

app();