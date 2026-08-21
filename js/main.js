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
    nextLevel,
    setLevel
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
    drawButton,
    drawMainMenu,
    drawHowToPlayScreen,
    drawSettingsScreen
} from "./menu.js";

import {
    getSelectedWorld,
    getSelectedLevel,
    setSelectedWorld,
    setSelectedLevel,
    getWorldMap,
    drawWorldMap
} from "./worldmap.js";

import {
    isWorldUnlocked,
    isLevelUnlocked,
    completeLevel,
    getCoinCount
} from "./progression.js";


const canvas =
    document.getElementById("game");

const ctx =
    canvas.getContext("2d");


canvas.width = 960;
canvas.height = 540;

ctx.imageSmoothingEnabled = false;


const keys = {};


let enemies = [];
let powerUps = [];
let blocks = [];


let mapCharacter = {
    x: 150,
    y: 390
};


let mapTarget = {
    x: 150,
    y: 390
};


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


        if (
            gameState ===
            GAME_STATES.WORLD_MAP
        ) {

            if (
                key === "arrowright" ||
                key === "d"
            ) {

                switchWorld(1);

            }


            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                switchWorld(-1);

            }


            if (
                key === "enter" ||
                key === " "
            ) {

                openSelectedLevel();

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

            enemies.push(
                enemy
            );

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


function switchWorld(direction) {

    let world =
        getSelectedWorld();


    world += direction;


    if (world < 1) {

        world = 3;

    }


    if (world > 3) {

        world = 1;

    }


    if (
        isWorldUnlocked(world)
    ) {

        setSelectedWorld(
            world
        );

        updateMapCharacter();

    }

}


function updateMapCharacter() {

    const map =
        getWorldMap();


    const level =
        getSelectedLevel();


    const node =
        map.nodes[level - 1];


    if (!node) {

        return;

    }


    mapTarget.x =
        node.x;

    mapTarget.y =
        node.y;


    if (
        !mapCharacter.x &&
        !mapCharacter.y
    ) {

        mapCharacter.x =
            node.x;

        mapCharacter.y =
            node.y;

    }

}


function openSelectedLevel() {

    const world =
        getSelectedWorld();


    const level =
        getSelectedLevel();


    if (
        !isLevelUnlocked(
            world,
            level
        )
    ) {

        return;

    }


    setLevel(
        world,
        level
    );


    resetCurrentLevel();


    setGameState(
        GAME_STATES.PLAYING
    );

}


function updateWorldMap() {

    const dx =
        mapTarget.x -
        mapCharacter.x;


    const dy =
        mapTarget.y -
        mapCharacter.y;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (
        distance > 2
    ) {

        mapCharacter.x +=
            dx * 0.08;

        mapCharacter.y +=
            dy * 0.08;

    }

}


canvas.addEventListener(
    "click",
    event => {

        const rect =
            canvas.getBoundingClientRect();


        const mouseX =
            (
                event.clientX -
                rect.left
            ) *
            (
                canvas.width /
                rect.width
            );


        const mouseY =
            (
                event.clientY -
                rect.top
            ) *
            (
                canvas.height /
                rect.height
            );


        if (
            gameState ===
            GAME_STATES.MENU
        ) {

            if (
                isInsideButton(
                    mouseX,
                    mouseY,
                    330,
                    245,
                    300,
                    60
                )
            ) {

                setGameState(
                    GAME_STATES.WORLD_MAP
                );

                updateMapCharacter();

            }


            else if (
                isInsideButton(
                    mouseX,
                    mouseY,
                    330,
                    320,
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
                    395,
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
            GAME_STATES.WORLD_MAP
        ) {

            handleWorldMapClick(
                mouseX,
                mouseY
            );

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
                    445,
                    300,
                    55
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
                    210,
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
                    285,
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


function handleWorldMapClick(
    mouseX,
    mouseY
) {

    const map =
        getWorldMap();


    for (
        let i = 0;
        i < map.nodes.length;
        i++
    ) {

        const node =
            map.nodes[i];


        const level =
            i + 1;


        const distance =
            Math.sqrt(
                (mouseX - node.x) ** 2 +
                (mouseY - node.y) ** 2
            );


        if (
            distance <= 35 &&
            isLevelUnlocked(
                getSelectedWorld(),
                level
            )
        ) {

            setSelectedLevel(
                level
            );


            mapTarget.x =
                node.x;

            mapTarget.y =
                node.y;


            openSelectedLevel();


            return;

        }

    }

}function update() {

    if (
        gameState ===
        GAME_STATES.WORLD_MAP
    ) {

        updateWorldMap();

        return;

    }


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


    updatePowerUps(
        powerUps,
        level.platforms
    );


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

            defeatEnemy(
                enemy
            );


            player.velocityY =
                -7;

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
            exit.x +
            exit.width &&

        player.x +
            player.width >
            exit.x &&

        player.y <
            exit.y +
            exit.height &&

        player.y +
            player.height >
            exit.y;


    if (reachedExit) {

        const world =
            getSelectedWorld();


        const currentLevel =
            getSelectedLevel();


        completeLevel(
            world,
            currentLevel
        );


        if (nextLevel()) {

            resetCurrentLevel();

        }

        else {

            setGameState(
                GAME_STATES.WORLD_MAP
            );

            updateMapCharacter();

        }

    }


    if (
        player.y >
        canvas.height + 300
    ) {

        resetCurrentLevel();

    }

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
            block
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

        if (
            powerUp.collected
        ) {

            continue;

        }


        if (
            powerUp.type ===
            ITEM_TYPES.STRAWBERRY
        ) {

            ctx.fillStyle =
                "#FF3B81";

        }

        else if (
            powerUp.type ===
            ITEM_TYPES.WINGS
        ) {

            ctx.fillStyle =
                "#F5F5F5";

        }

        else if (
            powerUp.type ===
            ITEM_TYPES.BUNNY
        ) {

            ctx.fillStyle =
                "#B66DFF";

        }

        else if (
            powerUp.type ===
            ITEM_TYPES.FIRE
        ) {

            ctx.fillStyle =
                "#FF6A00";

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


        const colors = {

            beetle: "#174A24",

            cockroach: "#7A3E18",

            fly: "#FFD400",

            spider: "#7138A6",

            ghost: "#8DEBFF",

            cactus: "#31A84A"

        };


        ctx.fillStyle =
            colors[enemy.type] ||
            "#FF00FF";


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


    if (
        player.power ===
        "bunny"
    ) {

        ctx.fillStyle =
            "#B66DFF";

    }

    else if (
        player.power ===
        "fire"
    ) {

        ctx.fillStyle =
            "#FF6A00";

    }

    else if (
        player.isBig
    ) {

        ctx.fillStyle =
            "#FF3B81";

    }

    else {

        ctx.fillStyle =
            "#3D7EFF";

    }


    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    ctx.restore();


    ctx.fillStyle =
        "#FFFFFF";


    ctx.font =
        "bold 20px Arial";


    ctx.textAlign =
        "left";


    ctx.fillText(
        "WORLD " +
        getSelectedWorld() +
        "  LEVEL " +
        getSelectedLevel(),
        20,
        30
    );


    ctx.fillText(
        "🪙 " +
        getCoinCount(
            getSelectedWorld(),
            getSelectedLevel()
        ),
        20,
        60
    );

}


function drawWorldMapScreen() {

    drawWorldMap(
        ctx,
        mapCharacter
    );

}


function draw() {

    if (
        gameState ===
        GAME_STATES.MENU
    ) {

        drawMainMenu(
            ctx
        );

    }


    else if (
        gameState ===
        GAME_STATES.WORLD_MAP
    ) {

        drawWorldMapScreen();

    }


    else if (
        gameState ===
        GAME_STATES.HOW_TO_PLAY
    ) {

        drawHowToPlayScreen(
            ctx
        );

    }


    else if (
        gameState ===
        GAME_STATES.SETTINGS
    ) {

        drawSettingsScreen(
            ctx
        );

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
