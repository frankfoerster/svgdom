import { copyFileSync, mkdirSync } from 'node:fs';

const destination = new URL('../dist/fonts/', import.meta.url);
mkdirSync(destination, { recursive: true });
for (const name of ['OpenSans-Regular.ttf', 'Apache License.txt']) {
  copyFileSync(
    new URL('../fonts/' + name, import.meta.url),
    new URL(name, destination)
  );
}
