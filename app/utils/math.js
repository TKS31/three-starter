export const lerp = (from, to, t) => {
  return from + (to - from) * t;
};

export const calcDistance = (x1, y1, x2, y2) => {
  return Math.hypot(x1 - x2, y1 - y2);
};

export const map = (num, fromMin, fromMax, toMin, toMax) => {
  return ((num - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
};

export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

export const getRandomFloat = (min, max) => {
  return  Math.random() * (max - min) + min;
};

export const getRandomInt = (min, max) => {
  return Math.round(getRandomFloat(min, max));
};