export const GROUP_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function getTeamName(team) {
  return team?.nome ?? "Unknown team";
}

export function getTeamToken(team) {
  return team?.token ?? team?.id ?? getTeamName(team);
}

export function sortByRound(matches) {
  return [...matches].sort((a, b) => a.round - b.round || a.matchNumber - b.matchNumber);
}
