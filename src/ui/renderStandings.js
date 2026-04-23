import { escapeHtml } from "./html";
import { renderTeamName } from "./teamName";

// kept global score rendering for understanding purporses. In portuguese: GD = SG; GF = GP; GA = GC;
export function renderStandings(container, groupStandings){
    container.innerHTML = groupStandings.map(({group, standings}) => `
        <article class="card table-card">
            <h3>Grupo ${escapeHtml(group)}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Pts</th>
                        <th>GD</th>
                        <th>GF</th>
                        <th>GA</th>
                    </tr>
                </thead>
                <tbody>
                    ${standings.map((standing, index) => `
                        <tr class ="${index < 2 ? "qualificado" : ""}">
                            <td><span class="standing-rank">${index + 1}.</span> ${renderTeamName(standing.team)}</td>
                            <td>${standing.points}</td>
                            <td>${standing.goalDifference}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                        </tr>
                    `,).join("")}
                </tbody>
            </table>
        </article>
    `).join("");
}
