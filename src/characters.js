export function forEveryPc(callback) {
    game.actors.filter(actor => actor.type === 'character').forEach(actor => callback(actor));
}

export function resource(actor, resourceName) {
    const resourceBlock = actor.system.resources[resourceName];
    return {
        value: resourceBlock.value,
        max: resourceBlock.max,
        deficit: (resourceBlock.max - resourceBlock.value),
        pct: (100 * (resourceBlock.value / resourceBlock.max)),
        crisis: resourceBlock.crisis
    }
}