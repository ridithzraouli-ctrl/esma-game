const BLOCK_WIDTH = 40;
const BLOCK_HEIGHT = 40;

export function createBlock(x, y, content = null) {
    return {
        x,
        y,
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,

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

export function checkBlockCollision(player, block) {
    return (
        player.x < block.x + block.width &&
        player.x + player.width > block.x &&
        player.y < block.y + block.height &&
        player.y + player.height > block.y
    );
}

export function hitBlock(player, block) {
    if (block.hit) {
        return null;
    }

    const hittingFromBelow =
        player.velocityY < 0 &&
        player.y <= block.y + block.height &&
        player.y + player.height > block.y;

    if (!hittingFromBelow) {
        return null;
    }

    block.hit = true;

    if (
        block.content &&
        !block.released
    ) {
        block.released = true;

        return block.content;
    }

    return null;
}

export function updateBlocks(
    player,
    blocks
) {
    const released = [];

    for (const block of blocks) {

        if (
            checkBlockCollision(
                player,
                block
            )
        ) {

            const item =
                hitBlock(
                    player,
                    block
                );

            if (item) {
                released.push({
                    type: item,
                    x: block.x,
                    y: block.y - 40
                });
            }
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
    ctx.fillStyle =
        block.hit
            ? "#777777"
            : "#FFD54A";

    ctx.fillRect(
        block.x - cameraX,
        block.y - cameraY,
        block.width,
        block.height
    );

    if (!block.hit) {

        ctx.fillStyle = "#000000";

        ctx.font = "24px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "?",
            block.x +
                block.width / 2 -
                cameraX,

            block.y +
                block.height * 0.72 -
                cameraY
        );
    }
}
