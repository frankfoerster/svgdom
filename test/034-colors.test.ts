import { expect, it } from 'vitest';
import { hexToRGB } from '../src/utils/strUtils.js';

it('converts hexadecimal colors in a map without replacing the map', () => {
  const colors = new Map([
    ['fill', '#abc'],
    ['stroke', '#123456'],
    ['color', 'red']
  ]);
  expect(hexToRGB(colors)).toBe(colors);
  expect([...colors]).toEqual([
    ['fill', 'rgb(170,187,204)'],
    ['stroke', 'rgb(18,52,86)'],
    ['color', 'red']
  ]);
});
