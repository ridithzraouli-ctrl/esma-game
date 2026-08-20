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


export function createStrawberry(x, y) {
    return createItem(
        ITEM_TYPES.STRAWBERRY,
        x,
        y
    );
}


export function createWings(x, y) {
    return createItem(
        ITEM_TYPES.WINGS,
        x,
        y
    );
}


export function createBunny(x, y) {
    return createItem(
        ITEM_TYPES.BUNNY,
        x,
        y
    );
}


export function createFire(x, y) {
    return createItem(
        ITEM_TYPES.FIRE,
        x,
        y
    );
}


function createItem(type, x, y) {
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


export function createPowerUp(type, x, y) {

    if (type === ITEM_TYPES.STRAWBERRY) {
        return createStrawberry(x, y);
    }

    if (type === ITEM_TYPES.WINGS) {
        return createWings(x, y);
    }

    if (type === ITEM_TYPES.BUNNY) {
        return createBunny(x, y);
    }

    if (type === ITEM_TYPES.FIRE) {
        return createFire(x, y);
    }

    return null;
}


export function updatePowerUps(items, platforms) {

    for (const item of items) {

        if (item.collected) {
            continue;
        }

        if (item.grounded) {
            continue;
        }

        item.velocityY += GRAVITY;

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


        for (const platform of platforms) {

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

                break;
            }

        }
    }
}


export function checkPowerUpCollision(
    player,
    item
) {

    if (item.collected) {
        return false;
    }

    return (
        player.x <
            item.x + item.width &&

        player.x +
            player.width >
            item.x &&

        player.y <
            item.y + item.height &&

        player.y +
            player.height >
            item.y
    );
}


export function collectPowerUp(
    player,
    item
) {

    if (item.collected) {
        return;
    }

    item.collected = true;


    if (
        item.type ===
        ITEM_TYPES.STRAWBERRY
    ) {

        player.isBig = true;

        player.width = 16;
        player.height = 32;

        return;
    }


    if (
        item.type ===
        ITEM_TYPES.WINGS
    ) {

        clearAbilities(player);

        player.power =
            POWER_TYPES.WINGS;

        player.hasWings = true;
        player.hasDoubleJump = true;

        player.width = 16;
        player.height = 32;

        return;
    }


    if (
        item.type ===
        ITEM_TYPES.BUNNY
    ) {

        clearAbilities(player);

        player.power =
            POWER_TYPES.BUNNY;

        player.width = 16;
        player.height = 32;

        return;
    }


    if (
        item.type ===
        ITEM_TYPES.FIRE
    ) {

        clearAbilities(player);

        player.power =
            POWER_TYPES.FIRE;

        player.hasFirePower = true;

        player.width = 16;
        player.height = 32;
    }
}


function clearAbilities(player) {

    player.power = null;

    player.hasWings = false;
    player.hasDoubleJump = false;
    player.hasFirePower = false;
}


export function removePower(player) {

    clearAbilities(player);

    if (player.isBig) {

        player.width = 16;
        player.height = 32;

    } else {

        player.width = 16;
        player.height = 16;

    }
}


export function damagePlayer(player) {

    if (player.power !== null) {

        removePower(player);

        return false;
    }


    if (player.isBig) {

        player.isBig = false;

        player.width = 16;
        player.height = 16;

        return false;
    }


    return true;
}


export function getPlayerPower(player) {
    return player.power;
}


export function hasWings(player) {

    return (
        player.power ===
            POWER_TYPES.WINGS &&

        player.hasWings === true
    );
}


export function canDoubleJump(player) {

    return (
        player.hasDoubleJump === true
    );
}


export function canShootFire(player) {

    return (
        player.power ===
            POWER_TYPES.FIRE &&

        player.hasFirePower === true
    );
}


export function resetPowerUps(items) {

    for (const item of items) {

        item.collected = false;
        item.velocityY = 0;
        item.grounded = false;
    }
        }
