import { escapeHtml } from "./html.js";
import { renderTeamName } from "./teamName.js";
export function renderGroups(container, groups){
    container.innerHTML = groups.map((group) => `
        <article class="card group-card">
            <h3>Grupo ${escapeHtml(group.name)}</h3>
            <ol>
                ${group.teams.map((team) => `<li>${renderTeamName(team)}</li>`).join("")}
            </ol>
        </article>
    `).join("");
}

