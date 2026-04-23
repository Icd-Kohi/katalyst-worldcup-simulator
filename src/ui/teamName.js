import { escapeHtml } from "./html.js";

const TEAM_FLAG_CODES = [
    { nome: "Costa do Marfim", id: "CI" },
    { nome: "Estados Unidos", id: "US" },
    { nome: "Uruguai", id: "UY" },
    { nome: "Irã", id: "IR" },
    { nome: "França", id: "FR" },
    { nome: "Jordânia", id: "JO" },
    { nome: "Croácia", id: "HR" },
    { nome: "Gana", id: "GH" },
    { nome: "Panamá", id: "PA" },
    { nome: "Dinamarca", id: "DK" },
    { nome: "Argélia", id: "DZ" },
    { nome: "Itália", id: "IT" },
    { nome: "Argentina", id: "AR" },
    { nome: "Camarões", id: "CM" },
    { nome: "Nigéria", id: "NG" },
    { nome: "Holanda", id: "NL" },
    { nome: "Iraque", id: "IQ" },
    { nome: "Japão", id: "JP" },
    { nome: "México", id: "MX" },
    { nome: "Brasil", id: "BR" },
    { nome: "Arábia Saudita", id: "SA" },
    { nome: "Coreia do Sul", id: "KR" },
    { nome: "Jamaica", id: "JM" },
    { nome: "Costa Rica", id: "CR" },
    { nome: "Sérvia", id: "RS" },
    { nome: "Suíça", id: "CH" },
    { nome: "Turquia", id: "TR" },
    { nome: "Áustria", id: "AT" },
    { nome: "Inglaterra", id: "GB" },
    { nome: "Senegal", id: "SN" },
    { nome: "Espanha", id: "ES" },
    { nome: "Equador", id: "EC" },
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
    const teamFlag = TEAM_FLAG_CODES.find((item) => item.nome === team.name);
    return teamFlag ? codeToFlagEmoji(teamFlag.id) : "";
}

export function renderTeamName(team) {
    const flag = getTeamFlag(team);

    return `
    <span class="team-name">
      ${flag ? `<span class="team-flag" aria-hidden="true">${flag}</span>` : ""}
      <span class="team-text">${escapeHtml(team.name)}</span>
    </span>
  `;
}

export function renderFinalTeamName(team){
    const flag = getTeamFlag(team);

    return `
        <span class="team-name">
            <span class="team-text">${escapeHtml(team.name)}</span>
            ${flag ? `<span class="team-flag" aria-hidden="true">${flag}</span>` : ""}
        </span>
    `;
}
