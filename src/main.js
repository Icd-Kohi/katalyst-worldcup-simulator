import { fetchTeams } from "./api/worldCupApi.js";
import { createGroups, generateAllGroupFixtures } from "./core/groups.js";
import { startKnockout } from "./core/knockout.js";
import { simulateGroupFixtures } from "./core/simulator.js";
import { calculateAllStandings, getQualifiedTeams } from "./core/standings.js";
import { renderBracketRound } from "./ui/renderBracket.js";
import { renderChampion } from "./ui/renderChampion.js";
import { renderGroups } from "./ui/renderGroups.js";
import { renderGroupMatches } from "./ui/renderMatches.js";
import { renderStandings } from "./ui/renderStandings.js";
import { clearResults, dom, setLoading, setStatus, showResultsSections } from "./ui/state.js";

const PHASES = [
    { id: "groups", label: "Grupos" },
    { id: "matches", label: "Partidas de Grupo" },
    { id: "standings", label: "Classificação" },
    { id: "roundOf16", label: "Oitavas de Final" },
    { id: "quarterfinals", label: "Quartas de Final" },
    { id: "semifinals", label: "Semi-Final" },
    { id: "final", label: "Final" },
    { id: "champion", label: "Vencedor" },
];

let currentPhaseIndex = 0;

function renderSummary({ teams, groups, simulatedFixtures, knockout }) {
    const groupMatchCount = simulatedFixtures.reduce((total, fixtureGroup) => total + fixtureGroup.matches.length, 0);
    const knockoutMatchCount = knockout.rounds.reduce((total, round) => total + round.matches.length, 0);

    dom.summary.innerHTML = `
    <article class="metric"><strong>${teams.length}</strong><span>times carregados</span></article>
    <article class="metric"><strong>${groups.length}</strong><span>grupos sorteados</span></article>
    <article class="metric"><strong>${groupMatchCount}</strong><span>partidas de grupo</span></article>
    <article class="metric"><strong>${knockoutMatchCount}</strong><span>rodadas eliminatórias</span></article>
  `;
}

function renderPhaseTabs() {
    dom.phaseTabs.innerHTML = PHASES.map(
        (phase, index) => `
      <button type="button" class="phase-tab" data-phase-index="${index}">
        ${index + 1}. ${phase.label}
      </button>
    `,
    ).join("");
}

function showPhase(index) {
    currentPhaseIndex = Math.min(Math.max(index, 0), PHASES.length - 1);
    const activePhase = PHASES[currentPhaseIndex];

    dom.phaseLabel.textContent = activePhase.label;
    dom.previousPhaseButton.disabled = currentPhaseIndex === 0;
    dom.nextPhaseButton.disabled = currentPhaseIndex === PHASES.length - 1;

    dom.phaseScreens.forEach((screen) => {
        const isActive = screen.dataset.phase === activePhase.id;
        screen.hidden = !isActive;
        screen.dataset.active = String(isActive);
    });

    dom.phaseTabs.querySelectorAll(".phase-tab").forEach((button, buttonIndex) => {
        button.classList.toggle("active", buttonIndex === currentPhaseIndex);
    });
}
async function simulateTournament() {
    setStatus("Carregando times providos pela API da Katalyst...");
    const apiTeams = await fetchTeams();
    //validate
    const teams = apiTeams; 

    setStatus("Selecionando grupos e simulando a fase de grupos...");
    const groups = createGroups(teams);
    const fixtures = generateAllGroupFixtures(groups);
    const simulatedFixtures = simulateGroupFixtures(fixtures);
    const groupStandings = calculateAllStandings(groups, simulatedFixtures);
    const qualifiedTeams = getQualifiedTeams(groupStandings);

    setStatus("Rodando partidas eliminatórias...");
    const knockout = startKnockout(qualifiedTeams);

    return {
        teams,
        groups,
        simulatedFixtures,
        groupStandings,
        knockout
    };
}

function renderTournament(result) {
    showResultsSections();
    renderPhaseTabs();
    renderSummary(result);
    renderGroups(dom.groups, result.groups);
    renderGroupMatches(dom.groupMatches, result.simulatedFixtures);
    renderStandings(dom.standings, result.groupStandings);
    renderBracketRound(dom.roundOf16, result.knockout, "Round of 16");
    renderBracketRound(dom.quarterfinals, result.knockout, "Quarterfinals");
    renderBracketRound(dom.semifinals, result.knockout, "Semifinals");
    renderBracketRound(dom.finalRound, result.knockout, "Final");
    renderChampion(dom.champion, result.knockout);
    showPhase(0);
}

async function handleSubmit(event) {
    event.preventDefault();

    clearResults();
    setLoading(true);

    try {
        const result = await simulateTournament();
        renderTournament(result);
        setStatus(`Campeonato concluído! Vencedor: ${result.knockout.champion.nome}.`, "sucesso");
    } catch (error) {
        setStatus(error.message || "Não foi possível carregar o torneio.", "error");
    } finally {
        setLoading(false);
    }
}

dom.form.addEventListener("submit", handleSubmit);
dom.previousPhaseButton.addEventListener("click", () => showPhase(currentPhaseIndex - 1));
dom.nextPhaseButton.addEventListener("click", () => showPhase(currentPhaseIndex + 1));
dom.phaseTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phase-index]");

    if (button) {
        showPhase(Number(button.dataset.phaseIndex));
    }
});
