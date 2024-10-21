import { k } from "./constants";

export const determineEloScore = (
  elo: number,
  opponentElo: number,
  result: string
) => {
  const actualScore = result === "win" ? 1 : 0;
  console.log("determineEloScore");
  console.log(elo, opponentElo, actualScore);

  return (
    k *
    (actualScore -
      Math.pow(10, elo / 400) /
        (Math.pow(10, elo / 400) + Math.pow(10, opponentElo / 400)))
  );
};
