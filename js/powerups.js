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
const SLIDE_SPEED = 1.5;
const EMERGE_SPEED = 1.5;

function createItem(type, x, y) {
    return {
        type,
        x,
        y,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        velocityX: SLIDE_SPEED,
        velocityY: 0,
        grounded: false,
        collected: false,
        emerging: true,
        emergeTargetY: y - ITEM_SIZE * 2
    };
}

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

export function updatePowerUps(
    items,
    platforms,
    blocks = []
) {
    for (const item of items) {
        if (item.collected) {
            continue;
        }

        if (item.emerging) {
            item.y -= EMERGE_SPEED;

            if (
                item.y <=
                item.emergeTargetY
            ) {
                item.y =
                    item.emergeTargetY;

                item.emerging = false;
                item.grounded = true;
                item.velocityY = 0;
            }

            continue;
        }

        item.x += item.velocityX;

        if (!item.grounded) {
            item.velocityY += GRAVITY;

            if (
                item.velocityY >
                MAX_FALL_SPEED
            ) {
                item.velocityY =
                    MAX_FALL_SPEED;
            }
        }

        const previousY = item.y;

        const previousBottom =
            previousY +
            item.height;

        item.y += item.velocityY;

        item.grounded = false;

        for (
            const platform
            of platforms
        ) {
            const horizontal =
                item.x <
                    platform.x +
                    platform.width &&
                item.x +
                    item.width >
                    platform.x;

            const vertical =
                previousBottom <=
                    platform.y &&
                item.y +
                    item.height >=
                    platform.y;

            if (
                horizontal &&
                vertical &&
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

        if (!item.grounded) {
            for (
                const block
                of blocks
            ) {
                if (block.broken) {
                    continue;
                }

                const horizontal =
                    item.x <
                        block.x +
                        block.width &&
                    item.x +
                        item.width >
                        block.x;

                const vertical =
                    previousBottom <=
                        block.y &&
                    item.y +
                        item.height >=
                        block.y;

                if (
                    horizontal &&
                    vertical &&
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

        if (item.grounded) {
            let blockedLeft = false;
            let blockedRight = false;

            for (
                const platform
                of platforms
            ) {
                const verticalOverlap =
                    item.y <
                        platform.y +
                        platform.height &&
                    item.y +
                        item.height >
                        platform.y;

                if (!verticalOverlap) {
                    continue;
                }

                if (
                    item.x +
                        item.width >=
                        platform.x &&
                    item.x <
                        platform.x
                ) {
                    blockedRight = true;
                }

                if (
                    item.x <=
                        platform.x +
                        platform.width &&
                    item.x +
                        item.width >
                        platform.x +
                        platform.width
                ) {
                    blockedLeft = true;
                }
            }

            for (
                const block
                of blocks
            ) {
                if (block.broken) {
                    continue;
                }

                const verticalOverlap =
                    item.y <
                        block.y +
                        block.height &&
                    item.y +
                        item.height >
                        block.y;

                if (!verticalOverlap) {
                    continue;
                }

                if (
                    item.x +
                        item.width >=
                        block.x &&
                    item.x <
                        block.x
                ) {
                    blockedRight = true;
                }

                if (
                    item.x <=
                        block.x +
                        block.width &&
                    item.x +
                        item.width >
                        block.x +
                        block.width
                ) {
                    blockedLeft = true;
                }
            }

            if (blockedLeft) {
                item.velocityX =
                    Math.abs(
                        SLIDE_SPEED
                    );
            }

            if (blockedRight) {
                item.velocityX =
                    -Math.abs(
                        SLIDE_SPEED
                    );
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
            }/* =========================
   COLLECT
========================= */

export function collectPowerUp(
    player,
    item
) {

    if (item.collected) {
        return false;
    }

    item.collected = true;

    const feet =
        player.y +
        player.height;

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

    if (
        item.type ===
        ITEM_TYPES.WINGS
    ) {

        clearAbilities(player);

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

    if (
        item.type ===
        ITEM_TYPES.BUNNY
    ) {

        clearAbilities(player);

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

function clearAbilities(player) {

    player.power = null;

    player.hasWings = false;

    player.hasDoubleJump = false;

    player.hasFirePower = false;
}


/* =========================
   REMOVE POWER
========================= */

export function removePower(player) {

    const feet =
        player.y +
        player.height;

    clearAbilities(player);

    if (player.isBig) {

        player.width = 16;
        player.height = 32;

        player.y =
            feet -
            player.height;

    } else {

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

export function damagePlayer(player) {

    if (player.power !== null) {

        removePower(player);

        return false;
    }

    if (player.isBig) {

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

    return true;
}


/* =========================
   POWER CHECKS
========================= */

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
        player.power ===
            POWER_TYPES.BUNNY &&
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


/* =========================
   RESET
========================= */

export function resetPowerUps(items) {

    for (const item of items) {

        item.collected = false;
        item.velocityX = SLIDE_SPEED;
        item.velocityY = 0;
        item.grounded = false;
        item.emerging = false;

    }
}
