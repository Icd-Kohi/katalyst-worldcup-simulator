import { escapeHtml } from "./html.js";

const TEAM_FLAG_CODES = [
    { nome: "Hungria", id: "HU" },
    { nome: "Venezuela", id: "VE" },
    { nome: "Portugal", id: "PT" },
    { nome: "Argentina", id: "AR" },
    { nome: "Holanda", id: "NL" },
    { nome: "Irã", id: "IR" },
    { nome: "Egito", id: "EG" },
    { nome: "Estados Unidos", id: "US" },
    { nome: "Dinamarca", id: "DK" },
    { nome: "Uruguai", id: "UY" },
    { nome: "Sérvia", id: "RS" },
    { nome: "Colômbia", id: "CO" },
    { nome: "Gana", id: "GH" },
    { nome: "Jamaica", id: "JM" },
    { nome: "Costa do Marfim", id: "CI" },
    { nome: "Iraque", id: "IQ" },
    { nome: "Bélgica", id: "BE" },
    { nome: "Inglaterra", id: "GB" },
    { nome: "Coreia do Sul", id: "KR" },
    { nome: "Senegal", id: "SN" },
    { nome: "Indonésia", id: "ID" },
    { nome: "Espanha", id: "ES" },
    { nome: "Japão", id: "JP" },
    { nome: "Austrália", id: "AU" },
    { nome: "Costa Rica", id: "CR" },
    { nome: "Nigéria", id: "NG" },
    { nome: "Áustria", id: "AT" },
    { nome: "Croácia", id: "HR" },
    { nome: "Alemanha", id: "DE" },
    { nome: "Arábia Saudita", id: "SA" },
    { nome: "Uzbequistão", id: "UZ" },
    { nome: "Jordânia", id: "JO" },
];
function codeToFlagEmoji(code) {
    //ASCII "A"
    const A = 65;
    const OFFSET = 127462 - A;

    // fromCodePoint gets a unicode character from a number.
    return code
        .toUpperCase()
        .split("")
        .map((letter) => String.fromCodePoint(letter.charCodeAt(0) + OFFSET))
        .join("");
}

export function getTeamFlag(team) {
    const teamFlag = TEAM_FLAG_CODES.find((item) => item.nome === team.nome);
    return teamFlag ? codeToFlagEmoji(teamFlag.id) : "";
}

export function renderTeamName(team) {
    const flag = getTeamFlag(team);

    return `
    <span class="team-name">
      ${flag ? `<span class="team-flag" aria-hidden="true">${flag}</span>` : ""}
      <span class="team-text">${escapeHtml(team.nome)}</span>
    </span>
  `;
}

export function renderFinalTeamName(team){
    const flag = getTeamFlag(team);

    return `
        <span class="team-name">
            <span class="team-text">${escapeHtml(team.nome)}</span>
            ${flag ? `<span class="team-flag" aria-hidden="true">${flag}</span>` : ""}
        </span>
    `;
}
