export function getSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: Math.min(window.devicePixelRatio, 2)
  };
}
