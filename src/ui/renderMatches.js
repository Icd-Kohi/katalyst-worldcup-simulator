import { escapeHtml } from "./html.js";
import { renderTeamName } from "./teamName.js";
//TODO unify exports
function formatScore(match){
    return `${match.homeScore} - ${match.awayScore}`;
}

export function formatPenalties(match) {
    if(!match.penalties) {
        return "";
    }

    return `<span class="penalties">Penalties ${match.penalties.homePenalties} - ${match.penalties.awayPenalties}</span>`;
}
// match scheduling
export function renderGroupMatches(container, simulatedFixtures){
    container.innerHTML = simulatedFixtures.map(({ group, matches }) => `
        <article class="card match-group">
            <h3>Grupo ${escapeHtml(group)}</h3>
            ${[1, 2, 3].map((round) => `
                <div class="round-block">
                    <h4>Rodada ${round}</h4>
                    ${matches
                            .filter((match) => match.round === round)
                            .map((match) => `
                                <div class="match-row">
                                    ${renderTeamName(match.homeTeam)}
                                    <strong>${formatScore(match)}</strong>
                                    ${renderTeamName(match.awayTeam)}
                                </div>
                                `,)
                            .join("")}
                </div>`,)
                        .join("")}
        </article>
    `).join("");
}
