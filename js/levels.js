// ========================================
// LEVEL SYSTEM
// ========================================

export const WORLD_WIDTH = 4000;

export let currentWorld = 1;
export let currentLevel = 1;


// ========================================
// HELPER
// ========================================

function makeLevel(platforms, enemies) {

    return {

        spawn: {
            x: 100,
            y: 422
        },

        platforms,

        enemies,

        exit: {
            x: 3850,
            y: 390,
            width: 50,
            height: 80
        }

    };

}


// ========================================
// STANDARD PLATFORMS
// ========================================

const standardPlatforms = [

    {
        x: 0,
        y: 470,
        width: 900,
        height: 70
    },

    {
        x: 1050,
        y: 400,
        width: 250,
        height: 25
    },

    {
        x: 1450,
        y: 350,
        width: 200,
        height: 25
    },

    {
        x: 1800,
        y: 420,
        width: 300,
        height: 25
    },

    {
        x: 2300,
        y: 330,
        width: 250,
        height: 25
    },

    {
        x: 2700,
        y: 400,
        width: 300,
        height: 25
    },

    {
        x: 3200,
        y: 470,
        width: 800,
        height: 70
    }

];


// ========================================
// WORLD 1
// BRIGHT / NORMAL
// ========================================


// ----------------------------------------
// WORLD 1 - LEVEL 1
// Beetles
// ----------------------------------------

const world1Level1 = makeLevel(
    standardPlatforms,

    [
        {
            type: "beetle",
            x: 600,
            y: 446
        },

        {
            type: "beetle",
            x: 1850,
            y: 396
        },

        {
            type: "beetle",
            x: 3400,
            y: 446
        }
    ]
);


// ----------------------------------------
// WORLD 1 - LEVEL 2
// Beetles + Flies
// ----------------------------------------

const world1Level2 = makeLevel(
    standardPlatforms,

    [
        {
            type: "beetle",
            x: 600,
            y: 446
        },

        {
            type: "beetle",
            x: 2700,
            y: 376
        },

        {
            type: "fly",
            x: 1200,
            y: 280
        },

        {
            type: "fly",
            x: 2400,
            y: 230
        }
    ]
);


// ----------------------------------------
// WORLD 1 - LEVEL 3
// Beetles + Flies + Spiders
// ----------------------------------------

const world1Level3 = makeLevel(
    standardPlatforms,

    [
        {
            type: "beetle",
            x: 700,
            y: 446
        },

        {
            type: "beetle",
            x: 3200,
            y: 446
        },

        {
            type: "fly",
            x: 1500,
            y: 250
        },

        {
            type: "fly",
            x: 2800,
            y: 240
        },

        {
            type: "spider",
            x: 1900,
            y: 390
        }
    ]
);


// ----------------------------------------
// WORLD 1 - LEVEL 4
// Beetles + Cockroaches + Flies
// ----------------------------------------

const world1Level4 = makeLevel(
    standardPlatforms,

    [
        {
            type: "beetle",
            x: 600,
            y: 446
        },

        {
            type: "cockroach",
            x: 1200,
            y: 374
        },

        {
            type: "cockroach",
            x: 2800,
            y: 374
        },

        {
            type: "fly",
            x: 1900,
            y: 260
        },

        {
            type: "fly",
            x: 3200,
            y: 250
        }
    ]
);


// ========================================
// WORLD 2
// SKY / VOID
// ========================================


// ----------------------------------------
// WORLD 2 - LEVEL 1
// Beetles + Flies
// ----------------------------------------

const world2Level1 = makeLevel(
    standardPlatforms,

    [
        {
            type: "beetle",
            x: 650,
            y: 446
        },

        {
            type: "beetle",
            x: 2800,
            y: 376
        },

        {
            type: "fly",
            x: 1200,
            y: 250
        },

        {
            type: "fly",
            x: 2400,
            y: 220
        }
    ]
);


// ----------------------------------------
// WORLD 2 - LEVEL 2
// Flies + Spiders
// ----------------------------------------

const world2Level2 = makeLevel(
    standardPlatforms,

    [
        {
            type: "fly",
            x: 800,
            y: 250
        },

        {
            type: "fly",
            x: 1800,
            y: 230
        },

        {
            type: "fly",
            x: 3000,
            y: 240
        },

        {
            type: "spider",
            x: 1450,
            y: 320
        },

        {
            type: "spider",
            x: 2700,
            y: 370
        }
    ]
);


// ----------------------------------------
// WORLD 2 - LEVEL 3
// Cockroaches + Flies + Spiders
// ----------------------------------------

const world2Level3 = makeLevel(
    standardPlatforms,

    [
        {
            type: "cockroach",
            x: 700,
            y: 444
        },

        {
            type: "cockroach",
            x: 3000,
            y: 374
        },

        {
            type: "fly",
            x: 1300,
            y: 250
        },

        {
            type: "fly",
            x: 2500,
            y: 220
        },

        {
            type: "spider",
            x: 1800,
            y: 390
        },

        {
            type: "spider",
            x: 2700,
            y: 370
        }
    ]
);


// ----------------------------------------
// WORLD 2 - LEVEL 4
// Cockroaches + Flies + Ghosts
// ----------------------------------------

const world2Level4 = makeLevel(
    standardPlatforms,

    [
        {
            type: "cockroach",
            x: 600,
            y: 444
        },

        {
            type: "cockroach",
            x: 2700,
            y: 374
        },

        {
            type: "fly",
            x: 1400,
            y: 240
        },

        {
            type: "fly",
            x: 3000,
            y: 220
        },

        {
            type: "ghost",
            x: 1900,
            y: 250
        },

        {
            type: "ghost",
            x: 3300,
            y: 250
        }
    ]
);


// ========================================
// WORLD 3
// CASTLE
// ========================================


// ----------------------------------------
// WORLD 3 - LEVEL 1
// Beetles + Cockroaches + Spiders
// ----------------------------------------

const world3Level1 = makeLevel(
    standardPlatforms,

    [
        {
            type: "beetle",
            x: 600,
            y: 446
        },

        {
            type: "beetle",
            x: 3200,
            y: 446
        },

        {
            type: "cockroach",
            x: 1200,
            y: 374
        },

        {
            type: "cockroach",
            x: 2700,
            y: 374
        },

        {
            type: "spider",
            x: 1850,
            y: 390
        },

        {
            type: "spider",
            x: 2900,
            y: 370
        }
    ]
);


// ----------------------------------------
// WORLD 3 - LEVEL 2
// Cockroaches + Spiders + Ghosts
// ----------------------------------------

const world3Level2 = makeLevel(
    standardPlatforms,

    [
        {
            type: "cockroach",
            x: 650,
            y: 444
        },

        {
            type: "cockroach",
            x: 2500,
            y: 304
        },

        {
            type: "spider",
            x: 1450,
            y: 320
        },

        {
            type: "spider",
            x: 2800,
            y: 370
        },

        {
            type: "ghost",
            x: 1900,
            y: 250
        },

        {
            type: "ghost",
            x: 3300,
            y: 250
        }
    ]
);


// ----------------------------------------
// WORLD 3 - LEVEL 3
// Flies + Spiders + Ghosts + Cacti
// ----------------------------------------

const world3Level3 = makeLevel(
    standardPlatforms,

    [
        {
            type: "fly",
            x: 900,
            y: 240
        },

        {
            type: "fly",
            x: 2300,
            y: 220
        },

        {
            type: "spider",
            x: 1500,
            y: 320
        },

        {
            type: "spider",
            x: 2800,
            y: 370
        },

        {
            type: "ghost",
            x: 1900,
            y: 240
        },

        {
            type: "ghost",
            x: 3300,
            y: 240
        },

        {
            type: "cactus",
            x: 1150,
            y: 352
        },

        {
            type: "cactus",
            x: 3000,
            y: 352
        }
    ]
);


// ----------------------------------------
// WORLD 3 - LEVEL 4
// FINAL / BOSS LEVEL
// ----------------------------------------

const world3Level4 = makeLevel(
    standardPlatforms,

    [
        {
            type: "ghost",
            x: 1000,
            y: 250
        },

        {
            type: "ghost",
            x: 1700,
            y: 230
        },

        {
            type: "spider",
            x: 2200,
            y: 300
        },

        {
            type: "cactus",
            x: 2700,
            y: 352
        },

        {
            type: "cactus",
            x: 3200,
            y: 422
        }
    ]
);


// ========================================
// ALL LEVELS
// ========================================

const levels = {

    1: {
        1: world1Level1,
        2: world1Level2,
        3: world1Level3,
        4: world1Level4
    },

    2: {
        1: world2Level1,
        2: world2Level2,
        3: world2Level3,
        4: world2Level4
    },

    3: {
        1: world3Level1,
        2: world3Level2,
        3: world3Level3,
        4: world3Level4
    }

};


// ========================================
// GET CURRENT LEVEL
// ========================================

export function getCurrentLevel() {

    return levels[currentWorld][currentLevel];

}


// ========================================
// SET LEVEL
// ========================================

export function setLevel(world, level) {

    currentWorld = world;
    currentLevel = level;

}


// ========================================
// NEXT LEVEL
// ========================================

export function nextLevel() {

    if (currentLevel < 4) {

        currentLevel++;

        return true;

    }


    if (currentWorld < 3) {

        currentWorld++;

        currentLevel = 1;

        return true;

    }


    return false;

        }
