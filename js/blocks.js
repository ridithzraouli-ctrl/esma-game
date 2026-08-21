const BLOCK_SIZE = 16;
const POP_DISTANCE = 16;


/* =========================
   CREATE BLOCK
========================= */

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
        released: false

    };

}


/* =========================
   CREATE BLOCKS
========================= */

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


/* =========================
   COLLISION
========================= */

export function checkBlockCollision(
    player,
    block
) {

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


/* =========================
   HIT BLOCK
========================= */

export function hitBlock(
    player,
    block
) {

    if (block.hit) {
        return null;
    }


    /*
        The player is moving upward.

        We check where the player's bottom
        was during the previous frame.

        This makes sure the block is actually
        being hit from underneath.
    */

    const previousBottom =
        player.y +
        player.height -
        player.velocityY;


    const hittingFromBelow =

        player.velocityY < 0 &&

        previousBottom >=
            block.y +
            block.height - 1 &&

        player.y <
            block.y +
            block.height;


    if (!hittingFromBelow) {
        return null;
    }


    /*
        STOP THE PLAYER FROM GOING
        THROUGH THE BLOCK.
    */

    player.y =
        block.y +
        block.height;


    player.velocityY = 0;


    /*
        The block has now been hit.
    */

    block.hit = true;


    /*
        Release the power-up if
        this block contains one.
    */

    if (
        block.content &&
        !block.released
    ) {

        block.released = true;


        return block.content;

    }


    return null;

}


/* =========================
   UPDATE BLOCKS
========================= */

export function updateBlocks(
    player,
    blocks
) {

    const released = [];


    for (
        const block
        of blocks
    ) {

        /*
            Only process blocks that
            are currently touching the player.
        */

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


        /*
            A power-up was released.
        */

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


/* =========================
   DRAW BLOCK
========================= */

export function drawBlock(
    ctx,
    block,
    cameraX = 0,
    cameraY = 0
) {

    const x =
        block.x -
        cameraX;

    const y =
        block.y -
        cameraY;


    /*
        Used blocks become gray.
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


    /*
        Border
    */

    ctx.strokeStyle =
        "#8A5A00";

    ctx.lineWidth = 1;


    ctx.strokeRect(
        x,
        y,
        block.width,
        block.height
    );


    /*
        Question mark
    */

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

            x +
                block.width / 2,

            y +
                block.height / 2

        );

    }

}
