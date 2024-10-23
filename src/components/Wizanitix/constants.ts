export const startingElo = 1000;

export const maxRecentMatches = 14;

export const defaultPlayers = [
  {
    id: 1,
    name: "A",
    elo: startingElo,
    wins: 0,
    losses: 0,
  },
  {
    id: 2,
    name: "B",
    elo: startingElo,
    wins: 0,
    losses: 0,
  },
  {
    id: 3,
    name: "C",
    elo: startingElo,
    wins: 0,
    losses: 0,
  },
  {
    id: 4,
    name: "D",
    elo: startingElo,
    wins: 0,
    losses: 0,
  },
  {
    id: 5,
    name: "E",
    elo: startingElo,
    wins: 0,
    losses: 0,
  },
  {
    id: 6,
    name: "F",
    elo: startingElo,
    wins: 0,
    losses: 0,
  },
];

export const k = 32;

export const eloForumla = (elo: number, opponentElo: number) => {
  const formula =
    Math.pow(10, elo / 400) /
    (Math.pow(10, elo / 400) + Math.pow(10, opponentElo / 400));
  return formula;
};
