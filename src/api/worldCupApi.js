import { LOCAL_TEAMS } from "../data/teams.js";

export function fetchTeams() {
    return Promise.resolve(LOCAL_TEAMS);
}

// buildFinalPayload champion API
export function buildFinal(finalResult) {
    const penalties = finalResult.final.penalties ?? { homePenalties: 0, awayPenalties: 0 };

    return {
        equipeA: finalResult.final.homeTeam.token,
        equipeB: finalResult.final.awayTeam.token,
        golsEquipeA: finalResult.final.homeScore,
        golsEquipeB: finalResult.final.awayScore,
        golsPenaltyTimeA: penalties.homePenalties,
        golsPenaltyTimeB: penalties.awayPenalties,
    };
}
