import {
    player,
    updatePlayer,
    jump,
    resetPlayer
} from "./player.js";

import {
    camera,
    updateCamera
} from "./camera.js";

import {
    getCurrentLevel,
    WORLD_WIDTH,
    nextLevel
} from "./levels.js";

import {
    GAME_STATES,
    gameState,
    setGameState,
    musicEnabled,
    soundEnabled,
    toggleMusic,
    toggleSound,
    isInsideButton,
    drawButton
} from "./menu.js";


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;


// ========================================
// INPUT
// ========================================

const keys = {};

document.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    keys[key] = true;

    if (
        key === " " ||
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright"
    ) {
        event.preventDefault();
    }

    if (
        gameState === GAME_STATES.PLAYING &&
        (
            key === " " ||
            key === "arrowup" ||
            key === "w"
        )
    ) {
        jump();
    }

});


document.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});


// ========================================
// MOUSE
// ========================================

canvas.addEventListener("click", (event) => {

    const rect = canvas.getBoundingClientRect();

    const mouseX =
        (event.clientX - rect.left) *
        (canvas.width / rect.width);

    const mouseY =
        (event.clientY - rect.top) *
        (canvas.height / rect.height);


    if (gameState === GAME_STATES.MENU) {

        if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                230,
                300,
                60
            )
        ) {

            setGameState(GAME_STATES.PLAYING);

        }

        else if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                310,
                300,
                60
            )
        ) {

            setGameState(GAME_STATES.HOW_TO_PLAY);

        }

        else if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                390,
                300,
                60
            )
        ) {

            setGameState(GAME_STATES.SETTINGS);

        }

    }


    else if (gameState === GAME_STATES.HOW_TO_PLAY) {

        if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                430,
                300,
                60
            )
        ) {

            setGameState(GAME_STATES.MENU);

        }

    }


    else if (gameState === GAME_STATES.SETTINGS) {

        if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                230,
                300,
                60
            )
        ) {

            toggleMusic();

        }

        else if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                310,
                300,
                60
            )
        ) {

            toggleSound();

        }

        else if (
            isInsideButton(
                mouseX,
                mouseY,
                330,
                390,
                300,
                60
            )
        ) {

            setGameState(GAME_STATES.MENU);

        }

    }

});


// ========================================
// CURRENT LEVEL
// ========================================

function getPlatforms() {

    const level = getCurrentLevel();

    return level.platforms;

}


// ========================================
// UPDATE
// ========================================

function update() {

    if (gameState !== GAME_STATES.PLAYING) {
        return;
    }


    const level = getCurrentLevel();

    const platforms = level.platforms;


    updatePlayer(
        keys,
        platforms
    );


    updateCamera(
        player,
        canvas,
        WORLD_WIDTH
    );


    // -----------------------------
    // LEVEL EXIT
    // -----------------------------

    const exit = level.exit;


    const reachedExit =
        player.x < exit.x + exit.width &&
        player.x + player.width > exit.x &&
        player.y < exit.y + exit.height &&
        player.y + player.height > exit.y;


    if (reachedExit) {

        const hasNextLevel = nextLevel();


        if (hasNextLevel) {

            const newLevel = getCurrentLevel();


            resetPlayer(
                newLevel.spawn.x,
                newLevel.spawn.y
            );


            camera.x = 0;
            camera.y = 0;

        }

    }

}


// ========================================
// MENU BACKGROUND
// ========================================

function drawMenuBackground() {

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ========================================
// TITLE SCREEN
// ========================================

function drawMenu() {

    drawMenuBackground();


    ctx.fillStyle = "#000000";

    ctx.font = "bold 56px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "BIRTHDAY ADVENTURE",
        canvas.width / 2,
        150
    );


    drawButton(
        ctx,
        "PLAY",
        330,
        230,
        300,
        60
    );


    drawButton(
        ctx,
        "HOW TO PLAY",
        330,
        310,
        300,
        60
    );


    drawButton(
        ctx,
        "SETTINGS",
        330,
        390,
        300,
        60
    );

}


// ========================================
// HOW TO PLAY
// ========================================

function drawHowToPlay() {

    drawMenuBackground();


    ctx.fillStyle = "#000000";

    ctx.font = "bold 48px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "HOW TO PLAY",
        canvas.width / 2,
        90
    );


    ctx.font = "24px Arial";


    ctx.fillText(
        "A / D or LEFT / RIGHT = MOVE",
        canvas.width / 2,
        180
    );


    ctx.fillText(
        "SPACE / W / UP = JUMP",
        canvas.width / 2,
        225
    );


    drawButton(
        ctx,
        "BACK",
        330,
        430,
        300,
        60
    );

}


// ========================================
// SETTINGS
// ========================================

function drawSettings() {

    drawMenuBackground();


    ctx.fillStyle = "#000000";

    ctx.font = "bold 48px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "SETTINGS",
        canvas.width / 2,
        100
    );


    drawButton(
        ctx,
        "MUSIC: " + (musicEnabled ? "ON" : "OFF"),
        330,
        230,
        300,
        60
    );


    drawButton(
        ctx,
        "SOUND: " + (soundEnabled ? "ON" : "OFF"),
        330,
        310,
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


// ========================================
// GAME
// ========================================

function drawGame() {

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const level = getCurrentLevel();

    const platforms = level.platforms;


    ctx.save();


    ctx.translate(
        -camera.x,
        -camera.y
    );


    // -----------------------------
    // PLATFORMS
    // -----------------------------

    ctx.fillStyle = "#8B5A2B";


    for (const platform of platforms) {

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

    }


    // -----------------------------
    // EXIT
    // -----------------------------

    ctx.fillStyle = "#00FF00";


    ctx.fillRect(
        level.exit.x,
        level.exit.y,
        level.exit.width,
        level.exit.height
    );


    // -----------------------------
    // PLAYER
    // -----------------------------

    ctx.fillStyle = "#FF69B4";


    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    ctx.restore();

}


// ========================================
// DRAW
// ========================================

function draw() {

    if (gameState === GAME_STATES.MENU) {

        drawMenu();

    }

    else if (gameState === GAME_STATES.HOW_TO_PLAY) {

        drawHowToPlay();

    }

    else if (gameState === GAME_STATES.SETTINGS) {

        drawSettings();

    }

    else if (gameState === GAME_STATES.PLAYING) {

        drawGame();

    }

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();
