import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { createHTMLDocument } from '../src/index.js';

describe('HTMLImageElement', function () {
  let directory;
  let imagePath;

  beforeAll(async function () {
    directory = await mkdtemp(path.join(tmpdir(), 'svgdom-'));
    imagePath = path.join(directory, 'pixel.png');
    await writeFile(
      imagePath,
      Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        'base64'
      )
    );
  });

  afterAll(async function () {
    await rm(directory, { recursive: true });
  });

  it('loads image dimensions from a file', async function () {
    const image = createHTMLDocument().createElement('img');
    const loaded = new Promise((resolve, reject) => {
      image.addEventListener('load', resolve);
      image.addEventListener('error', () => reject(new Error('load failed')));
    });

    image.src = imagePath;
    await loaded;

    expect(image.naturalWidth).toBe(1);
    expect(image.naturalHeight).toBe(1);
    expect(image.complete).toBe(true);
  });
  it.each(['missing.png', 'invalid.png'])(
    'emits an error for %s',
    async filename => {
      const failedPath = path.join(directory, filename);
      if (filename === 'invalid.png')
        await writeFile(failedPath, 'not an image');
      const image = createHTMLDocument().createElement('img');
      const failed = new Promise<void>((resolve, reject) => {
        image.addEventListener('error', () => resolve());
        image.addEventListener('load', () =>
          reject(new Error('unexpected load'))
        );
      });
      image.src = failedPath;
      await failed;
      expect(image.complete).toBe(false);
      expect(image.naturalWidth).toBe(0);
      expect(image.naturalHeight).toBe(0);
    }
  );
});
