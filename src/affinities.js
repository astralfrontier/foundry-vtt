export const AFFINITY_NAMES = ["air", "bolt", "dark", "earth", "fire", "ice", "light", "physical", "poison"];
export const AFFINITY_LEVELS = ["VU", "-", "RS", "IM", "AB"];

// "affinities" is actor.system.affinities
// "affinityName" is e.g. "air", "bolt"
export function affinityLevel(affinities, affinityName) {
    return AFFINITY_LEVELS[affinities[affinityName].current + 1];
}

export function affinityLevels(actor) {
    const affinities = actor.system.affinities;
    return AFFINITY_NAMES.reduce(
        (affinityReport, affinityName) => {
            affinityReport[affinityName] = affinityLevel(affinities, affinityName);
            return affinityReport;
        },
        {}
    )
}