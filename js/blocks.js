const BLOCK_SIZE = 16;
const POP_DISTANCE = 16;

export function createBlock(x, y, content = null) {
    return {
        x,
        y,
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        content,
        hit: false,
        released: false
    };
}

export function createBlocks(blockData) {
    return blockData.map(block =>
        createBlock(
            block.x,
            block.y,
            block.type || null
        )
    );
}

function overlaps(player, block) {
    return (
        player.x < block.x + block.width &&
        player.x + player.width > block.x &&
        player.y < block.y + block.height &&
        player.y + player.height > block.y
    );
}

function hitFromBelow(player, block) {
    const previousBottom =
        player.y +
        player.height -
        player.velocityY;

    return (
        player.velocityY < 0 &&
        previousBottom <= block.y + block.height &&
        player.y + player.height >= block.y
    );
}

function landOnTop(player, block) {
    const previousBottom =
        player.y +
        player.height -
        player.velocityY;

    return (
        player.velocityY >= 0 &&
        previousBottom <= block.y &&
        player.y + player.height >= block.y
    );
}

function hitFromSide(player, block) {
    const previousLeft =
        player.x -
        player.velocityX;

    const previousRight =
        player.x +
        player.width -
        player.velocityX;

    const verticalOverlap =
        player.y < block.y + block.height &&
        player.y + player.height > block.y;

    if (!verticalOverlap) {
        return false;
    }

    return (
        player.velocityX > 0 &&
        previousRight <= block.x &&
        player.x + player.width >= block.x
    ) || (
        player.velocityX < 0 &&
        previousLeft >= block.x + block.width &&
        player.x <= block.x + block.width
    );
}

export function checkBlockCollision(player, block) {
    return overlaps(player, block);
}

export function hitBlock(player, block) {
    if (!overlaps(player, block)) {
        return null;
    }

    if (hitFromBelow(player, block)) {
        player.y =
            block.y +
            block.height;

        player.velocityY = 0;

        if (!block.hit) {
            block.hit = true;

            if (
                block.content &&
                !block.released
            ) {
                block.released = true;
                return block.content;
            }
        }

        return null;
    }

    if (landOnTop(player, block)) {
        player.y =
            block.y -
            player.height;

        player.velocityY = 0;
        return null;
    }

    if (hitFromSide(player, block)) {
        if (player.velocityX > 0) {
            player.x =
                block.x -
                player.width;
        } else {
            player.x =
                block.x +
                block.width;
        }

        player.velocityX = 0;
    }

    return null;
}

export function updateBlocks(
    player,
    blocks
) {
    const released = [];

    for (const block of blocks) {
        if (!overlaps(player, block)) {
            continue;
        }

        const item =
            hitBlock(
                player,
                block
            );

        if (item) {
            released.push({
                type: item,
                x:
                    block.x +
                    (block.width - BLOCK_SIZE) / 2,
                y:
                    block.y -
                    POP_DISTANCE
            });
        }
    }

    return released;
}

export function drawBlock(
    ctx,
    block,
    cameraX = 0,
    cameraY = 0
) {
    const x =
        block.x - cameraX;

    const y =
        block.y - cameraY;

    ctx.fillStyle =
        block.hit
            ? "#8A8A8A"
            : "#FFD447";

    ctx.fillRect(
        x,
        y,
        block.width,
        block.height
    );

    ctx.strokeStyle =
        "#8A5A00";

    ctx.lineWidth = 1;

    ctx.strokeRect(
        x,
        y,
        block.width,
        block.height
    );

    if (!block.hit) {
        ctx.fillStyle =
            "#5A3A00";

        ctx.font =
            "bold 13px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillText(
            "?",
            x + block.width / 2,
            y + block.height / 2
        );
    }
}
