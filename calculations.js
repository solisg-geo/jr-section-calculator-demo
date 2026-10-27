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

/** Propiedades de un círculo sólido respecto a su eje centrado (mm). */
export function calculateCircle(r) {
  if (typeof r !== 'number' || !Number.isFinite(r) || r <= 0) {
    throw new RangeError('El radio debe ser un número positivo y finito.');
  }
  const A = Math.PI * r ** 2;
  const Ix = (Math.PI * r ** 4) / 4; // momento de inercia respecto al eje X (igual a Y)
  const Iy = Ix;
  const Sx = (Math.PI * r ** 3) / 4; // módulo de sección = I / r
  const Sy = Sx;
  const rx = r / Math.sqrt(2); // radio de giro = sqrt(I/A) = r/√2
  const ry = rx;
  const result = { A, Ix, Iy, Sx, Sy, rx, ry };
  return result;
}

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
