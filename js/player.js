const SMALL_WIDTH = 16;
const SMALL_HEIGHT = 16;

const BIG_WIDTH = 16;
const BIG_HEIGHT = 32;

export const player = {
    x: 100,
    y: 400,

    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,

    velocityX: 0,
    velocityY: 0,

    speed: 3,
    acceleration: 0.35,
    friction: 0.3,

    jumpPower: 9,
    gravity: 0.5,
    maxFallSpeed: 10,

    grounded: false,

    power: null,
    isBig: false,

    hasWings: false,
    hasDoubleJump: false,
    hasFirePower: false,

    jumpsUsed: 0
};


export function resetPlayer(x = 100, y = 400) {

    player.x = x;
    player.y = y;

    player.velocityX = 0;
    player.velocityY = 0;

    player.grounded = false;

    player.power = null;
    player.isBig = false;

    player.hasWings = false;
    player.hasDoubleJump = false;
    player.hasFirePower = false;

    player.width = SMALL_WIDTH;
    player.height = SMALL_HEIGHT;

    player.jumpsUsed = 0;
}


export function updatePlayer(keys, platforms) {

    let moving = false;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        player.velocityX -=
            player.acceleration;

        moving = true;
    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        player.velocityX +=
            player.acceleration;

        moving = true;
    }


    if (!moving) {

        if (player.velocityX > 0) {

            player.velocityX -=
                player.friction;

            if (player.velocityX < 0) {
                player.velocityX = 0;
            }

        }

        else if (player.velocityX < 0) {

            player.velocityX +=
                player.friction;

            if (player.velocityX > 0) {
                player.velocityX = 0;
            }

        }

    }


    if (
        player.velocityX >
        player.speed
    ) {

        player.velocityX =
            player.speed;

    }


    if (
        player.velocityX <
        -player.speed
    ) {

        player.velocityX =
            -player.speed;

    }


    player.x +=
        player.velocityX;


    if (player.x < 0) {

        player.x = 0;

        player.velocityX = 0;

    }


    player.velocityY +=
        player.gravity;


    if (
        player.velocityY >
        player.maxFallSpeed
    ) {

        player.velocityY =
            player.maxFallSpeed;

    }


    const previousY =
        player.y;

    const previousBottom =
        player.y +
        player.height;


    player.y +=
        player.velocityY;


    player.grounded = false;


    for (
        const platform
        of platforms
    ) {

        const horizontal =
            player.x <
                platform.x +
                platform.width &&

            player.x +
                player.width >
                platform.x;


        const currentBottom =
            player.y +
            player.height;


        const landing =
            previousBottom <=
                platform.y &&

            currentBottom >=
                platform.y &&

            player.velocityY >= 0;


        if (
            horizontal &&
            landing
        ) {

            player.y =
                platform.y -
                player.height;

            player.velocityY = 0;

            player.grounded = true;

            player.jumpsUsed = 0;

            break;

        }

    }


    if (player.grounded) {

        player.jumpsUsed = 0;

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
