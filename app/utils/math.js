export const lerp = (from, to, t) => {
  return from + (to - from) * t;
};

export const calcDistance = (x1, y1, x2, y2) => {
  return Math.hypot(x1 - x2, y1 - y2);
};

export const map = (x, fromMin, fromMax, toMin, toMax) => {
  return ((x - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
};