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


// ========================================
// RESET PLAYER
// ========================================

export function resetPlayer(x = 100, y = 422) {

    player.x = x;
    player.y = y;

    player.velocityX = 0;
    player.velocityY = 0;

    player.grounded = true;
}


// ========================================
// UPDATE PLAYER
// ========================================

export function updatePlayer(keys, platforms) {

    // LEFT

    if (keys["arrowleft"] || keys["a"]) {

        player.velocityX = -player.speed;

    }


    // RIGHT

    else if (keys["arrowright"] || keys["d"]) {

        player.velocityX = player.speed;

    }


    // STOP

    else {

        player.velocityX *= 0.8;

    }


    // GRAVITY

    player.velocityY += gravity;


    // MOVE

    player.x += player.velocityX;
    player.y += player.velocityY;


    player.grounded = false;


    // PLATFORM COLLISION

    for (const platform of platforms) {

        const touchingPlatform =
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height &&
            player.velocityY >= 0;


        if (touchingPlatform) {

            player.y =
                platform.y - player.height;

            player.velocityY = 0;

            player.grounded = true;

        }

    }


    // LEFT BOUNDARY

    if (player.x < 0) {

        player.x = 0;

    }

}


// ========================================
// JUMP
// ========================================

export function jump() {

    if (!player.grounded) {
        return;
    }


    player.velocityY = -player.jumpPower;

    player.grounded = false;

}
