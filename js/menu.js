export const GAME_STATES = {
    MENU: "menu",
    WORLD_MAP: "world_map",
    LEVEL_MAP: "level_map",
    HOW_TO_PLAY: "how_to_play",
    SETTINGS: "settings",
    PLAYING: "playing"
};


export let gameState =
    GAME_STATES.MENU;


export let musicEnabled = true;
export let soundEnabled = true;


export function setGameState(state) {

    gameState = state;

}


export function toggleMusic() {

    musicEnabled =
        !musicEnabled;

}


export function toggleSound() {

    soundEnabled =
        !soundEnabled;

}


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


export function drawButton(
    ctx,
    text,
    x,
    y,
    width,
    height
) {

    ctx.fillStyle =
        "#FFF1B8";

    ctx.fillRect(
        x,
        y,
        width,
        height
    );


    ctx.strokeStyle =
        "#6B3E26";

    ctx.lineWidth = 4;

    ctx.strokeRect(
        x,
        y,
        width,
        height
    );


    ctx.fillStyle =
        "#6B3E26";

    ctx.font =
        "bold 24px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        text,
        x + width / 2,
        y + height / 2
    );


    ctx.textBaseline =
        "alphabetic";

}


export function drawMenuBackground(ctx) {

    ctx.fillStyle =
        "#8ED6FF";

    ctx.fillRect(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
    );


    ctx.fillStyle =
        "#B8E986";

    ctx.fillRect(
        0,
        390,
        ctx.canvas.width,
        150
    );


    ctx.fillStyle =
        "#79C267";

    ctx.fillRect(
        0,
        430,
        ctx.canvas.width,
        110
    );


    ctx.fillStyle =
        "#FFFFFF";

    ctx.beginPath();

    ctx.arc(
        150,
        100,
        35,
        0,
        Math.PI * 2
    );

    ctx.arc(
        190,
        100,
        45,
        0,
        Math.PI * 2
    );

    ctx.arc(
        235,
        100,
        30,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        720,
        150,
        30,
        0,
        Math.PI * 2
    );

    ctx.arc(
        760,
        150,
        45,
        0,
        Math.PI * 2
    );

    ctx.arc(
        810,
        150,
        30,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


export function drawMainMenu(ctx) {

    drawMenuBackground(ctx);


    ctx.fillStyle =
        "#6B3E26";

    ctx.font =
        "bold 52px Arial";

    ctx.textAlign =
        "center";


    ctx.fillText(
        "BIRTHDAY ADVENTURE",
        ctx.canvas.width / 2,
        145
    );


    ctx.fillStyle =
        "#FFFFFF";

    ctx.font =
        "bold 20px Arial";

    ctx.fillText(
        "A tiny adventure awaits...",
        ctx.canvas.width / 2,
        185
    );


    drawButton(
        ctx,
        "START",
        330,
        245,
        300,
        60
    );


    drawButton(
        ctx,
        "HOW TO PLAY",
        330,
        320,
        300,
        60
    );


    drawButton(
        ctx,
        "SETTINGS",
        330,
        395,
        300,
        60
    );

}


export function drawHowToPlayScreen(ctx) {

    drawMenuBackground(ctx);


    ctx.fillStyle =
        "#6B3E26";

    ctx.font =
        "bold 46px Arial";

    ctx.textAlign =
        "center";


    ctx.fillText(
        "HOW TO PLAY",
        ctx.canvas.width / 2,
        80
    );


    ctx.fillStyle =
        "#FFFFFF";

    ctx.font =
        "bold 22px Arial";


    ctx.fillText(
        "A / D or ← / →",
        ctx.canvas.width / 2,
        150
    );

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Move",
        ctx.canvas.width / 2,
        177
    );


    ctx.font =
        "bold 22px Arial";

    ctx.fillText(
        "SPACE / W / ↑",
        ctx.canvas.width / 2,
        220
    );

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Jump",
        ctx.canvas.width / 2,
        247
    );


    ctx.font =
        "bold 22px Arial";

    ctx.fillText(
        "F",
        ctx.canvas.width / 2,
        290
    );

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Shoot fireballs",
        ctx.canvas.width / 2,
        317
    );


    ctx.font =
        "bold 22px Arial";

    ctx.fillText(
        "BUNNY POWER",
        ctx.canvas.width / 2,
        355
    );

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Jump twice",
        ctx.canvas.width / 2,
        382
    );


    drawButton(
        ctx,
        "BACK",
        330,
        445,
        300,
        55
    );

}


export function drawSettingsScreen(ctx) {

    drawMenuBackground(ctx);


    ctx.fillStyle =
        "#6B3E26";

    ctx.font =
        "bold 46px Arial";

    ctx.textAlign =
        "center";


    ctx.fillText(
        "SETTINGS",
        ctx.canvas.width / 2,
        100
    );


    drawButton(
        ctx,
        "MUSIC: " +
        (musicEnabled
            ? "ON"
            : "OFF"),
        330,
        210,
        300,
        60
    );


    drawButton(
        ctx,
        "SOUND: " +
        (soundEnabled
            ? "ON"
            : "OFF"),
        330,
        285,
        300,
        60
    );


    drawButton(
        ctx,
        "BACK",
        330,
        390,
        300,
        60
    );

}
