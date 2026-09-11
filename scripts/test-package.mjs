import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { createSVGWindow, defaults } from '@frankfoerster/svgdom';

// Use Node's real package resolution, outside Vitest's TypeScript transform.
const commonJS = createRequire(import.meta.url)('@frankfoerster/svgdom');
assert.equal(commonJS.createSVGWindow, createSVGWindow);
assert.ok(existsSync(defaults.fontDir));
const document = createSVGWindow().document;
const text = document.createElement('text');
text.textContent = 'Packaged font';
document.documentElement.appendChild(text);
const box = text.getBBox();
assert.ok(box.width > 0 && Number.isFinite(box.width));
assert.ok(box.height > 0 && Number.isFinite(box.height));
assert.match(document.documentElement.outerHTML, /Packaged font/);
console.log('Package entry points and bundled font passed.');
