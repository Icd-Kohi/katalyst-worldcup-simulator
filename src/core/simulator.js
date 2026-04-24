import {randomInt} from "./utils.js";
// random score, but with weights.
export function simulateScore(){
    const weights = [0, 0, 1, 1, 1, 2, 2, 3, 4];
    return weights[randomInt(0, weights.length - 1)];
}

export function simulateGroupMatch(match){
    const awayScore = simulateScore();
    const homeScore = simulateScore();
    let winner = null;
    if (homeScore > awayScore){
        winner = match.homeTeam;
    } else if(awayScore > homeScore){
        winner = match.awayTeam;
    }; 
    return{
        ...match,
        homeScore,
        awayScore,
        winner: winner,
        isDraw:homeScore === awayScore,
        penalties: null,
    }
}
// group matches arranging
export function simulateGroupFixtures(groupFixtures){
    return groupFixtures.map(({group, matches}) => ({
        group,
        matches: matches.map(simulateGroupMatch),
    }));
}

export function simulatePenalty(){
    let homePenalties = randomInt(3,5);
    let awayPenalties = randomInt(3,5);

    while(homePenalties === awayPenalties){
        homePenalties += randomInt(0, 1);
        awayPenalties += randomInt(0, 1);
    }

    return {homePenalties, awayPenalties};
}

export function simulateKnockoutMatch(match){
    const homeScore = simulateScore();
    const awayScore = simulateScore();
    let penalties = null;
    let winnerTeam = null;
    let loserTeam = null;

    if (homeScore > awayScore){
        winnerTeam = match.homeTeam;
    }else{ 
        winnerTeam = match.awayTeam;
    }; 
    // winner
    if(homeScore === awayScore) {
        penalties = simulatePenalty();
        if (penalties.homePenalties > penalties.awayPenalties){
            winnerTeam = match.homeTeam;
        } else {
            winnerTeam = match.awayTeam;
        }; 
    }
    // loser
    if(winnerTeam.token === match.homeTeam.token){
        loserTeam = match.awayTeam; 
    } else {
        loserTeam = match.homeTeam;
    }

    return{
        ...match,
        homeScore,
        awayScore,
        penalties,
        winner: winnerTeam,
        loser: loserTeam,
        isDraw:homeScore === awayScore
    };
}
