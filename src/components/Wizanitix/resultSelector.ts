export default function resultSelector(
  results: string[]
  // probabilities: object
) {
  const randomResult = results[Math.floor(Math.random() * results.length)];
  return randomResult;
}
