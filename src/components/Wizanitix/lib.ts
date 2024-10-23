import { eloForumla, k } from "./constants";

export const determineEloScore = (
  elo: number,
  opponentElo: number,
  result: string
) => {
  const actualScore = result === "win" ? 1 : 0;

  return k * (actualScore - eloForumla(elo, opponentElo));
};
