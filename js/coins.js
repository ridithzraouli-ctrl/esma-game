import {
    collectCoin,
    hasCollectedCoin
} from "./progression.js";


const COIN_SIZE = 16;


export function createCoin(
    x,
    y,
    id
) {

    return {
        x,
        y,
        width: COIN_SIZE,
        height: COIN_SIZE,

        id,

        collected: false
    };

}


export function createCoins(
    coinData,
    world,
    level
) {

    return coinData.map(
        coin => {

            const collected =
                hasCollectedCoin(
                    world,
                    level,
                    coin.id
                );

            return {
                x: coin.x,
                y: coin.y,

                width: COIN_SIZE,
                height: COIN_SIZE,

                id: coin.id,

                collected
            };

        }
    );

}


export function checkCoinCollision(
    player,
    coin
) {

    if (coin.collected) {
        return false;
    }


    return (
        player.x <
            coin.x + coin.width &&

        player.x + player.width >
            coin.x &&

        player.y <
            coin.y + coin.height &&

        player.y + player.height >
            coin.y
    );

}


export function collectCoinObject(
    coin,
    world,
    level
) {

    if (coin.collected) {
        return false;
    }


    const collected =
        collectCoin(
            world,
            level,
            coin.id
        );


    if (!collected) {
        return false;
    }


    coin.collected = true;

    return true;

}


export function updateCoins(
    player,
    coins,
    world,
    level
) {

    let collectedCount = 0;


    for (
        const coin
        of coins
    ) {

        if (
            checkCoinCollision(
                player,
                coin
            )
        ) {

            if (
                collectCoinObject(
                    coin,
                    world,
                    level
                )
            ) {

                collectedCount++;

            }

        }

    }


    return collectedCount;

}


export function drawCoin(
    ctx,
    coin,
    cameraX = 0,
    cameraY = 0
) {

    if (coin.collected) {
        return;
    }


    const x =
        coin.x - cameraX;

    const y =
        coin.y - cameraY;


    ctx.fillStyle =
        "#FFD83D";


    ctx.fillRect(
        x + 4,
        y,
        8,
        16
    );


    ctx.fillRect(
        x + 2,
        y + 3,
        12,
        10
    );


    ctx.fillStyle =
        "#FFF19A";


    ctx.fillRect(
        x + 5,
        y + 2,
        3,
        5
    );

}


export function drawCoins(
    ctx,
    coins,
    cameraX = 0,
    cameraY = 0
) {

    for (
        const coin
        of coins
    ) {

        drawCoin(
            ctx,
            coin,
            cameraX,
            cameraY
        );

    }

}
