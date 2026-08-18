// ========================================
// MAIN GAME
// ========================================

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
    createCockroach,
    createFly,
    createSpider,
    createGhost,
    createCactus,
    updateEnemy,
    checkEnemyCollision,
    canStompEnemy,
    defeatEnemy
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


// ========================================
// CANVAS
// ========================================

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


// Create the correct enemy object
// from the level data

function createEnemyFromData(data) {

    if (data.type === "beetle") {

        return createBeetle(
            data.x,
            data.y
        );

    }


    if (data.type === "cockroach") {

        return createCockroach(
            data.x,
            data.y
        );

    }


    if (data.type === "fly") {

        return createFly(
            data.x,
            data.y
        );

    }


    if (data.type === "spider") {

        return createSpider(
            data.x,
            data.y
        );

    }


    if (data.type === "ghost") {

        return createGhost(
            data.x,
            data.y
        );

    }


    if (data.type === "cactus") {

        return createCactus(
            data.x,
            data.y
        );

    }


    return null;

}


// ========================================
// LOAD LEVEL ENEMIES
// ========================================

function loadEnemies() {

    const level = getCurrentLevel();


    enemies = [];


    for (const enemyData of level.enemies) {

        const enemy =
            createEnemyFromData(enemyData);


        if (enemy) {

            enemies.push(enemy);

        }

    }

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


    loadEnemies();

}


// ========================================
// MOUSE
// ========================================

canvas.addEventListener("click", (event) => {

    const rect =
        canvas.getBoundingClientRect();


    const mouseX =
        (event.clientX - rect.left) *
        (canvas.width / rect.width);


    const mouseY =
        (event.clientY - rect.top) *
        (canvas.height / rect.height);


    // ====================================
    // MAIN MENU
    // ====================================

    if (gameState === GAME_STATES.MENU) {


        // PLAY

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

            setGameState(
                GAME_STATES.PLAYING
            );

        }


        // HOW TO PLAY

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

            setGameState(
                GAME_STATES.HOW_TO_PLAY
            );

        }


        // SETTINGS

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

            setGameState(
                GAME_STATES.SETTINGS
            );

        }

    }


    // ====================================
    // HOW TO PLAY
    // ====================================

    else if (
        gameState ===
        GAME_STATES.HOW_TO_PLAY
    ) {

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

            setGameState(
                GAME_STATES.MENU
            );

        }

    }


    // ====================================
    // SETTINGS
    // ====================================

    else if (
        gameState ===
        GAME_STATES.SETTINGS
    ) {


        // MUSIC

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


        // SOUND

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


        // BACK

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

            setGameState(
                GAME_STATES.MENU
            );

        }

    }

});


// ========================================
// UPDATE
// ========================================

function update() {

    if (
        gameState !==
        GAME_STATES.PLAYING
    ) {

        return;

    }


    const level =
        getCurrentLevel();


    const platforms =
        level.platforms;


    // ====================================
    // PLAYER
    // ====================================

    updatePlayer(
        keys,
        platforms
    );


    // ====================================
    // ENEMIES
    // ====================================

    for (const enemy of enemies) {

        updateEnemy(
            enemy,
            platforms
        );

    }


    // ====================================
    // ENEMY COLLISIONS
    // ====================================

    for (const enemy of enemies) {

        if (
            !checkEnemyCollision(
                player,
                enemy
            )
        ) {

            continue;

        }


        // Stompable enemy

        if (
            canStompEnemy(
                player,
                enemy
            )
        ) {

            defeatEnemy(enemy);

            player.velocityY = -7;

        }


        // Dangerous enemy

        else {

            resetCurrentLevel();

            return;

        }

    }


    // ====================================
    // CAMERA
    // ====================================

    updateCamera(
        player,
        canvas,
        WORLD_WIDTH
    );


    // ====================================
    // LEVEL EXIT
    // ====================================

    const exit =
        level.exit;


    const reachedExit =
        player.x <
            exit.x + exit.width &&

        player.x + player.width >
            exit.x &&

        player.y <
            exit.y + exit.height &&

        player.y + player.height >
            exit.y;


    if (reachedExit) {

        const hasNextLevel =
            nextLevel();


        if (hasNextLevel) {

            resetCurrentLevel();

        }

    }


    // ====================================
    // FALLING
    // ====================================

    if (
        player.y >
        canvas.height + 300
    ) {

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

    ctx.font =
        "bold 56px Arial";

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

    ctx.font =
        "bold 48px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "HOW TO PLAY",
        canvas.width / 2,
        90
    );


    ctx.font =
        "24px Arial";


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

    ctx.font =
        "bold 48px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "SETTINGS",
        canvas.width / 2,
        100
    );


    drawButton(
        ctx,
        "MUSIC: " +
            (musicEnabled
                ? "ON"
                : "OFF"),
        330,
        230,
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


    const level =
        getCurrentLevel();


    ctx.save();


    ctx.translate(
        -camera.x,
        -camera.y
    );


    // ====================================
    // PLATFORMS
    // ====================================

    ctx.fillStyle = "#8B5A2B";


    for (
        const platform of
        level.platforms
    ) {

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

    }


    // ====================================
    // EXIT
    // ====================================

    ctx.fillStyle = "#00FF00";


    ctx.fillRect(
        level.exit.x,
        level.exit.y,
        level.exit.width,
        level.exit.height
    );


    // ====================================
    // ENEMIES
    // ====================================

    for (const enemy of enemies) {

        if (!enemy.alive) {

            continue;

        }


        // Beetle

        if (
            enemy.type ===
            "beetle"
        ) {

            ctx.fillStyle = "#000000";

        }


        // Cockroach

        else if (
            enemy.type ===
            "cockroach"
        ) {

            ctx.fillStyle = "#4A2A16";

        }


        // Fly

        else if (
            enemy.type ===
            "fly"
        ) {

            ctx.fillStyle = "#555555";

        }


        // Spider

        else if (
            enemy.type ===
            "spider"
        ) {

            ctx.fillStyle = "#663399";

        }


        // Ghost

        else if (
            enemy.type ===
            "ghost"
        ) {

            ctx.fillStyle = "#EEEEEE";

        }


        // Cactus

        else if (
            enemy.type ===
            "cactus"
        ) {

            ctx.fillStyle = "#228B22";

        }


        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

    }


    // ====================================
    // PLAYER
    // ====================================

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

    if (
        gameState ===
        GAME_STATES.MENU
    ) {

        drawMenu();

    }


    else if (
        gameState ===
        GAME_STATES.HOW_TO_PLAY
    ) {

        drawHowToPlay();

    }


    else if (
        gameState ===
        GAME_STATES.SETTINGS
    ) {

        drawSettings();

    }


    else if (
        gameState ===
        GAME_STATES.PLAYING
    ) {

        drawGame();

    }

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}


gameLoop();
