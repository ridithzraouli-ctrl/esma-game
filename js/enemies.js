// ========================================
// ENEMY SYSTEM
// ========================================


// ========================================
// BEETLE
// Basic walking enemy
// ========================================

export function createBeetle(x, y) {

    return {
        type: "beetle",

        x,
        y,

        width: 32,
        height: 24,

        velocityX: -1.2,
        velocityY: 0,

        grounded: false,
        alive: true
    };

}


// ========================================
// COCKROACH
// Faster walking enemy
// ========================================

export function createCockroach(x, y) {

    return {
        type: "cockroach",

        x,
        y,

        width: 36,
        height: 26,

        velocityX: -1.6,
        velocityY: 0,

        grounded: false,
        alive: true
    };

}


// ========================================
// FLY
// Flying enemy
// ========================================

export function createFly(x, y) {

    return {
        type: "fly",

        x,
        y,

        width: 28,
        height: 24,

        velocityX: -1.5,

        startX: x,
        startY: y,

        alive: true
    };

}


// ========================================
// SPIDER
// Moves along the ground
// ========================================

export function createSpider(x, y) {

    return {
        type: "spider",

        x,
        y,

        width: 30,
        height: 30,

        velocityX: -1.0,
        velocityY: 0,

        grounded: false,
        alive: true
    };

}


// ========================================
// GHOST
// Floats through the level
// ========================================

export function createGhost(x, y) {

    return {
        type: "ghost",

        x,
        y,

        width: 32,
        height: 36,

        velocityX: -1.0,

        startX: x,
        startY: y,

        alive: true
    };

}


// ========================================
// CACTUS
// Stationary hazard
// ========================================

export function createCactus(x, y) {

    return {
        type: "cactus",

        x,
        y,

        width: 32,
        height: 48,

        alive: true
    };

}


// ========================================
// GRAVITY
// ========================================

const gravity = 0.6;


// ========================================
// WALKING ENEMIES
// ========================================

function updateWalkingEnemy(enemy, platforms) {

    enemy.velocityY += gravity;

    enemy.x += enemy.velocityX;

    enemy.y += enemy.velocityY;

    enemy.grounded = false;


    for (const platform of platforms) {

        const touchingPlatform =
            enemy.x < platform.x + platform.width &&
            enemy.x + enemy.width > platform.x &&
            enemy.y + enemy.height >= platform.y &&
            enemy.y + enemy.height <=
                platform.y + platform.height &&
            enemy.velocityY >= 0;


        if (touchingPlatform) {

            enemy.y =
                platform.y - enemy.height;

            enemy.velocityY = 0;

            enemy.grounded = true;

        }

    }


    // Turn around at platform edges

    if (enemy.grounded) {

        const frontX =
            enemy.velocityX > 0
                ? enemy.x + enemy.width + 2
                : enemy.x - 2;


        const groundAhead =
            platforms.some((platform) => {

                return (
                    frontX >= platform.x &&
                    frontX <=
                        platform.x + platform.width &&
                    enemy.y + enemy.height >=
                        platform.y - 2 &&
                    enemy.y + enemy.height <=
                        platform.y + 5
                );

            });


        if (!groundAhead) {

            enemy.velocityX *= -1;

        }

    }

}


// ========================================
// FLY UPDATE
// ========================================

function updateFly(enemy) {

    enemy.x += enemy.velocityX;


    enemy.y =
        enemy.startY +
        Math.sin(Date.now() / 300) * 30;


    // Turn around after flying
    // too far from starting point

    if (
        enemy.x >
        enemy.startX + 250
    ) {

        enemy.velocityX = -1.5;

    }


    if (
        enemy.x <
        enemy.startX - 250
    ) {

        enemy.velocityX = 1.5;

    }

}


// ========================================
// SPIDER UPDATE
// ========================================

function updateSpider(enemy, platforms) {

    updateWalkingEnemy(
        enemy,
        platforms
    );

}


// ========================================
// GHOST UPDATE
// ========================================

function updateGhost(enemy) {

    enemy.x += enemy.velocityX;


    enemy.y =
        enemy.startY +
        Math.sin(Date.now() / 500) * 45;


    if (
        enemy.x <
        enemy.startX - 200
    ) {

        enemy.velocityX = 1.0;

    }


    if (
        enemy.x >
        enemy.startX + 200
    ) {

        enemy.velocityX = -1.0;

    }

}


// ========================================
// UPDATE ANY ENEMY
// ========================================

export function updateEnemy(enemy, platforms) {

    if (!enemy.alive) {
        return;
    }


    if (
        enemy.type === "beetle" ||
        enemy.type === "cockroach" ||
        enemy.type === "spider"
    ) {

        updateWalkingEnemy(
            enemy,
            platforms
        );

    }


    else if (enemy.type === "fly") {

        updateFly(enemy);

    }


    else if (enemy.type === "ghost") {

        updateGhost(enemy);

    }


    // Cactus does not move.

}


// ========================================
// PLAYER / ENEMY COLLISION
// ========================================

export function checkEnemyCollision(player, enemy) {

    if (!enemy.alive) {
        return false;
    }


    return (
        player.x <
            enemy.x + enemy.width &&

        player.x + player.width >
            enemy.x &&

        player.y <
            enemy.y + enemy.height &&

        player.y + player.height >
            enemy.y
    );

}


// ========================================
// CAN PLAYER STOMP?
// ========================================

export function canStompEnemy(player, enemy) {

    // Cactus cannot be stomped.

    if (enemy.type === "cactus") {
        return false;
    }


    // Ghost cannot be stomped.

    if (enemy.type === "ghost") {
        return false;
    }


    // Fly can be stomped.

    if (enemy.type === "fly") {

        return (
            player.velocityY > 0 &&
            player.y + player.height <=
                enemy.y + 15
        );

    }


    // Walking enemies can be stomped.

    return (
        player.velocityY > 0 &&
        player.y + player.height <=
            enemy.y + 15
    );

}


// ========================================
// DEFEAT ENEMY
// ========================================

export function defeatEnemy(enemy) {

    if (enemy.type === "cactus") {
        return;
    }


    if (enemy.type === "ghost") {
        return;
    }


    enemy.alive = false;

        }
