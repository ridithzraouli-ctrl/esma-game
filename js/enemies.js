// ========================================
// ENEMY SYSTEM
// ========================================


// ========================================
// BEETLE
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
// FLY
// ========================================

export function createFly(x, y) {

    return {
        type: "fly",

        x,
        y,

        width: 28,
        height: 24,

        velocityX: -1.5,
        velocityY: 0,

        startY: y,

        alive: true
    };

}


// ========================================
// ENEMY GRAVITY
// ========================================

const gravity = 0.6;


// ========================================
// UPDATE BEETLE
// ========================================

function updateBeetle(enemy, platforms) {

    enemy.velocityY += gravity;

    enemy.x += enemy.velocityX;

    enemy.y += enemy.velocityY;

    enemy.grounded = false;


    for (const platform of platforms) {

        const touchingPlatform =
            enemy.x < platform.x + platform.width &&
            enemy.x + enemy.width > platform.x &&
            enemy.y + enemy.height >= platform.y &&
            enemy.y + enemy.height <= platform.y + platform.height &&
            enemy.velocityY >= 0;


        if (touchingPlatform) {

            enemy.y =
                platform.y - enemy.height;

            enemy.velocityY = 0;

            enemy.grounded = true;

        }

    }


    if (enemy.grounded) {

        const frontX =
            enemy.velocityX > 0
                ? enemy.x + enemy.width + 2
                : enemy.x - 2;


        const groundAhead = platforms.some((platform) => {

            return (
                frontX >= platform.x &&
                frontX <= platform.x + platform.width &&
                enemy.y + enemy.height >= platform.y - 2 &&
                enemy.y + enemy.height <= platform.y + 5
            );

        });


        if (!groundAhead) {

            enemy.velocityX *= -1;

        }

    }

}


// ========================================
// UPDATE FLY
// ========================================

function updateFly(enemy) {

    enemy.x += enemy.velocityX;


    // Gentle up and down flying movement

    enemy.y =
        enemy.startY +
        Math.sin(Date.now() / 300) * 30;

}


// ========================================
// UPDATE ANY ENEMY
// ========================================

export function updateEnemy(enemy, platforms) {

    if (!enemy.alive) {
        return;
    }


    if (enemy.type === "beetle") {

        updateBeetle(
            enemy,
            platforms
        );

    }


    else if (enemy.type === "fly") {

        updateFly(enemy);

    }

}


// ========================================
// PLAYER / ENEMY COLLISION
// ========================================

export function checkEnemyCollision(player, enemy) {

    if (!enemy.alive) {
        return false;
    }


    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    );

}


// ========================================
// STOMP ENEMY
// ========================================

export function canStompEnemy(player, enemy) {

    const playerBottom =
        player.y + player.height;

    const enemyTop =
        enemy.y;


    return (
        player.velocityY > 0 &&
        playerBottom <= enemyTop + 15
    );

}
