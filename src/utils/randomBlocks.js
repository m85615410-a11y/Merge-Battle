/**
 * Seeded RNG (mulberry32) + простая hashSeed для строк.
 * Генерация значений в диапазоне 2^9 (512) .. 2^20 (1048576).
 * Сервер генерирует seed матча; клиенты используют его для идентичной генерации.
 */

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(seed) {
  if (typeof seed === 'number') return seed >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function randomValueFromRng(rng) {
  const minPow = 9; // 2^9 = 512
  const maxPow = 20; // 2^20 = 1_048_576
  const pow = Math.floor(rng() * (maxPow - minPow + 1)) + minPow;
  return 2 ** pow;
}

export function generateSeededGrid(gridSize, seed) {
  const rng = mulberry32(hashSeed(seed));
  const grid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null));
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // вероятность появления начальной плитки — 12%
      if (rng() < 0.12) {
        grid[r][c] = randomValueFromRng(rng);
      }
    }
  }
  return grid;
}

export function generateSeededQueue(count, seed) {
  const rng = mulberry32(hashSeed(seed));
  const queue = [];
  for (let i = 0; i < count; i++) {
    queue.push(randomValueFromRng(rng));
  }
  return queue;
}