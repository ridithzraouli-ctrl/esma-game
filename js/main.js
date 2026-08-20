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
    createPowerUp,
    updatePowerUps,
    checkPowerUpCollision,
    collectPowerUp,
    ITEM_TYPES
} from "./powerups.js";

import {
    createBlocks,
    updateBlocks,
    drawBlock
} from "./blocks.js";

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

ctx.imageSmoothingEnabled = false;


const keys = {};

let enemies = [];
let powerUps = [];
let blocks = [];


document.addEventListener("keydown", event => {

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

    if (gameState === GAME_STATES.PLAYING) {

        if (
            key === " " ||
            key === "arrowup" ||
            key === "w"
        ) {
            jump();
        }
    }
});


document.addEventListener("keyup", event => {

    keys[event.key.toLowerCase()] = false;

});


function createEnemyFromData(data) {

    if (data.type === "beetle") {
        return createBeetle(data.x, data.y);
    }

    if (data.type === "cockroach") {
        return createCockroach(data.x, data.y);
    }

    if (data.type === "fly") {
        return createFly(data.x, data.y);
    }

    if (data.type === "spider") {
        return createSpider(data.x, data.y);
    }

    if (data.type === "ghost") {
        return createGhost(data.x, data.y);
    }

    if (data.type === "cactus") {
        return createCactus(data.x, data.y);
    }

    return null;
}


function loadLevelObjects() {

    const level = getCurrentLevel();

    enemies = [];
    powerUps = [];

    blocks = createBlocks(
        level.blocks || []
    );

    for (const enemyData of level.enemies) {

        const enemy =
            createEnemyFromData(enemyData);

        if (enemy) {
            enemies.push(enemy);
        }
    }
}


function resetCurrentLevel() {

    const level = getCurrentLevel();

    resetPlayer(
        level.spawn.x,
        level.spawn.y
    );

    camera.x = 0;
    camera.y = 0;

    loadLevelObjects();
}


canvas.addEventListener("click", event => {

    const rect =
        canvas.getBoundingClientRect();

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

            setGameState(
                GAME_STATES.PLAYING
            );

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

            setGameState(
                GAME_STATES.HOW_TO_PLAY
            );

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

            setGameState(
                GAME_STATES.SETTINGS
            );

        }
    }


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


    else if (
        gameState ===
        GAME_STATES.SETTINGS
    ) {

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

            setGameState(
                GAME_STATES.MENU
            );

        }
    }

});


function update() {

    if (
        gameState !==
        GAME_STATES.PLAYING
    ) {
        return;
    }


    const level = getCurrentLevel();


    updatePlayer(
        keys,
        level.platforms
    );


    for (const enemy of enemies) {

        if (!enemy.alive) {
            continue;
        }

        updateEnemy(
            enemy,
            level.platforms
        );
    }


    const releasedItems =
        updateBlocks(
            player,
            blocks
        );


    for (const item of releasedItems) {

        const powerUp =
            createPowerUp(
                item.type,
                item.x,
                item.y
            );

        if (powerUp) {
            powerUps.push(powerUp);
        }
    }


    updatePowerUps(
        powerUps,
        level.platforms
    );


    for (const powerUp of powerUps) {

        if (powerUp.collected) {
            continue;
        }

        if (
            checkPowerUpCollision(
                player,
                powerUp
            )
        ) {

            collectPowerUp(
                player,
                powerUp
            );
        }
    }


    for (const enemy of enemies) {

        if (!enemy.alive) {
            continue;
        }

        if (
            !checkEnemyCollision(
                player,
                enemy
            )
        ) {
            continue;
        }


        if (
            canStompEnemy(
                player,
                enemy
            )
        ) {

            defeatEnemy(enemy);

            player.velocityY = -7;

        }

        else {

            resetCurrentLevel();

            return;
        }
    }


    updateCamera(
        player,
        canvas,
        WORLD_WIDTH
    );


    const exit = level.exit;


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

        if (nextLevel()) {

            resetCurrentLevel();

        }
    }


    if (
        player.y >
        canvas.height + 300
    ) {

        resetCurrentLevel();

    }
}


function drawMenuBackground() {

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


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
        "MUSIC: " +
        (musicEnabled ? "ON" : "OFF"),
        330,
        230,
        300,
        60
    );


    drawButton(
        ctx,
        "SOUND: " +
        (soundEnabled ? "ON" : "OFF"),
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


function drawPlatform(platform) {

    ctx.fillStyle = "#6B421F";

    ctx.fillRect(
        platform.x,
        platform.y,
        platform.width,
        platform.height
    );


    ctx.fillStyle = "#72B832";

    ctx.fillRect(
        platform.x,
        platform.y,
        platform.width,
        10
    );


    ctx.fillStyle = "#8ED04B";

    for (
        let x = platform.x;
        x < platform.x + platform.width;
        x += 32
    ) {

        ctx.fillRect(
            x,
            platform.y,
            16,
            4
        );
    }
}


function drawPowerUp(powerUp) {

    if (powerUp.collected) {
        return;
    }


    let mainColor = "#FFFFFF";
    let secondaryColor = "#FFFFFF";


    if (
        powerUp.type ===
        ITEM_TYPES.STRAWBERRY
    ) {

        mainColor = "#FF3B81";
        secondaryColor = "#7ED957";

    }

    else if (
        powerUp.type ===
        ITEM_TYPES.WINGS
    ) {

        mainColor = "#F5F5F5";
        secondaryColor = "#9DD9FF";

    }

    else if (
        powerUp.type ===
        ITEM_TYPES.BUNNY
    ) {

        mainColor = "#B66DFF";
        secondaryColor = "#E3C4FF";

    }

    else if (
        powerUp.type ===
        ITEM_TYPES.FIRE
    ) {

        mainColor = "#FF6A00";
        secondaryColor = "#FFD23F";

    }


    ctx.fillStyle = mainColor;

    ctx.fillRect(
        powerUp.x + 4,
        powerUp.y + 4,
        powerUp.width - 8,
        powerUp.height - 8
    );


    ctx.fillStyle = secondaryColor;

    ctx.fillRect(
        powerUp.x + 10,
        powerUp.y + 8,
        8,
        8
    );


    ctx.fillRect(
        powerUp.x + 18,
        powerUp.y + 16,
        6,
        6
    );
}


function drawEnemy(enemy) {

    if (!enemy.alive) {
        return;
    }


    if (enemy.type === "beetle") {
        ctx.fillStyle = "#174A24";
    }

    else if (enemy.type === "cockroach") {
        ctx.fillStyle = "#7A3E18";
    }

    else if (enemy.type === "fly") {
        ctx.fillStyle = "#FFD400";
    }

    else if (enemy.type === "spider") {
        ctx.fillStyle = "#7138A6";
    }

    else if (enemy.type === "ghost") {
        ctx.fillStyle = "#8DEBFF";
    }

    else if (enemy.type === "cactus") {
        ctx.fillStyle = "#31A84A";
    }

    else {
        ctx.fillStyle = "#FF00FF";
    }


    ctx.fillRect(
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
    );


    ctx.fillStyle = "#000000";

    const eyeSize = 4;

    ctx.fillRect(
        enemy.x + enemy.width * 0.25,
        enemy.y + enemy.height * 0.25,
        eyeSize,
        eyeSize
    );

    ctx.fillRect(
        enemy.x + enemy.width * 0.65,
        enemy.y + enemy.height * 0.25,
        eyeSize,
        eyeSize
    );
}


function drawPlayer() {

    const x = player.x;
    const y = player.y;

    const width = player.width;
    const height = player.height;


    let mainColor = "#3D7EFF";
    let accentColor = "#8DB1FF";


    if (player.isBig) {

        mainColor = "#FF3B81";
        accentColor = "#FF9FC3";

    }


    if (player.power === "wings") {

        mainColor = "#FFFFFF";
        accentColor = "#9DD9FF";


        ctx.fillStyle = "#9DD9FF";

        ctx.fillRect(
            x - 10,
            y + 14,
            10,
            22
        );

        ctx.fillRect(
            x + width,
            y + 14,
            10,
            22
        );
    }


    if (player.power === "bunny") {

        mainColor = "#B66DFF";
        accentColor = "#E3C4FF";


        ctx.fillStyle = accentColor;

        ctx.fillRect(
            x + 7,
            y - 12,
            7,
            16
        );

        ctx.fillRect(
            x + width - 14,
            y - 12,
            7,
            16
        );
    }


    if (player.power === "fire") {

        mainColor = "#FF6A00";
        accentColor = "#FFD23F";
    }


    const headHeight =
        Math.max(
            12,
            Math.floor(height * 0.30)
        );


    const bodyY =
        y + headHeight;


    ctx.fillStyle = mainColor;

    ctx.fillRect(
        x,
        bodyY,
        width,
        height - headHeight
    );


    ctx.fillStyle = accentColor;

    ctx.fillRect(
        x + 4,
        y + 3,
        width - 8,
        headHeight - 4
    );


    ctx.fillStyle = "#000000";


    const eyeSize =
        Math.max(
            3,
            Math.floor(width / 10)
        );


    ctx.fillRect(
        x + width * 0.25,
        y + headHeight * 0.35,
        eyeSize,
        eyeSize
    );


    ctx.fillRect(
        x + width * 0.65,
        y + headHeight * 0.35,
        eyeSize,
        eyeSize
    );


    if (player.power === "fire") {

        ctx.fillStyle = "#FFD23F";

        ctx.fillRect(
            x + width / 2 - 5,
            y - 6,
            10,
            7
        );
    }
}


function drawExit(exit) {

    ctx.fillStyle = "#65D84A";

    ctx.fillRect(
        exit.x,
        exit.y,
        exit.width,
        exit.height
    );


    ctx.fillStyle = "#FFFFFF";

    ctx.fillRect(
        exit.x + 8,
        exit.y + 12,
        exit.width - 16,
        8
    );

    ctx.fillRect(
        exit.x + 8,
        exit.y + 28,
        exit.width - 16,
        8
    );

}


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


    for (
        const platform
        of level.platforms
    ) {

        drawPlatform(platform);

    }


    for (
        const block
        of blocks
    ) {

        drawBlock(
            ctx,
            block
        );

    }


    drawExit(level.exit);


    for (
        const powerUp
        of powerUps
    ) {

        drawPowerUp(powerUp);

    }


    for (
        const enemy
        of enemies
    ) {

        drawEnemy(enemy);

    }


    drawPlayer();


    ctx.restore();


    ctx.fillStyle = "#000000";

    ctx.font = "18px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "WORLD " +
        getWorldNumber() +
        "  •  LEVEL " +
        getLevelNumber(),
        20,
        30
    );

}


function getWorldNumber() {

    const level =
        getCurrentLevel();

    return level.world || "";
}


function getLevelNumber() {

    return "";
}


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


function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}


gameLoop();
