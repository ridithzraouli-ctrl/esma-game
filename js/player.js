export const player = {
    x: 100,
    y: 422,

    width: 32,
    height: 48,

    velocityX: 0,
    velocityY: 0,

    speed: 5,
    jumpPower: 12,

    grounded: true
};

const gravity = 0.6;

export function updatePlayer(keys, platforms) {

    // Move left
    if (keys["arrowleft"] || keys["a"]) {
        player.velocityX = -player.speed;
    }

    // Move right
    else if (keys["arrowright"] || keys["d"]) {
        player.velocityX = player.speed;
    }

    // Stop
    else {
        player.velocityX *= 0.8;
    }

    // Gravity
    player.velocityY += gravity;

    // Move
    player.x += player.velocityX;
    player.y += player.velocityY;

    player.grounded = false;

    // Platform collision
    for (const platform of platforms) {

        const touchingPlatform =
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height &&
            player.velocityY >= 0;

        if (touchingPlatform) {

            player.y = platform.y - player.height;

            player.velocityY = 0;

            player.grounded = true;
        }
    }

    // Don't leave the level from the left
    if (player.x < 0) {
        player.x = 0;
    }
}

export function jump() {

    if (player.grounded) {

        player.velocityY = -player.jumpPower;

        player.grounded = false;
    }
}
