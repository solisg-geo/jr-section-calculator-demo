import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRectangle } from './calculations.js';

test('rectángulo de 200 × 300 mm: propiedades conocidas', () => {
  const p = calculateRectangle(200, 300);
  assert.equal(p.A, 60000);
  assert.equal(p.Ix, 450000000);
  assert.equal(p.Iy, 200000000);
  assert.equal(p.Sx, 3000000);
  assert.equal(p.Sy, 2000000);
  assert.ok(Math.abs(p.rx - Math.sqrt(7500)) < 1e-10);
  assert.ok(Math.abs(p.ry - Math.sqrt(10000 / 3)) < 1e-10);
});
test('cuadrado unitario y dimensiones decimales', () => {
  const p = calculateRectangle(1, 1);
  assert.equal(p.Ix, 1 / 12);
  assert.equal(p.Iy, p.Ix);
  assert.equal(p.Sx, 1 / 6);
  assert.equal(p.rx, p.ry);
  assert.equal(calculateRectangle(2.5, 4).A, 10);
});
test('intercambiar dimensiones intercambia las propiedades de los ejes', () => {
  const a = calculateRectangle(120, 350);
  const b = calculateRectangle(350, 120);
  assert.equal(a.A, b.A);
  for (const [x, y] of [['Ix', 'Iy'], ['Sx', 'Sy'], ['rx', 'ry']]) assert.equal(a[x], b[y]);
});
test('rechaza entradas inválidas y resultados fuera de rango', () => {
  for (const value of [0, -1, NaN, Infinity, -Infinity, '', '200', null, undefined]) {
    assert.throws(() => calculateRectangle(value, 100), RangeError);
    assert.throws(() => calculateRectangle(100, value), RangeError);
  }
  assert.throws(() => calculateRectangle(1e100, 1e100), RangeError);
  assert.throws(() => calculateRectangle(1e-200, 1e-200), RangeError);
});
