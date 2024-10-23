import { eloForumla } from "./constants";

interface Player {
  id: number;
  name: string;
  elo: number;
  wins: number;
  losses: number;
}

export default function resultSelector(opponents: Player[]) {
  const winProbability = eloForumla(opponents[0].elo, opponents[1].elo);

  const outcome = Math.random() < winProbability ? "win" : "loss";

  return outcome;
}
