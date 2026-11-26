export function forEveryPc(callback) {
    game.actors.filter(actor => actor.type === 'character').forEach(actor => callback(actor));
}