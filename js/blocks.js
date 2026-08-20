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

export function checkBlockCollision(player, block) {
    return (
        player.x <
            block.x + block.width &&
        player.x + player.width >
            block.x &&
        player.y <
            block.y + block.height &&
        player.y + player.height >
            block.y
    );
}

export function hitBlock(player, block) {
    if (block.hit) {
        return null;
    }

    const previousBottom =
        player.y +
        player.height -
        player.velocityY;

    const hittingFromBelow =
        player.velocityY < 0 &&
        previousBottom <=
            block.y + block.height &&
        player.y +
            player.height >=
            block.y;

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
            !checkBlockCollision(
                player,
                block
            )
        ) {
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
                    (
                        block.width -
                        BLOCK_SIZE
                    ) / 2,
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
    block
) {
    ctx.fillStyle =
        block.hit
            ? "#8A8A8A"
            : "#FFD447";

    ctx.fillRect(
        block.x,
        block.y,
        block.width,
        block.height
    );

    ctx.strokeStyle =
        "#8A5A00";

    ctx.lineWidth = 1;

    ctx.strokeRect(
        block.x,
        block.y,
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
            block.x +
                block.width / 2,
            block.y +
                block.height / 2
        );
    }
}
