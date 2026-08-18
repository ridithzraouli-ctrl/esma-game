// ========================================
// MENU SYSTEM
// ========================================

export const GAME_STATES = {
    MENU: "menu",
    HOW_TO_PLAY: "howToPlay",
    SETTINGS: "settings",
    PLAYING: "playing"
};

export let gameState = GAME_STATES.MENU;

export let musicEnabled = true;
export let soundEnabled = true;


// ========================================
// CHANGE GAME STATE
// ========================================

export function setGameState(newState) {
    gameState = newState;
}


// ========================================
// SETTINGS
// ========================================

export function toggleMusic() {
    musicEnabled = !musicEnabled;
}

export function toggleSound() {
    soundEnabled = !soundEnabled;
}


// ========================================
// BUTTON CHECK
// ========================================

export function isInsideButton(
    mouseX,
    mouseY,
    x,
    y,
    width,
    height
) {

    return (
        mouseX >= x &&
        mouseX <= x + width &&
        mouseY >= y &&
        mouseY <= y + height
    );

}


// ========================================
// DRAW BUTTON
// ========================================

export function drawButton(
    ctx,
    text,
    x,
    y,
    width,
    height
) {

    ctx.fillStyle = "#FFFFFF";

    ctx.fillRect(
        x,
        y,
        width,
        height
    );

    ctx.strokeStyle = "#000000";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        x,
        y,
        width,
        height
    );

    ctx.fillStyle = "#000000";

    ctx.font = "28px Arial";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        text,
        x + width / 2,
        y + height / 2
    );

}
