// Renders scripts/assets/*.html to the static brand assets with headless Chrome:
//   public/og.png (1200×630), src/app/icon.png (512), src/app/apple-icon.png (180),
//   src/app/favicon.ico (16/32/48).
// Usage: pnpm assets   (set CHROME_PATH if Chrome is not in a standard location)
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { crc32, deflateSync, inflateSync } from 'node:zlib';

const root = fileURLToPath(new URL('..', import.meta.url));
const asset = (name) => pathToFileURL(join(root, 'scripts/assets', name)).href;

const chromePath =
  process.env.CHROME_PATH ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find(existsSync);
if (!chromePath) throw new Error('Chrome not found; set CHROME_PATH.');

const port = 9222 + Math.floor(Math.random() * 1000);
const profile = mkdtempSync(join(tmpdir(), 'render-assets-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--hide-scrollbars',
  '--no-first-run',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect() {
  for (let attempt = 0; attempt < 50; attempt++) {
    await sleep(200);
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
  }
  throw new Error('Could not connect to Chrome.');
}

const ws = new WebSocket(await connect());
await new Promise((resolve) => ws.addEventListener('open', resolve));
let nextId = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  pending.get(message.id)?.(message);
  pending.delete(message.id);
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, (message) =>
      message.error ? reject(new Error(message.error.message)) : resolve(message.result),
    );
    ws.send(JSON.stringify({ id, method, params }));
  });

/** Lays the page out at width×height, then captures it scaled to `outputWidth`. */
async function render(url, width, height, outputWidth = width) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await sleep(300);
  await send('Runtime.evaluate', {
    expression: 'document.fonts.ready.then(() => document.fonts.size)',
    awaitPromise: true,
  });
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width, height, scale: outputWidth / width },
  });
  return Buffer.from(data, 'base64');
}

/**
 * Chrome saves opaque screenshots as 8-bit RGB; Next's .ico decoder only accepts RGBA.
 * Decodes the scanlines, adds an opaque alpha channel and re-encodes.
 */
function toRgba(png) {
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idat = [];
  for (let pos = 8; pos < png.length; ) {
    const length = png.readUInt32BE(pos);
    const type = png.toString('ascii', pos + 4, pos + 8);
    const data = png.subarray(pos + 8, pos + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9];
      if (data[8] !== 8 || data[12] !== 0) throw new Error('Expected 8-bit, non-interlaced PNG.');
    }
    if (type === 'IDAT') idat.push(data);
    pos += 12 + length;
  }
  if (colorType === 6) return png;
  if (colorType !== 2) throw new Error(`Unsupported PNG color type ${colorType}.`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * 3;
  const rgb = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const left = x >= 3 ? rgb[y * stride + x - 3] : 0;
      const up = y > 0 ? rgb[(y - 1) * stride + x] : 0;
      const upLeft = x >= 3 && y > 0 ? rgb[(y - 1) * stride + x - 3] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = up;
      else if (filter === 3) predictor = (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const [pa, pb, pc] = [Math.abs(p - left), Math.abs(p - up), Math.abs(p - upLeft)];
        predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
      }
      rgb[y * stride + x] = (line[x] + predictor) & 0xff;
    }
  }

  const rgba = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const from = y * stride + x * 3;
      const to = y * (width * 4 + 1) + 1 + x * 4;
      rgb.copy(rgba, to, from, from + 3);
      rgba[to + 3] = 0xff;
    }
  }

  const chunk = (type, data) => {
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc32(body), body.length + 4);
    return out;
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.set([8, 6, 0, 0, 0], 8);
  return Buffer.concat([
    png.subarray(0, 8),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(rgba)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** ICO container holding PNG images (supported by every current browser). */
function toIco(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.png)]);
}

try {
  await send('Page.enable');
  const out = (path, data) => {
    writeFileSync(join(root, path), data);
    console.log(`✓ ${path}`);
  };

  out('public/og.png', await render(asset('og.html'), 1200, 630));
  out('src/app/icon.png', await render(asset('icon.html'), 512, 512));
  out('src/app/apple-icon.png', await render(asset('icon.html'), 512, 512, 180));

  const icoImages = [];
  for (const size of [16, 32, 48]) {
    icoImages.push({ size, png: toRgba(await render(asset('icon.html'), 512, 512, size)) });
  }
  out('src/app/favicon.ico', toIco(icoImages));
} finally {
  ws.close();
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true, maxRetries: 3 });
}
