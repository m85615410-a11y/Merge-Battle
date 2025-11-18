import create from 'zustand';

/**
 * Структура стора:
 * - user: профиль игрока
 * - pvp: авторитетное состояние матча (сервер)
 * - local: клиентская локальная информация (анимации, optimistic updates)
 *
 * Подписки компонентов нужно делать через селекторы, например:
 * const nickname = useGameStore(state => state.user.nickname);
 */

export const useGameStore = create((set, get) => ({
  user: {
    id: null,
    nickname: 'Игрок',
    avatar: null,
    totalWins: 0,
    totalLosses: 0,
    bestScore: 0,
    avgScore: 0,
    country: null,
  },
  setUser: (patch) => set(state => ({ user: { ...state.user, ...patch } })),

  pvp: {
    matchId: null,
    players: [], // [{ id, nickname, avatar, rank }]
    grid: null,
    gridSize: 4,
    myTurn: false,
    seed: null,
  },
  setPvp: (patch) => set(state => ({ pvp: { ...state.pvp, ...patch } })),

  local: {
    localGrid: null,
    lastMoveAt: null,
    pendingMoves: [], // оптимистичные ходы
  },
  setLocal: (patch) => set(state => ({ local: { ...state.local, ...patch } })),

  resetPvp: () => set(state => ({
    pvp: { matchId: null, players: [], grid: null, gridSize: 4, myTurn: false, seed: null },
    local: { localGrid: null, lastMoveAt: null, pendingMoves: [] },
  }))
}));
