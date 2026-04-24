// a way to not repeat much code
function getRequiredElement(selector){
    const element = document.querySelector(selector);

    if(!element){
        throw new Error(`DOM element not found: ${selector}`);
    }
    return element;
}

export const dom = {
    form: getRequiredElement("#controls"),
    simulateButton: getRequiredElement("#simulate-button"),
    status: getRequiredElement("#status"),
    summary: getRequiredElement("#summary"),
    // Labels
    phaseNav: getRequiredElement("#phase-nav"),
    phaseLabel: getRequiredElement("#phase-label"),
    phaseTabs: getRequiredElement("#phase-tabs"),
    // Buttons
    previousPhaseButton: getRequiredElement("#previous-phase"),
    nextPhaseButton: getRequiredElement("#next-phase"),
    // Sections
    groupsSection: getRequiredElement("#matches-section"),
    matchesSection: getRequiredElement("#standings-section"),
    standingsSection: getRequiredElement("#round-of-16-section"),
    roundOf16Section: getRequiredElement("#quarterfinals-section"),
    semifinalsSection: getRequiredElement("#semifinals-section"),
    finalSection: getRequiredElement("#final-section"),
    championSection: getRequiredElement("#champion-section"),
    // Draw
    groups: getRequiredElement("#groups"),
    groupMatches: getRequiredElement("#group-matches"),
    standings: getRequiredElement("#standings"),
    roundOf16: getRequiredElement("#round-of-16"),
    quarterfinals: getRequiredElement("#quarterfinals"),
    semifinals: getRequiredElement("#semifinals"),
    finalRound: getRequiredElement("#final-round"),
    champion: getRequiredElement("#champion"),
    phaseScreens: [...document.querySelectorAll(".phase-screen")],
};

// Main button
export function setLoading(isLoading){
    dom.simulateButton.disabled = isLoading;
    dom.simulateButton.textContent = isLoading ? "Simulando..." : "Simular novamente";
}

// Status bar before and after simulation.
export function setStatus(message, tone = "neutral"){
    dom.status.textContent = message;
    dom.status.dataset.tone = tone;
}

export function showResultsSections(){
    [dom.summary, dom.phaseNav, ...dom.phaseScreens,]
    .forEach((element) => {
        if (element) {
            element.hidden = false;
        }
    });
}

export function clearResults(){
    [dom.summary, dom.groups, dom.groupMatches, dom.standings, dom.roundOf16, dom.quarterfinals, dom.semifinals, dom.finalRound, dom.champion, dom.phaseTabs,]
    .forEach((element) => {
        if(element){
            element.innerHTML = "";
        }
    });
}
