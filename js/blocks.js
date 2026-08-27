const BLOCK_SIZE = 16;
const POP_DISTANCE = 16;


export function createBlock(
    x,
    y,
    content = null
) {

    return {

        x,
        y,

        width: BLOCK_SIZE,
        height: BLOCK_SIZE,

        content,

        hit: false,
        released: false,
        broken: false

    };

}


export function createBlocks(
    blockData
) {

    return blockData.map(
        block =>
            createBlock(
                block.x,
                block.y,
                block.type || null
            )
    );

}


export function checkBlockCollision(
    player,
    block
) {

    if (block.broken) {
        return false;
    }

    return (

        player.x <
            block.x +
            block.width &&

        player.x +
            player.width >
            block.x &&

        player.y <
            block.y +
            block.height &&

        player.y +
            player.height >
            block.y

    );

}


function wasHitFromBelow(
    player,
    block
) {

    if (
        player.previousY === undefined
    ) {

        return false;

    }


    const previousBottom =
        player.previousY +
        player.height;


    const currentTop =
        player.y;


    return (

        player.velocityY <= 0 &&

        previousBottom >=
            block.y +
            block.height &&

        currentTop <=
            block.y +
            block.height &&

        player.x <
            block.x +
            block.width &&

        player.x +
            player.width >
            block.x

    );

}


export function hitBlock(
    player,
    block
) {

    if (
        block.hit ||
        block.broken
    ) {

        return null;

    }


    if (
        !wasHitFromBelow(
            player,
            block
        )
    ) {

        return null;

    }


    player.y =
        block.y +
        block.height;


    player.velocityY = 0;


    /*
        BRICK
    */

    if (
        block.content ===
        "BRICK"
    ) {

        if (
            player.isBig
        ) {

            block.broken = true;

        }

        return null;

    }


    /*
        LUCKY BLOCK
    */

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


    for (
        const block
        of blocks
    ) {

        if (
            block.broken
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
                    block.x,

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

    if (
        block.broken
    ) {

        return;

    }


    const x =
        block.x -
        cameraX;

    const y =
        block.y -
        cameraY;


    /*
        BRICK
    */

    if (
        block.content ===
        "BRICK"
    ) {

        ctx.fillStyle =
            "#A85D32";

        ctx.fillRect(
            x,
            y,
            block.width,
            block.height
        );


        ctx.strokeStyle =
            "#67351F";

        ctx.lineWidth = 1;

        ctx.strokeRect(
            x,
            y,
            block.width,
            block.height
        );


        ctx.strokeStyle =
            "#7D4326";

        ctx.beginPath();

        ctx.moveTo(
            x,
            y + 8
        );

        ctx.lineTo(
            x + 16,
            y + 8
        );

        ctx.moveTo(
            x + 8,
            y
        );

        ctx.lineTo(
            x + 8,
            y + 8
        );

        ctx.moveTo(
            x + 4,
            y + 8
        );

        ctx.lineTo(
            x + 4,
            y + 16
        );

        ctx.moveTo(
            x + 12,
            y + 8
        );

        ctx.lineTo(
            x + 12,
            y + 16
        );

        ctx.stroke();

        return;

    }


    /*
        LUCKY BLOCK
    */

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


    if (
        !block.hit
    ) {

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
            x +
                block.width / 2,
            y +
                block.height / 2
        );

    }

            }
