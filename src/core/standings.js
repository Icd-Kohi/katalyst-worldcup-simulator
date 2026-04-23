import {shuffle} from "./utils.js";

function createStanding(team){
    return{
        team, 
        played:0, 
        wins:0,
        draws:0,
        losses:0,
        points:0,
        goalsFor:0,
        goalsAgainst:0, 
        goalDifference:0,
    };
}

function applyMatch(standing, goalsFor, goalsAgainst){
    standing.played += 1;
    standing.goalsFor += goalsFor;
    standing.goalsAgainst += goalsAgainst;
    standing.goalsDifference = standing.goalsFor - standing.goalsAgainst;

    if(goalsFor > goalsAgainst){
        standing.wins += 1;
        standing.points += 3;
    }else if(goalsFor === goalsAgainst){
        standing.draws += 1;
        standing.points += 1;
    }else {
        standing.losses += 1;
    }
}
export function rankStandings(standings){
    return shuffle(standings).sort((teamA, teamB) => {
        if(teamB.points !== teamA.points){
            return teamB.points - teamA.points;
        }

        if(teamB.goalDifference !== teamA.goalDifference){
            return teamB.goalDifference - teamA.goalDifference;
        }
    });
}

export function calculateGroupStandings(group, matches){
    // table of teams
    const table = new Map(group.teams.map((teams) => [
        teams.token, createStanding(teams)
    ]));

    matches.forEach((match) => {
        applyMatch(table.get(match.homeTeam.token), match.homeScore, match.awayScore);   
        applyMatch(table.get(match.awayTeam.token), match.awayScore, match.homeScore);   
    });
    return rankStandings([...table.values()]);
}

export function calculateAllStandings(groups, simulatedFixtures){
    return groups.map((group) => {
        const fixtureGroup = simulatedFixtures.find((fixtures) => {
            fixtures.group === group.name
    }); 
        return {
            group: group.name,
            standings: calculateGroupStandings(group, fixtureGroup.matches),
        };
    });
}

export function getQualifiedTeams(groupStandings){
    const qualified = {};

    groupStandings.forEach(({group, standings}) => {
        qualified[group] = {
            first: standings[0].team,
            second: standings[1].team
        };
    });
    return qualified;
}
