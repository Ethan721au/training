export default function resultSelector(results: string[], opponents: object[]) {
  const winProbability =
    opponents[0].elo / (opponents[0].elo + opponents[1].elo);

  const outcome = Math.random() < winProbability ? "win" : "loss";

  return outcome;
}
