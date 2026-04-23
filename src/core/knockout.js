import { simulateKnockoutMatch } from "./simulator";

export const KNOCKOUT_ROUNDS = [
    { name: "Round of 16", matchCount: 8 },
    { name: "Quarterfinals", matchCount: 4 },
    { name: "Semifinals", matchCount: 2 },
    { name: "Final", matchCount: 1 },
];
export const PAIRINGS = [
        ["A", "first", "B", "second"],
        ["C", "first", "D", "second"],
        ["E", "first", "F", "second"],
        ["G", "first", "H", "second"],
        ["B", "first", "A", "second"],
        ["D", "first", "C", "second"],
        ["F", "first", "E", "second"],
        ["H", "first", "G", "second"],
];

function buildNextRound(previousRound, stageName){
    const matches = [];

    for (let i = 0; i < previousRound.matches.length; i += 2){
        matches.push({
            id: `${stageName}-${matches.length + 1}`,
            stage: stageName,
            matchNumber: matches.length + 1,
            homeTeam: previousRound.matches[i].winner,
            awayTeam: previousRound.matches[i + 1].winner
        });
    }
    return matches;
}

export function buildRoundOf16(qualifiedTeams){
    return PAIRINGS.map(([homeGroup, homeRank, awayGroup, awayRank], index) => ({
        id: `R16-${index + 1}`,
        stage: "Round of 16",
        matchNumber: index + 1,
        hometeam: qualifiedTeams[homeGroup][homeRank],
        awayTeam: qualifiedTeams[awayGroup][awayRank]
    }));
}

export function startKnockout(qualifiedTeams) {
    const rounds = [];

    let currentMatches = buildRoundOf16(qualifiedTeams);

    KNOCKOUT_ROUNDS.forEach((roundConfig, roundIndex) => {
        const matches = currentMatches.map(simulateKnockoutMatch);
        rounds.push({
            name: roundConfig.name,
            matches
        })
        // build round until the end of the rounds.
        if(roundIndex < KNOCKOUT_ROUNDS.length - 1) {
            currentMatches = buildNextRound(rounds[rounds.length -1], KNOCKOUT_ROUNDS[roundIndex + 1].name);
        }
    });

    const final = rounds.at(-1).matches[0];

    return{
        rounds,
        champion: final.winner,
        runnerUp: final.loser,
        final
    };
}
