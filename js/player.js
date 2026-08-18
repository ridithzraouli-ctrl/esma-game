const NORMAL_WIDTH = 32;
const NORMAL_HEIGHT = 48;

const BIG_WIDTH = 48;
const BIG_HEIGHT = 64;

export const player = {
    x: 100,
    y: 400,

    width: NORMAL_WIDTH,
    height: NORMAL_HEIGHT,

    velocityX: 0,
    velocityY: 0,

    speed: 4.5,
    jumpPower: 11,

    grounded: false,

    power: null,

    isBig: false,

    hasWings: false,
    hasDoubleJump: false,
    hasFirePower: false,

    jumpsUsed: 0
};

const gravity = 0.6;
const maxFallSpeed = 14;


export function resetPlayer(x = 100, y = 400) {

    player.x = x;
    player.y = y;

    player.velocityX = 0;
    player.velocityY = 0;

    player.grounded = false;

    player.jumpsUsed = 0;

}


export function updatePlayer(keys, platforms) {

    player.velocityX = 0;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        player.velocityX = -player.speed;

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        player.velocityX = player.speed;

    }


    player.x += player.velocityX;


    player.velocityY += gravity;


    if (
        player.velocityY >
        maxFallSpeed
    ) {

        player.velocityY =
            maxFallSpeed;

    }


    player.y += player.velocityY;


    player.grounded = false;


    for (
        const platform of platforms
    ) {

        const horizontal =
            player.x <
                platform.x + platform.width &&
            player.x + player.width >
                platform.x;


        const falling =
            player.velocityY >= 0;


        const landing =
            player.y + player.height >=
                platform.y &&
            player.y + player.height <=
                platform.y +
                platform.height;


        if (
            horizontal &&
            falling &&
            landing
        ) {

            player.y =
                platform.y -
                player.height;

            player.velocityY = 0;

            player.grounded = true;

            player.jumpsUsed = 0;

        }

    }


    if (player.grounded) {

        player.jumpsUsed = 0;

    }


    if (player.x < 0) {

        player.x = 0;

    }

}


export function jump() {

    if (player.grounded) {

        player.velocityY =
            -player.jumpPower;

        player.grounded = false;

        player.jumpsUsed = 1;

        return true;

    }


    if (
        player.hasDoubleJump &&
        player.jumpsUsed < 2
    ) {

        player.velocityY =
            -player.jumpPower;

        player.jumpsUsed++;

        return true;

    }


    return false;

}
