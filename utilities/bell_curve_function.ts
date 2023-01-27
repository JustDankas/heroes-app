export function BellCurve(x: number, mean = 1, variance = 0.35) {
  return (
    (1 / (variance * Math.sqrt(2 * Math.PI))) *
    Math.pow(Math.E, (-1 / 2) * Math.pow((x - mean) / variance, 2))
  );
}
