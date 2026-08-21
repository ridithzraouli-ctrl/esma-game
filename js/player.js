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


export function resetPlayer(
    x = 100,
    y = 400
) {

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


/*
    Checks whether the player is horizontally
    touching an object.
*/

function horizontalCollision(
    player,
    object
) {

    return (
        player.x <
            object.x +
            object.width &&

        player.x +
            player.width >
            object.x
    );

}


/*
    Checks whether the player is landing
    ON TOP of an object.
*/

function landingCollision(
    player,
    object,
    previousBottom
) {

    const currentBottom =
        player.y +
        player.height;

    return (
        horizontalCollision(
            player,
            object
        ) &&

        previousBottom <=
            object.y &&

        currentBottom >=
            object.y &&

        player.velocityY >= 0
    );

}


/*
    Checks whether the player is hitting
    the BOTTOM of an object.
*/

function bottomCollision(
    player,
    object,
    previousTop
) {

    const currentTop =
        player.y;

    return (
        horizontalCollision(
            player,
            object
        ) &&

        previousTop >=
            object.y +
            object.height &&

        currentTop <=
            object.y +
            object.height &&

        player.velocityY < 0
    );

}


export function updatePlayer(
    keys,
    platforms,
    blocks = []
) {

    let moving = false;


    /* =========================
       HORIZONTAL MOVEMENT
    ========================= */

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

        if (
            player.velocityX > 0
        ) {

            player.velocityX -=
                player.friction;

            if (
                player.velocityX < 0
            ) {

                player.velocityX = 0;

            }

        }

        else if (
            player.velocityX < 0
        ) {

            player.velocityX +=
                player.friction;

            if (
                player.velocityX > 0
            ) {

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


    /*
        Move horizontally.

        IMPORTANT:
        Blocks are NOT moved here.
        They stay at their world coordinates.
    */

    player.x +=
        player.velocityX;


    if (
        player.x < 0
    ) {

        player.x = 0;
        player.velocityX = 0;

    }


    /* =========================
       GRAVITY
    ========================= */

    player.velocityY +=
        player.gravity;


    if (
        player.velocityY >
        player.maxFallSpeed
    ) {

        player.velocityY =
            player.maxFallSpeed;

    }


    /* =========================
       VERTICAL MOVEMENT
    ========================= */

    const previousTop =
        player.y;

    const previousBottom =
        player.y +
        player.height;


    player.y +=
        player.velocityY;


    player.grounded = false;


    /* =========================
       PLATFORM COLLISION
    ========================= */

    for (
        const platform of platforms
    ) {

        if (
            landingCollision(
                player,
                platform,
                previousBottom
            )
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


    /* =========================
       BLOCK COLLISION
    ========================= */

    for (
        const block of blocks
    ) {

        /*
            Landing ON TOP of a block.
        */

        if (
            landingCollision(
                player,
                block,
                previousBottom
            )
        ) {

            player.y =
                block.y -
                player.height;

            player.velocityY = 0;

            player.grounded = true;

            player.jumpsUsed = 0;

            break;

        }


        /*
            Hitting the BOTTOM of a block.

            This stops the player from passing
            straight through the ? block.
        */

        if (
            bottomCollision(
                player,
                block,
                previousTop
            )
        ) {

            player.y =
                block.y +
                block.height;

            player.velocityY = 0;

            break;

        }

    }


    if (
        player.grounded
    ) {

        player.jumpsUsed = 0;

    }

}


export function jump() {

    /*
        Normal jump.
    */

    if (
        player.grounded
    ) {

        player.velocityY =
            -player.jumpPower;

        player.grounded = false;

        player.jumpsUsed = 1;

        return true;

    }


    /*
        Bunny / Wings:
        second jump in mid-air.
    */

    if (
        (
            player.hasDoubleJump ||
            player.hasWings
        ) &&

        player.jumpsUsed < 2
    ) {

        player.velocityY =
            -player.jumpPower;

        player.jumpsUsed++;

        return true;

    }


    return false;

        }
