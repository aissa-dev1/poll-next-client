export function buildVotePercentage(vote: number, total: number): number {
  const percentage = Math.round((100 * vote) / total);
  return percentage;
}
