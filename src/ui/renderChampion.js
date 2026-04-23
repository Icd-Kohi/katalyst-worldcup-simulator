import {buildFinalPayload} from "../api/worldCupApi.js";
import {escapeHtml} from "./html.js";
import {renderTeamName, renderFinalTeamName} from "./teamName.js";

export function renderChampion(container, knockout){
    const payload = buildFinalPayload(knockout);
    const penalties = knockout.final.penalties ?? { homePenalties:0, awayPenalties:0 };

    container.innerHTML = `
        <div class="champion-content">
            <p class="eyebrow">Vencedor</p>
            <h2>${renderTeamName(knockout.champion)}</h2>
            <p>
                Final: ${renderTeamName(knockout.final.homeTeam)} ${knockout.final.homeScore} -
                ${knockout.final.awayScore} ${renderFinalTeamName(knockout.final.awayTeam)}
            </p>
            <p>Placar dos penalties: ${penalties.homePenalties} - ${penalties.awayPenalties}</p>
            <details>
                <summary>JSON do Resultado final</summary>
                <pre>${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
            </details>
        </div>
    `;

}
