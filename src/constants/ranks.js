/**
 * RANKS: таблица рангов с порогами побед и цветами.
 * calculateRank(totalWins) - возвращает ключ текущего ранга.
 * getRankProgress(totalWins) - прогресс [0..1] до следующего ранга.
 */

export const RANKS = {
  'D': { wins_required: 0, color: '#9CA3AF' },
  'D+': { wins_required: 10, color: '#93C5FD' },
  'D++': { wins_required: 20, color: '#60A5FA' },
  'C': { wins_required: 30, color: '#3B82F6' },
  'C+': { wins_required: 45, color: '#2563EB' },
  'B': { wins_required: 60, color: '#1D4ED8' },
  'B+': { wins_required: 80, color: '#7C3AED' },
  'A': { wins_required: 100, color: '#A78BFA' },
  'A+': { wins_required: 130, color: '#F97316' },
  'S': { wins_required: 170, color: '#F59E0B' },
  'SS': { wins_required: 220, color: '#EF4444' },
  'SSS': { wins_required: 300, color: '#DC2626' },
};

const sortedRanks = Object.entries(RANKS)
  .map(([key, v]) => ({ key, wins_required: v.wins_required, color: v.color }))
  .sort((a, b) => a.wins_required - b.wins_required);

export function calculateRank(totalWins) {
  let current = sortedRanks[0].key;
  for (let i = 0; i < sortedRanks.length; i++) {
    if (totalWins >= sortedRanks[i].wins_required) {
      current = sortedRanks[i].key;
    } else break;
  }
  return current;
}

export function getRankProgress(totalWins) {
  for (let i = 0; i < sortedRanks.length; i++) {
    const cur = sortedRanks[i];
    const next = sortedRanks[i + 1];
    if (totalWins >= cur.wins_required && (!next || totalWins < next.wins_required)) {
      if (!next) return 1;
      const span = next.wins_required - cur.wins_required;
      const progress = (totalWins - cur.wins_required) / (span || 1);
      return Math.max(0, Math.min(1, progress));
    }
  }
  return 0;
}