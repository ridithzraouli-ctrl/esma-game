import {
    isWorldUnlocked,
    isLevelUnlocked,
    isLevelCompleted
} from "./progression.js";


const MAP_WIDTH = 960;
const MAP_HEIGHT = 540;


const WORLD_MAPS = {

    1: {
        background: "#8ED6FF",

        nodes: [
            { x: 150, y: 390 },
            { x: 300, y: 330 },
            { x: 450, y: 390 },
            { x: 600, y: 300 }
        ],

        decorations: [
            { type: "tree", x: 80, y: 340 },
            { type: "tree", x: 760, y: 330 },
            { type: "hill", x: 400, y: 410 },
            { type: "hill", x: 700, y: 420 }
        ]
    },


    2: {
        background: "#C8B6FF",

        nodes: [
            { x: 140, y: 390 },
            { x: 290, y: 300 },
            { x: 440, y: 360 },
            { x: 590, y: 250 }
        ],

        decorations: [
            { type: "rock", x: 80, y: 390 },
            { type: "rock", x: 750, y: 360 },
            { type: "hill", x: 350, y: 430 }
        ]
    },


    3: {
        background: "#FFB4A2",

        nodes: [
            { x: 130, y: 400 },
            { x: 280, y: 330 },
            { x: 430, y: 390 },
            { x: 580, y: 280 }
        ],

        decorations: [
            { type: "rock", x: 80, y: 390 },
            { type: "rock", x: 760, y: 350 },
            { type: "hill", x: 500, y: 430 }
        ]
    }

};


export let selectedWorld = 1;

export let selectedLevel = 1;


export function setSelectedWorld(world) {

    if (
        WORLD_MAPS[world] &&
        isWorldUnlocked(world)
    ) {

        selectedWorld = world;
        selectedLevel = 1;

    }

}


export function setSelectedLevel(level) {

    if (
        isLevelUnlocked(
            selectedWorld,
            level
        )
    ) {

        selectedLevel = level;

    }

}


export function getSelectedWorld() {

    return selectedWorld;

}


export function getSelectedLevel() {

    return selectedLevel;

}


export function getWorldMap() {

    return WORLD_MAPS[selectedWorld];

}


export function drawWorldMap(
    ctx,
    playerMapPosition
) {

    const map =
        WORLD_MAPS[selectedWorld];


    ctx.fillStyle =
        map.background;

    ctx.fillRect(
        0,
        0,
        MAP_WIDTH,
        MAP_HEIGHT
    );


    drawDecorations(
        ctx,
        map.decorations
    );


    drawPath(
        ctx,
        map.nodes
    );


    for (
        let i = 0;
        i < map.nodes.length;
        i++
    ) {

        const node =
            map.nodes[i];

        const level =
            i + 1;

        drawLevelNode(
            ctx,
            node,
            level
        );

    }


    drawMapCharacter(
        ctx,
        playerMapPosition
    );


    ctx.fillStyle =
        "#6B3E26";

    ctx.font =
        "bold 38px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "WORLD " + selectedWorld,
        MAP_WIDTH / 2,
        55
    );


    ctx.font =
        "bold 18px Arial";

    ctx.fillText(
        "← / →  SWITCH WORLD",
        MAP_WIDTH / 2,
        90
    );

}


function drawPath(
    ctx,
    nodes
) {

    ctx.strokeStyle =
        "#A66A3F";

    ctx.lineWidth = 12;

    ctx.lineCap =
        "round";


    ctx.beginPath();


    for (
        let i = 0;
        i < nodes.length;
        i++
    ) {

        if (i === 0) {

            ctx.moveTo(
                nodes[i].x,
                nodes[i].y
            );

        }

        else {

            ctx.lineTo(
                nodes[i].x,
                nodes[i].y
            );

        }

    }


    ctx.stroke();

}


function drawLevelNode(
    ctx,
    node,
    level
) {

    const unlocked =
        isLevelUnlocked(
            selectedWorld,
            level
        );


    const completed =
        isLevelCompleted(
            selectedWorld,
            level
        );


    ctx.beginPath();

    ctx.arc(
        node.x,
        node.y,
        28,
        0,
        Math.PI * 2
    );


    if (!unlocked) {

        ctx.fillStyle =
            "#777777";

    }

    else if (completed) {

        ctx.fillStyle =
            "#FFD447";

    }

    else {

        ctx.fillStyle =
            "#FFFFFF";

    }


    ctx.fill();


    ctx.strokeStyle =
        "#6B3E26";

    ctx.lineWidth = 4;

    ctx.stroke();


    ctx.fillStyle =
        "#6B3E26";

    ctx.font =
        "bold 20px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        level,
        node.x,
        node.y
    );


    ctx.textBaseline =
        "alphabetic";


    if (completed) {

        ctx.font =
            "16px Arial";

        ctx.fillText(
            "★",
            node.x,
            node.y - 40
        );

    }

}


function drawMapCharacter(
    ctx,
    position
) {

    ctx.fillStyle =
        "#3D7EFF";


    ctx.fillRect(
        position.x - 12,
        position.y - 28,
        24,
        28
    );


    ctx.fillStyle =
        "#FFD6C9";


    ctx.fillRect(
        position.x - 9,
        position.y - 43,
        18,
        16
    );

}


function drawDecorations(
    ctx,
    decorations
) {

    for (
        const decoration
        of decorations
    ) {

        if (
            decoration.type ===
            "tree"
        ) {

            ctx.fillStyle =
                "#7A4A25";

            ctx.fillRect(
                decoration.x,
                decoration.y,
                18,
                60
            );


            ctx.fillStyle =
                "#3E9B4F";

            ctx.beginPath();

            ctx.arc(
                decoration.x + 9,
                decoration.y,
                38,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        else if (
            decoration.type ===
            "rock"
        ) {

            ctx.fillStyle =
                "#777777";

            ctx.beginPath();

            ctx.arc(
                decoration.x,
                decoration.y,
                35,
                Math.PI,
                0
            );

            ctx.fill();

        }


        else if (
            decoration.type ===
            "hill"
        ) {

            ctx.fillStyle =
                "#69B96B";

            ctx.beginPath();

            ctx.arc(
                decoration.x,
                decoration.y,
                100,
                Math.PI,
                0
            );

            ctx.fill();

        }

    }

      }
