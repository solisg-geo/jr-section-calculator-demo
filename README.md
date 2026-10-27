# Geo Section Calculator

Calculadora interactiva de propiedades geométricas de una sección rectangular sólida. Interfaz en español, adaptable a móviles, con dibujo SVG proporcional y ejes centroidales X-X e Y-Y. Todos los cálculos se realizan localmente, sin servicios externos ni dependencias de terceros.

## Ejecutar

Requisitos: Node.js 18 o posterior (incluye npm) y Python 3.

Desde la carpeta del repositorio:

```sh
npm start
```

Abre `http://localhost:8000` en un navegador en la misma máquina. Si trabajas en un entorno remoto, reenvía el puerto 8000 a tu equipo mediante las herramientas de tu IDE o conexión remota, y abre el puerto reenviado. El servidor escucha en todas las interfaces para permitir ese acceso. Detén el servidor con Ctrl+C. No hace falta ejecutar `npm install`.

Introduce la base y altura en mm: el dibujo y los resultados cambian inmediatamente. Los valores iniciales son 200 × 300 mm. El botón «Restablecer dimensiones» recupera esos valores. Las entradas vacías, no positivas o fuera del rango numérico muestran un mensaje y ocultan los resultados anteriores.

## Pruebas

```sh
npm test
```

Las pruebas con `node:test` verifican el rectángulo de 200 × 300 mm, el cuadrado unitario, valores decimales, el intercambio de ejes y entradas inválidas o fuera de rango.

## Propiedades y convenciones

La base b es horizontal y la altura h es vertical. Ambos ejes pasan por el centroide (b/2, h/2).

| Propiedad | Fórmula | Unidad |
| --- | --- | --- |
| Área A | b × h | mm² |
| Inercia Ix | b × h³ / 12 | mm⁴ |
| Inercia Iy | h × b³ / 12 | mm⁴ |
| Módulo Sx | b × h² / 6 | mm³ |
| Módulo Sy | h × b² / 6 | mm³ |
| Radio rx | √(Ix/A) = h/√12 | mm |
| Radio ry | √(Iy/A) = b/√12 | mm |

Los resultados se muestran con hasta tres decimales; valores muy grandes o pequeños usan notación científica. Los cálculos conservan la precisión de los números de JavaScript. El dibujo se ajusta al panel conservando la relación b/h; las proporciones extremas pueden producir líneas visualmente muy delgadas.

## Archivos

- `calculations.js`: funciones puras de cálculo y validación, independientes de la interfaz.
- `calculations.test.js`: pruebas automatizadas.
- `index.html`, `styles.css`, `app.js`: interfaz, dibujo SVG y actualización de resultados.

No hay compilación, base de datos, claves ni servicios adicionales. El servidor de Python es solo para desarrollo.
