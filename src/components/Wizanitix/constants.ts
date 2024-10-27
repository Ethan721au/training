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

// MONGO_PUBLIC_KEY = eliwzfvf
// MONGO_PRIVATE_KEY = 89650af2-57d7-41b4-82c9-3c7ef5c0cfb1
// prject ID: 65de878d176d481541dd738e
