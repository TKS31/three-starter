export class MathUtils {
  static lerp(from, to, t) {
    return from + (to - from) * t;
  };
  
  static distance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  };
  
  static map(value, fromMin, fromMax, toMin, toMax) {
    return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
  };
  
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  };
  
  static random(min, max) {
    return  Math.random() * (max - min) + min;
  };
}
