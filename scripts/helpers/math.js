export function lerp(from, to, t) {
  return from + (to - from) * t;
};

export function calcDistance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
};

export function map(num, fromMin, fromMax, toMin, toMax) {
  return ((num - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
};

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
};

export function getRandomFloat(min, max) {
  return  Math.random() * (max - min) + min;
};

export function getRandomInt(min, max) {
  return Math.round(getRandomFloat(min, max));
};