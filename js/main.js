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


const canvas =
    document.getElementById("game");

const ctx =
    canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;


const keys = {};

let enemies = [];
let powerUps = [];
let blocks = [];


document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();

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
            gameState ===
            GAME_STATES.PLAYING
        ) {

            if (
                key === " " ||
                key === "arrowup" ||
                key === "w"
            ) {

                jump();

            }

        }

    }
);


document.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


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


function loadLevelObjects() {

    const level =
        getCurrentLevel();


    enemies = [];
    powerUps = [];


    blocks =
        createBlocks(
            level.blocks || []
        );


    for (
        const enemyData
        of level.enemies
    ) {

        const enemy =
            createEnemyFromData(
                enemyData
            );

        if (enemy) {
            enemies.push(enemy);
        }

    }

}


function resetCurrentLevel() {

    const level =
        getCurrentLevel();


    resetPlayer(
        level.spawn.x,
        level.spawn.y
    );


    camera.x = 0;
    camera.y = 0;


    loadLevelObjects();

}


canvas.addEventListener(
    "click",
    event => {

        const rect =
            canvas.getBoundingClientRect();


        const mouseX =
            (event.clientX -
                rect.left) *
            (canvas.width /
                rect.width);


        const mouseY =
            (event.clientY -
                rect.top) *
            (canvas.height /
                rect.height);


        if (
            gameState ===
            GAME_STATES.MENU
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

    }
);


function update() {

    if (
        gameState !==
        GAME_STATES.PLAYING
    ) {
        return;
    }


    const level =
        getCurrentLevel();


    updatePlayer(
        keys,
        level.platforms
    );


    for (
        const enemy
        of enemies
    ) {

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


    for (
        const item
        of releasedItems
    ) {

        const powerUp =
            createPowerUp(
                item.type,
                item.x,
                item.y
            );


        if (powerUp) {

            powerUps.push(
                powerUp
            );

        }

    }


    for (
        const powerUp
        of powerUps
    ) {

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


    for (
        const enemy
        of enemies
    ) {

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

    ctx.fillStyle =
        "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


function drawMenu() {

    drawMenuBackground();


    ctx.fillStyle =
        "#000000";

    ctx.font =
        "bold 56px Arial";

    ctx.textAlign =
        "center";


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


    ctx.fillStyle =
        "#000000";

    ctx.font =
        "bold 48px Arial";

    ctx.textAlign =
        "center";


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


function drawSettings() {

    drawMenuBackground();


    ctx.fillStyle =
        "#000000";

    ctx.font =
        "bold 48px Arial";

    ctx.textAlign =
        "center";


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


function drawGame() {

    ctx.fillStyle =
        "#87CEEB";

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

        ctx.fillStyle =
            "#8B5A2B";

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

    }


    for (
        const block
        of blocks
    ) {

        drawBlock(
            ctx,
            block,
            camera.x,
            camera.y
        );

    }


    ctx.fillStyle =
        "#00FF00";


    ctx.fillRect(
        level.exit.x,
        level.exit.y,
        level.exit.width,
        level.exit.height
    );


    for (
        const powerUp
        of powerUps
    ) {

        if (powerUp.collected) {
            continue;
        }


        if (
            powerUp.type ===
            ITEM_TYPES.STRAWBERRY
        ) {

            ctx.fillStyle =
                "#FF0000";

        }

        else if (
            powerUp.type ===
            ITEM_TYPES.WINGS
        ) {

            ctx.fillStyle =
                "#FFFFFF";

        }

        else if (
            powerUp.type ===
            ITEM_TYPES.BUNNY
        ) {

            ctx.fillStyle =
                "#FFB6C1";

        }

        else if (
            powerUp.type ===
            ITEM_TYPES.FIRE
        ) {

            ctx.fillStyle =
                "#FF6600";

        }


        ctx.fillRect(
            powerUp.x,
            powerUp.y,
            powerUp.width,
            powerUp.height
        );

    }


    for (
        const enemy
        of enemies
    ) {

        if (!enemy.alive) {
            continue;
        }


        if (
            enemy.type ===
            "beetle"
        ) {

            ctx.fillStyle =
                "#000000";

        }

        else if (
            enemy.type ===
            "cockroach"
        ) {

            ctx.fillStyle =
                "#4A2A16";

        }

        else if (
            enemy.type ===
            "fly"
        ) {

            ctx.fillStyle =
                "#555555";

        }

        else if (
            enemy.type ===
            "spider"
        ) {

            ctx.fillStyle =
                "#663399";

        }

        else if (
            enemy.type ===
            "ghost"
        ) {

            ctx.fillStyle =
                "#EEEEEE";

        }

        else if (
            enemy.type ===
            "cactus"
        ) {

            ctx.fillStyle =
                "#228B22";

        }


        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

    }


    if (
        player.power ===
        "wings"
    ) {

        ctx.fillStyle =
            "#FFFFFF";


        ctx.fillRect(
            player.x - 10,
            player.y + 12,
            10,
            24
        );


        ctx.fillRect(
            player.x +
                player.width,
            player.y + 12,
            10,
            24
        );

    }


    ctx.fillStyle =
        "#FF69B4";


    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    ctx.restore();

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
