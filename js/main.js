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
    createBeetle,
    updateEnemy,
    checkEnemyCollision,
    canStompEnemy
} from "./enemies.js";

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
// ENEMIES
// ========================================

let enemies = [];


function createEnemiesForLevel() {

    enemies = [

        createBeetle(600, 446),

        createBeetle(1200, 376),

        createBeetle(1900, 396),

        createBeetle(2450, 306),

        createBeetle(2850, 376),

        createBeetle(3500, 446)

    ];

}


// ========================================
// RESET CURRENT LEVEL
// ========================================

function resetCurrentLevel() {

    const level = getCurrentLevel();

    resetPlayer(
        level.spawn.x,
        level.spawn.y
    );

    camera.x = 0;
    camera.y = 0;

    createEnemiesForLevel();

}


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

            resetCurrentLevel();

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
// UPDATE
// ========================================

function update() {

    if (gameState !== GAME_STATES.PLAYING) {
        return;
    }


    const level = getCurrentLevel();

    const platforms = level.platforms;


    // Player

    updatePlayer(
        keys,
        platforms
    );


    // Enemies

    for (const enemy of enemies) {

        updateEnemy(
            enemy,
            platforms
        );

    }


    // Player / enemy collisions

    for (const enemy of enemies) {

        if (!checkEnemyCollision(player, enemy)) {
            continue;
        }


        if (canStompEnemy(player, enemy)) {

            enemy.alive = false;

            player.velocityY = -7;

        }

        else {

            resetCurrentLevel();

            return;

        }

    }


    // Camera

    updateCamera(
        player,
        canvas,
        WORLD_WIDTH
    );


    // Level exit

    const exit = level.exit;


    const reachedExit =
        player.x < exit.x + exit.width &&
        player.x + player.width > exit.x &&
        player.y < exit.y + exit.height &&
        player.y + player.height > exit.y;


    if (reachedExit) {

        const hasNextLevel = nextLevel();


        if (hasNextLevel) {

            resetCurrentLevel();

        }

    }


    // Fall off the level

    if (player.y > canvas.height + 300) {

        resetCurrentLevel();

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


    ctx.save();


    ctx.translate(
        -camera.x,
       
