import { GROUP_NAMES, shuffle } from "./utils.js";

export function createGroups(teams){
    
    const shuffledTeams = shuffle(teams);

    const groups = GROUP_NAMES.map((name, index) => ({
        name,
        teams: shuffledTeams.slice(index * 4, index * 4 + 4)
    }));
    return groups;
}

// group match "scheduler" in round-robin
export function generateGroupFixtures(group){
    const [team1, team2, team3, team4] = group.teams;

    return [
        [1, team1, team2],
        [1, team3, team4],
        [2, team1, team3],
        [2, team2, team4],
        [3, team1, team4],
        [3, team2, team3],
    ].map(([round, homeTeam, awayTeam], index) => ({
        id: `${group.name}-${index + 1}`,
        group: group.name,
        stage: "Group Stage",
        round,
        matchNumber: index + 1,
        homeTeam,
        awayTeam,
    }));
}

export function generateAllGroupFixtures(groups){
    return groups.map((group) => ({
        group: group.name,
        matches: generateGroupFixtures(group)
    }));
}
