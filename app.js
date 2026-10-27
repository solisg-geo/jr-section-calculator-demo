import { calculateRectangle } from './calculations.js';

const form = document.querySelector('#dimensions');
const base = document.querySelector('#base');
const height = document.querySelector('#height');
const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 });
const scientific = new Intl.NumberFormat('es-ES', { notation: 'scientific', maximumFractionDigits: 4 });
const format = value => value >= 1e12 || (value > 0 && value < .001) ? scientific.format(value) : number.format(value);
const properties = [
  ['A', 'Área', 'b × h', 'mm²'],
  ['Ix', 'Momento de inercia', 'b × h³ / 12', 'mm⁴'],
  ['Iy', 'Momento de inercia', 'h × b³ / 12', 'mm⁴'],
  ['Sx', 'Módulo de sección', 'b × h² / 6', 'mm³'],
  ['Sy', 'Módulo de sección', 'h × b² / 6', 'mm³'],
  ['rx', 'Radio de giro', '√(Ix / A)', 'mm'],
  ['ry', 'Radio de giro', '√(Iy / A)', 'mm'],
];

function draw(b, h) {
  const scale = Math.min(270 / b, 270 / h);
  const w = b * scale, d = h * scale, x = 250 - w / 2, y = 205 - d / 2;
  document.querySelector('#svg-description').textContent = `Base ${format(b)} mm y altura ${format(h)} mm. Ejes X-X horizontal e Y-Y vertical en el centroide.`;
  document.querySelector('#geometry').innerHTML = `
    <rect x="${x}" y="${y}" width="${w}" height="${d}" fill="#d9eeea" stroke="#277f7a" stroke-width="2"/>
    <rect x="${x}" y="${y}" width="${w}" height="${d}" fill="url(#hatch)"/>
    <g stroke="#bb8250" stroke-width="1.3" stroke-dasharray="9 5 2 5"><path d="M 48 205 H 452"/><path d="M 250 30 V 380"/></g>
    <g fill="#a56e3f" font-size="13" font-weight="600"><text x="35" y="198">X</text><text x="455" y="198">X</text><text x="260" y="34">Y</text><text x="260" y="382">Y</text></g>
    <circle cx="250" cy="205" r="4" fill="#277f7a" stroke="white" stroke-width="2"/>
    <g stroke="#789099" stroke-width="1"><path d="M ${x} ${y+d+8} V 406 M ${x+w} ${y+d+8} V 406 M ${x+w+8} ${y} H 425 M ${x+w+8} ${y+d} H 425" opacity=".6"/><path d="M ${x} 398 H ${x+w}" marker-start="url(#arrow)" marker-end="url(#arrow)"/><path d="M 416 ${y} V ${y+d}" marker-start="url(#arrow)" marker-end="url(#arrow)"/></g>
    <g fill="#526d78" font-size="13"><text x="250" y="426" text-anchor="middle">b = ${format(b)} mm</text><text x="434" y="205" text-anchor="middle" transform="rotate(-90 434 205)">h = ${format(h)} mm</text></g>`;
}

function update() {
  let values;
  let error = '';
  try { values = calculateRectangle(base.valueAsNumber, height.valueAsNumber); }
  catch (e) { error = e.message; }
  for (const input of [base, height]) input.setAttribute('aria-invalid', String(!Number.isFinite(input.valueAsNumber) || input.valueAsNumber <= 0));
  document.querySelector('#error').textContent = error;
  document.querySelector('#section-svg').toggleAttribute('hidden', Boolean(error));
  document.querySelector('#invalid-view').hidden = !error;
  document.querySelector('#results').innerHTML = properties.map(([key, label, formula, unit], index) => `<div class="property ${index === 0 ? 'area' : ''}"><div class="property-label"><span>${label} <b>${key}</b></span><small>${formula}</small></div><div class="property-value">${values ? format(values[key]) : '—'} <span>${unit}</span></div></div>`).join('');
  if (values) draw(base.valueAsNumber, height.valueAsNumber);
}
form.addEventListener('input', update);
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('reset', () => requestAnimationFrame(update));
update();
