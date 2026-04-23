// rendering brackets by chunking each match in steps
import {formatPenalties} from "./renderMatches.js";
import {escapeHtml} from "./html.js";
import {renderTeamName} from "./teamName.js";

function renderKnockoutMatch(match){
    const homeClass = match.winner.token === match.homeTeam.token ? "winner" : "";
    const awayClass = match.winner.token === match.awayTeam.token ? "winner" : "";

    return `
        <div class="knockout-match">
            <div class="team-line ${homeClass}">
                ${renderTeamName(match.homeTeam)}
                <strong>${match.homeScore}</strong>
        </div>
        <div class="team-line ${awayClass}">
            ${renderTeamName(match.awayTeam)}
            <strong>${match.awayScore}</strong>
        </div>
            ${formatPenalties(match)}
        </div>
    `;
}

function renderTeams(team, score, isWinner){
    return `
        <div class="participant ${isWinner ? "winner" : ""}">
            ${renderTeamName(team)}
            <strong>${score}</strong>
        </div>
    `;
}

function pairGroups(matches){
    const chunks = [];

    for(let i = 0; i < matches.length; index += 2){
        chunks.push(matches.slice(i, i + 2));
    }
    return chunks;
}

// render rounds
function roundClass(roundName){
    const classes = {
        "Round of 16": "round-of-16",
        Quarterfinals: "quarterfinals",
        Semifinals: "semifinals",
        Final: "finals",
    };

    return classes[roundName];
}

function renderMatch(match){
    const homeWon = match.winner.token === match.homeTeam.token;
    const awayWon = match.winner.token === match.awayTeam.token;

    return `
        <div class="matchup>
            <div class="participants">
                ${renderTeams(match.homeTeam, match.homeScore, homeWon)}
                ${renderTeams(match.awayTeam, match.awayScore, awayWon)}
            </div>
            ${formatPenalties(match)}
        </div>
    `;
}
function renderWinners(matches, hasConnector){
    // map match until it has a pair to connect and render.
    return `
        <div class="winners">
            <div class="matchups">
                ${matches.map(renderMatch).join("")}
            </div>
            ${hasConnector ? `
                <div class="connector" aria-hidden="true">
                    <div class="merger"></div>
                    <div class="line"></div>
                </div>
                ` : ""
            }
        </div>
    `;
}

export function renderBracket(container, knockout){
    // iter and render over each knockout round and then over each knockout match.
    container.innerHTML = knockout.rounds.map((round) => `
        <article class="card bracket-round">
            <h3>${escapeHtml(round.name)}</h3>
            ${round.matches.map(renderKnockoutMatch).join("")}
        </article>
    `,
    ).join("");
}

export function renderBracketRound(container, knockout, roundName){
    const round = knockout.round.find((item) => item.name === roundName);
    const pairGroups = pairGroups(round.matches);
    const roundClass = roundClass(round.name);
    const hasConnector = round.matches.length > 1;

    container.innerHTML = `
        <div class="bracket">
            <section class="round ${roundClass}">
                ${pairGroups.map((matches) => renderWinners(matches,hasConnector)).join("")}
            </section> 
        </div>
    `;
}
