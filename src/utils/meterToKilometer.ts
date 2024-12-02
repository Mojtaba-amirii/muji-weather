export function meterToKilometer(meter: number): string {
  const km = meter / 1000;
  return km.toFixed(0) + "km";
}
