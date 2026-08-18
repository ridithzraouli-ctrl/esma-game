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

const ITEM_SIZE = 32;

export function createStrawberry(x, y) {
    return {
        type: ITEM_TYPES.STRAWBERRY,
        x,
        y,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        collected: false
    };
}

export function createWings(x, y) {
    return {
        type: ITEM_TYPES.WINGS,
        x,
        y,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        collected: false
    };
}

export function createBunny(x, y) {
    return {
        type: ITEM_TYPES.BUNNY,
        x,
        y,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        collected: false
    };
}

export function createFire(x, y) {
    return {
        type: ITEM_TYPES.FIRE,
        x,
        y,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
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

export function checkPowerUpCollision(player, item) {
    if (item.collected) {
        return false;
    }

    return (
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y
    );
}

export function collectPowerUp(player, item) {
    if (item.collected) {
        return;
    }

    item.collected = true;

    if (item.type === ITEM_TYPES.STRAWBERRY) {
        player.isBig = true;

        player.width = 48;
        player.height = 64;

        return;
    }

    if (item.type === ITEM_TYPES.WINGS) {
        clearAbilities(player);

        player.power = POWER_TYPES.WINGS;
        player.hasWings = true;

        return;
    }

    if (item.type === ITEM_TYPES.BUNNY) {
        clearAbilities(player);

        player.power = POWER_TYPES.BUNNY;
        player.hasDoubleJump = true;

        return;
    }

    if (item.type === ITEM_TYPES.FIRE) {
        clearAbilities(player);

        player.power = POWER_TYPES.FIRE;
        player.hasFirePower = true;
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
}

export function damagePlayer(player) {
    if (player.power !== null) {
        removePower(player);
        return false;
    }

    if (player.isBig) {
        player.isBig = false;

        player.width = 32;
        player.height = 48;

        return false;
    }

    return true;
}

export function getPlayerPower(player) {
    return player.power;
}

export function hasWings(player) {
    return (
        player.power === POWER_TYPES.WINGS &&
        player.hasWings === true
    );
}

export function canDoubleJump(player) {
    return (
        player.power === POWER_TYPES.BUNNY &&
        player.hasDoubleJump === true
    );
}

export function canShootFire(player) {
    return (
        player.power === POWER_TYPES.FIRE &&
        player.hasFirePower === true
    );
}

export function resetPowerUps(items) {
    for (const item of items) {
        item.collected = false;
    }
}
