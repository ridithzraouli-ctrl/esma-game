const SMALL_WIDTH = 16;
const SMALL_HEIGHT = 16;

const BIG_WIDTH = 16;
const BIG_HEIGHT = 32;

const INVINCIBILITY_TIME = 1000;


export const player = {

    x: 100,
    y: 400,

    previousY: 400,

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

    jumpsUsed: 0,

    invincibleUntil: 0,
    damageFlash: false
};


export function resetPlayer(
    x = 100,
    y = 400,
    keepPower = false
) {

    const oldPower = player.power;
    const oldBig = player.isBig;

    const oldWings = player.hasWings;
    const oldDoubleJump = player.hasDoubleJump;
    const oldFirePower = player.hasFirePower;

    player.x = x;
    player.y = y;
    player.previousY = y;

    player.velocityX = 0;
    player.velocityY = 0;

    player.grounded = false;

    player.jumpsUsed = 0;

    player.invincibleUntil = 0;
    player.damageFlash = false;

    if (keepPower) {

        player.power = oldPower;
        player.isBig = oldBig;

        player.hasWings = oldWings;
        player.hasDoubleJump = oldDoubleJump;
        player.hasFirePower = oldFirePower;

        if (player.isBig) {

            player.width = BIG_WIDTH;
            player.height = BIG_HEIGHT;

        }
        else {

            player.width = SMALL_WIDTH;
            player.height = SMALL_HEIGHT;

        }

    }
    else {

        player.power = null;
        player.isBig = false;

        player.hasWings = false;
        player.hasDoubleJump = false;
        player.hasFirePower = false;

        player.width = SMALL_WIDTH;
        player.height = SMALL_HEIGHT;

    }

}


export function isInvincible() {

    return Date.now() <
        player.invincibleUntil;

}


export function updateInvincibility() {

    if (!isInvincible()) {

        player.damageFlash = false;

        return;

    }

    player.damageFlash =
        Math.floor(
            Date.now() / 100
        ) % 2 === 0;

}


export function damagePlayer() {

    if (isInvincible()) {
        return "invincible";
    }


    player.invincibleUntil =
        Date.now() +
        INVINCIBILITY_TIME;


    player.velocityY = -5;


    if (player.power !== null) {

        player.power = null;

        player.hasWings = false;
        player.hasDoubleJump = false;
        player.hasFirePower = false;

        player.isBig = true;

        player.width = BIG_WIDTH;
        player.height = BIG_HEIGHT;

        return "power";

    }


    if (player.isBig) {

        player.isBig = false;

        player.width = SMALL_WIDTH;
        player.height = SMALL_HEIGHT;

        return "big";

    }


    return "dead";

}


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

    updateInvincibility();

    /*
        Save the player's position
        BEFORE moving this frame.
    */

    player.previousY =
        player.y;

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


    player.x +=
        player.velocityX;


    if (
        player.x < 0
    ) {

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


    const previousTop =
        player.y;

    const previousBottom =
        player.y +
        player.height;


    player.y +=
        player.velocityY;


    player.grounded = false;


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


    for (
        const block of blocks
    ) {

        if (
            block.broken
        ) {

            continue;

        }


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

    if (
        player.grounded
    ) {

        player.velocityY =
            -player.jumpPower;

        player.grounded = false;

        player.jumpsUsed = 1;

        return true;

    }


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
