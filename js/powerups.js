export const POWER_TYPES = {

    WINGS: "wings",
    BUNNY: "bunny",
    FIRE: "fire"

};


export const ITEM_TYPES = {

    STRAWBERRY: "strawberry",
    WINGS: "wings",
    BUNNY: "bunny",
    FIRE: "fire"

};


const ITEM_SIZE = 16;

const GRAVITY = 0.5;

const MAX_FALL_SPEED = 8;


/* =========================
   CREATE ITEMS
========================= */

function createItem(
    type,
    x,
    y
) {

    return {

        type,

        x,
        y,

        width: ITEM_SIZE,
        height: ITEM_SIZE,

        velocityY: 0,

        grounded: false,

        collected: false

    };

}


export function createStrawberry(
    x,
    y
) {

    return createItem(
        ITEM_TYPES.STRAWBERRY,
        x,
        y
    );

}


export function createWings(
    x,
    y
) {

    return createItem(
        ITEM_TYPES.WINGS,
        x,
        y
    );

}


export function createBunny(
    x,
    y
) {

    return createItem(
        ITEM_TYPES.BUNNY,
        x,
        y
    );

}


export function createFire(
    x,
    y
) {

    return createItem(
        ITEM_TYPES.FIRE,
        x,
        y
    );

}


/* =========================
   CREATE POWER-UP
========================= */

export function createPowerUp(
    type,
    x,
    y
) {

    if (
        type === ITEM_TYPES.STRAWBERRY
    ) {

        return createStrawberry(
            x,
            y
        );

    }


    if (
        type === ITEM_TYPES.WINGS
    ) {

        return createWings(
            x,
            y
        );

    }


    if (
        type === ITEM_TYPES.BUNNY
    ) {

        return createBunny(
            x,
            y
        );

    }


    if (
        type === ITEM_TYPES.FIRE
    ) {

        return createFire(
            x,
            y
        );

    }


    return null;

}


/* =========================
   UPDATE POWER-UPS
========================= */

export function updatePowerUps(
    items,
    platforms,
    blocks = []
) {

    for (
        const item of items
    ) {

        if (
            item.collected
        ) {

            continue;

        }


        if (
            item.grounded
        ) {

            continue;

        }


        item.velocityY +=
            GRAVITY;


        if (
            item.velocityY >
            MAX_FALL_SPEED
        ) {

            item.velocityY =
                MAX_FALL_SPEED;

        }


        const previousBottom =
            item.y +
            item.height;


        item.y +=
            item.velocityY;


        const currentBottom =
            item.y +
            item.height;


        let landed = false;


        /*
            PLATFORM COLLISION
        */

        for (
            const platform
            of platforms
        ) {

            const horizontalCollision =

                item.x <
                    platform.x +
                    platform.width &&

                item.x +
                    item.width >
                    platform.x;


            const verticalCollision =

                previousBottom <=
                    platform.y &&

                currentBottom >=
                    platform.y;


            if (
                horizontalCollision &&
                verticalCollision &&
                item.velocityY >= 0
            ) {

                item.y =
                    platform.y -
                    item.height;

                item.velocityY = 0;

                item.grounded = true;

                landed = true;

                break;

            }

        }


        if (landed) {

            continue;

        }


        /*
            BLOCK COLLISION
        */

        for (
            const block
            of blocks
        ) {

            const horizontalCollision =

                item.x <
                    block.x +
                    block.width &&

                item.x +
                    item.width >
                    block.x;


            const verticalCollision =

                previousBottom <=
                    block.y &&

                currentBottom >=
                    block.y;


            if (
                horizontalCollision &&
                verticalCollision &&
                item.velocityY >= 0
            ) {

                item.y =
                    block.y -
                    item.height;

                item.velocityY = 0;

                item.grounded = true;

                break;

            }

        }

    }

}


/* =========================
   COLLISION
========================= */

export function checkPowerUpCollision(
    player,
    item
) {

    if (
        item.collected
    ) {

        return false;

    }


    return (

        player.x <
            item.x +
            item.width &&

        player.x +
            player.width >
            item.x &&

        player.y <
            item.y +
            item.height &&

        player.y +
            player.height >
            item.y

    );

}


/* =========================
   COLLECT POWER-UP
========================= */

export function collectPowerUp(
    player,
    item
) {

    if (
        item.collected
    ) {

        return false;

    }


    item.collected = true;


    const feet =
        player.y +
        player.height;


    /*
        STRAWBERRY
        Makes the player big.
    */

    if (
        item.type ===
        ITEM_TYPES.STRAWBERRY
    ) {

        player.isBig = true;

        player.width = 16;

        player.height = 32;

        player.y =
            feet -
            player.height;

        return true;

    }


    /*
        WINGS
    */

    if (
        item.type ===
        ITEM_TYPES.WINGS
    ) {

        clearAbilities(
            player
        );


        player.power =
            POWER_TYPES.WINGS;

        player.hasWings = true;


        player.width = 16;

        player.height = 32;

        player.y =
            feet -
            player.height;

        return true;

    }


    /*
        BUNNY
    */

    if (
        item.type ===
        ITEM_TYPES.BUNNY
    ) {

        clearAbilities(
            player
        );


        player.power =
            POWER_TYPES.BUNNY;

        player.hasDoubleJump = true;


        player.width = 16;

        player.height = 32;

        player.y =
            feet -
            player.height;

        return true;

    }


    /*
        FIRE
    */

    if (
        item.type ===
        ITEM_TYPES.FIRE
    ) {

        clearAbilities(
            player
        );


        player.power =
            POWER_TYPES.FIRE;

        player.hasFirePower = true;


        player.width = 16;

        player.height = 32;

        player.y =
            feet -
            player.height;

        return true;

    }


    return false;

}


/* =========================
   CLEAR ABILITIES
========================= */

function clearAbilities(
    player
) {

    player.power = null;

    player.hasWings = false;

    player.hasDoubleJump = false;

    player.hasFirePower = false;

}


/* =========================
   REMOVE POWER
========================= */

export function removePower(
    player
) {

    const feet =
        player.y +
        player.height;


    clearAbilities(
        player
    );


    if (
        player.isBig
    ) {

        player.width = 16;

        player.height = 32;

        player.y =
            feet -
            player.height;

    }

    else {

        player.width = 16;

        player.height = 16;

        player.y =
            feet -
            player.height;

    }

}


/* =========================
   DAMAGE PLAYER
========================= */

export function damagePlayer(
    player
) {

    /*
        POWER-UP IS LOST FIRST.
    */

    if (
        player.power !== null
    ) {

        removePower(
            player
        );

        return false;

    }


    /*
        BIG PLAYER BECOMES SMALL.
    */

    if (
        player.isBig
    ) {

        const feet =
            player.y +
            player.height;


        player.isBig = false;


        player.width = 16;

        player.height = 16;


        player.y =
            feet -
            player.height;


        return false;

    }


    /*
        SMALL PLAYER DIES.
    */

    return true;

}


/* =========================
   POWER CHECKS
========================= */

export function getPlayerPower(
    player
) {

    return player.power;

}


export function hasWings(
    player
) {

    return (

        player.power ===
            POWER_TYPES.WINGS &&

        player.hasWings === true

    );

}


export function canDoubleJump(
    player
) {

    return (

        player.power ===
            POWER_TYPES.BUNNY &&

        player.hasDoubleJump === true

    );

}


export function canShootFire(
    player
) {

    return (

        player.power ===
            POWER_TYPES.FIRE &&

        player.hasFirePower === true

    );

}


/* =========================
   RESET ITEMS
========================= */

export function resetPowerUps(
    items
) {

    for (
        const item of items
    ) {

        item.collected = false;

        item.velocityY = 0;

        item.grounded = false;

    }

}
