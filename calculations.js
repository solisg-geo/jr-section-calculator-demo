/** Propiedades de un rectángulo sólido respecto a sus ejes centroidales (mm). */
export function calculateRectangle(b, h) {
  if (![b, h].every(value => typeof value === 'number' && Number.isFinite(value) && value > 0)) {
    throw new RangeError('La base y la altura deben ser números positivos y finitos.');
  }
  const A = b * h;
  const Ix = b * h ** 3 / 12;
  const Iy = h * b ** 3 / 12;
  const Sx = b * h ** 2 / 6;
  const Sy = h * b ** 2 / 6;
  const rx = h / Math.sqrt(12);
  const ry = b / Math.sqrt(12);
  const result = { A, Ix, Iy, Sx, Sy, rx, ry };
  if (!Object.values(result).every(value => Number.isFinite(value) && value > 0)) {
    throw new RangeError('Las dimensiones exceden el rango numérico admitido.');
  }
  return result;
}
