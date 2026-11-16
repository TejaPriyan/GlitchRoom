import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');

test('index.html uses relative favicon links and valid verification meta', () => {
  assert.doesNotMatch(html, /href="\/(?:favicon|apple-touch-icon)/);
  assert.doesNotMatch(html, /content="google[0-9a-f]+\.html"/);
  assert.match(html, /href="favicon\.ico"/);
  assert.match(html, /href="favicon-32x32\.png"/);
});

test('js/main.js avoids Phase 4 TDZ tx/ty shadow and wires Room 02 exit check on repair', () => {
  assert.doesNotMatch(mainJs, /let\s+z=1,rr=0,tx=0,ty=0/);
  assert.match(mainJs, /function checkR2Exit\(\)/);
  assert.match(mainJs, /r2Solved=1;touch\(o\);checkR2Exit\(\)/);
  assert.match(mainJs, /clearInterval\(goR6\.iv\);clearInterval\(goR7\.iv\)/);
});
