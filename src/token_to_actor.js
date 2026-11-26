export function selectedTokenToActor() {
    // Find the first token the player controls
    const token = canvas.tokens.controlled[0];
    if (!token) return ui.notifications.warn("Please select a token");

    // Find the associated actor
    const actor = game.actors.get(token.document.actorId);
    if (!actor) return ui.notifications.warn("That token isn't associated with an actor");

    return actor;
}