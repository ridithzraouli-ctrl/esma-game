// ========================================
// LEVEL SYSTEM
// ========================================

export const WORLD_WIDTH = 4000;

export let currentWorld = 1;
export let currentLevel = 1;


// ========================================
// LEVEL CREATOR
// ========================================

function makeLevel(platforms, enemies) {

    return {

        spawn: {
            x: 100,
            y: 400
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
// WORLD 1 - LEVEL 1
// SIMPLE INTRODUCTION
// ========================================

const world1Level1 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 1000,
            height: 70
        },

        {
            x: 1100,
            y: 470,
            width: 700,
            height: 70
        },

        {
            x: 1900,
            y: 470,
            width: 800,
            height: 70
        },

        {
            x: 2800,
            y: 470,
            width: 1200,
            height: 70
        }

    ],

    [

        {
            type: "beetle",
            x: 600,
            y: 446
        },

        {
            type: "beetle",
            x: 2100,
            y: 446
        },

        {
            type: "beetle",
            x: 3300,
            y: 446
        }

    ]

);


// ========================================
// WORLD 1 - LEVEL 2
// SMALL PLATFORMS
// ========================================

const world1Level2 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 700,
            height: 70
        },

        {
            x: 850,
            y: 400,
            width: 300,
            height: 30
        },

        {
            x: 1250,
            y: 340,
            width: 300,
            height: 30
        },

        {
            x: 1650,
            y: 420,
            width: 350,
            height: 30
        },

        {
            x: 2100,
            y: 350,
            width: 350,
            height: 30
        },

        {
            x: 2550,
            y: 420,
            width: 350,
            height: 30
        },

        {
            x: 3000,
            y: 350,
            width: 350,
            height: 30
        },

        {
            x: 3450,
            y: 470,
            width: 550,
            height: 70
        }

    ],

    [

        {
            type: "beetle",
            x: 400,
            y: 446
        },

        {
            type: "beetle",
            x: 3050,
            y: 326
        },

        {
            type: "fly",
            x: 1150,
            y: 250
        },

        {
            type: "fly",
            x: 2500,
            y: 240
        }

    ]

);


// ========================================
// WORLD 1 - LEVEL 3
// STAIRS
// ========================================

const world1Level3 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 600,
            height: 70
        },

        {
            x: 700,
            y: 430,
            width: 300,
            height: 30
        },

        {
            x: 1100,
            y: 390,
            width: 300,
            height: 30
        },

        {
            x: 1500,
            y: 350,
            width: 300,
            height: 30
        },

        {
            x: 1900,
            y: 310,
            width: 300,
            height: 30
        },

        {
            x: 2300,
            y: 350,
            width: 300,
            height: 30
        },

        {
            x: 2700,
            y: 390,
            width: 300,
            height: 30
        },

        {
            x: 3100,
            y: 430,
            width: 300,
            height: 30
        },

        {
            x: 3500,
            y: 470,
            width: 500,
            height: 70
        }

    ],

    [

        {
            type: "beetle",
            x: 350,
            y: 446
        },

        {
            type: "beetle",
            x: 3550,
            y: 446
        },

        {
            type: "fly",
            x: 1400,
            y: 240
        },

        {
            type: "fly",
            x: 2700,
            y: 270
        },

        {
            type: "spider",
            x: 1900,
            y: 280
        }

    ]

);


// ========================================
// WORLD 1 - LEVEL 4
// FIRST HARDER LEVEL
// ========================================

const world1Level4 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 500,
            height: 70
        },

        {
            x: 650,
            y: 400,
            width: 300,
            height: 30
        },

        {
            x: 1050,
            y: 300,
            width: 300,
            height: 30
        },

        {
            x: 1450,
            y: 400,
            width: 300,
            height: 30
        },

        {
            x: 1850,
            y: 470,
            width: 450,
            height: 70
        },

        {
            x: 2400,
            y: 360,
            width: 300,
            height: 30
        },

        {
            x: 2800,
            y: 300,
            width: 300,
            height: 30
        },

        {
            x: 3200,
            y: 400,
            width: 300,
            height: 30
        },

        {
            x: 3600,
            y: 470,
            width: 400,
            height: 70
        }

    ],

    [

        {
            type: "beetle",
            x: 250,
            y: 446
        },

        {
            type: "cockroach",
            x: 700,
            y: 374
        },

        {
            type: "cockroach",
            x: 2850,
            y: 274
        },

        {
            type: "fly",
            x: 1500,
            y: 240
        },

        {
            type: "fly",
            x: 3200,
            y: 250
        }

    ]

);


// ========================================
// WORLD 2 - LEVEL 1
// SKY PLATFORMS
// ========================================

const world2Level1 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 450,
            height: 70
        },

        {
            x: 600,
            y: 400,
            width: 250,
            height: 30
        },

        {
            x: 950,
            y: 320,
            width: 250,
            height: 30
        },

        {
            x: 1300,
            y: 240,
            width: 250,
            height: 30
        },

        {
            x: 1650,
            y: 320,
            width: 250,
            height: 30
        },

        {
            x: 2000,
            y: 400,
            width: 250,
            height: 30
        },

        {
            x: 2400,
            y: 300,
            width: 250,
            height: 30
        },

        {
            x: 2750,
            y: 220,
            width: 250,
            height: 30
        },

        {
            x: 3100,
            y: 320,
            width: 250,
            height: 30
        },

        {
            x: 3500,
            y: 470,
            width: 500,
            height: 70
        }

    ],

    [

        {
            type: "beetle",
            x: 200,
            y: 446
        },

        {
            type: "beetle",
            x: 3100,
            y: 296
        },

        {
            type: "fly",
            x: 1000,
            y: 220
        },

        {
            type: "fly",
            x: 2500,
            y: 200
        }

    ]

);


// ========================================
// WORLD 2 - LEVEL 2
// VERTICAL
// ========================================

const world2Level2 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 400,
            height: 70
        },

        {
            x: 550,
            y: 390,
            width: 220,
            height: 30
        },

        {
            x: 900,
            y: 300,
            width: 220,
            height: 30
        },

        {
            x: 1250,
            y: 210,
            width: 220,
            height: 30
        },

        {
            x: 1600,
            y: 300,
            width: 220,
            height: 30
        },

        {
            x: 1950,
            y: 390,
            width: 220,
            height: 30
        },

        {
            x: 2300,
            y: 300,
            width: 220,
            height: 30
        },

        {
            x: 2650,
            y: 210,
            width: 220,
            height: 30
        },

        {
            x: 3000,
            y: 300,
            width: 220,
            height: 30
        },

        {
            x: 3350,
            y: 390,
            width: 220,
            height: 30
        },

        {
            x: 3700,
            y: 470,
            width: 300,
            height: 70
        }

    ],

    [

        {
            type: "fly",
            x: 700,
            y: 250
        },

        {
            type: "fly",
            x: 1800,
            y: 220
        },

        {
            type: "fly",
            x: 2900,
            y: 200
        },

        {
            type: "spider",
            x: 900,
            y: 270
        },

        {
            type: "spider",
            x: 2300,
            y: 270
        }

    ]

);


// ========================================
// WORLD 2 - LEVEL 3
// LONG GAPS
// ========================================

const world2Level3 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 350,
            height: 70
        },

        {
            x: 550,
            y: 430,
            width: 200,
            height: 30
        },

        {
            x: 950,
            y: 360,
            width: 200,
            height: 30
        },

        {
            x: 1350,
            y: 280,
            width: 200,
            height: 30
        },

        {
            x: 1750,
            y: 360,
            width: 200,
            height: 30
        },

        {
            x: 2150,
            y: 440,
            width: 200,
            height: 30
        },

        {
            x: 2550,
            y: 350,
            width: 200,
            height: 30
        },

        {
            x: 2950,
            y: 260,
            width: 200,
            height: 30
        },

        {
            x: 3350,
            y: 350,
            width: 200,
            height: 30
        },

        {
            x: 3700,
            y: 470,
            width: 300,
            height: 70
        }

    ],

    [

        {
            type: "cockroach",
            x: 580,
            y: 404
        },

        {
            type: "cockroach",
            x: 3000,
            y: 234
        },

        {
            type: "fly",
            x: 1100,
            y: 220
        },

        {
            type: "fly",
            x: 2600,
            y: 210
        },

        {
            type: "spider",
            x: 1750,
            y: 330
        },

        {
            type: "spider",
            x: 2550,
            y: 320
        }

    ]

);


// ========================================
// WORLD 2 - LEVEL 4
// FINAL SKY LEVEL
// ========================================

const world2Level4 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 450,
            height: 70
        },

        {
            x: 600,
            y: 350,
            width: 250,
            height: 30
        },

        {
            x: 1000,
            y: 220,
            width: 250,
            height: 30
        },

        {
            x: 1400,
            y: 330,
            width: 250,
            height: 30
        },

        {
            x: 1800,
            y: 180,
            width: 250,
            height: 30
        },

        {
            x: 2200,
            y: 300,
            width: 250,
            height: 30
        },

        {
            x: 2600,
            y: 160,
            width: 250,
            height: 30
        },

        {
            x: 3000,
            y: 280,
            width: 250,
            height: 30
        },

        {
            x: 3400,
            y: 390,
            width: 250,
            height: 30
        },

        {
            x: 3750,
            y: 470,
            width: 250,
            height: 70
        }

    ],

    [

        {
            type: "cockroach",
            x: 650,
            y: 324
        },

        {
            type: "cockroach",
            x: 3050,
            y: 254
        },

        {
            type: "fly",
            x: 1200,
            y: 160
        },

        {
            type: "fly",
            x: 2700,
            y: 100
        },

        {
            type: "ghost",
            x: 1900,
            y: 120
        },

        {
            type: "ghost",
            x: 3200,
            y: 180
        }

    ]

);


// ========================================
// WORLD 3 - LEVEL 1
// CASTLE INTRO
// ========================================

const world3Level1 = makeLevel(

    [

        {
            x: 0,
            y: 470,
            width: 700,
            height: 70
        },

        {
            x: 850,
            y: 390,
            width: 300,
            height: 30
        },

        {
            x: 1250,
            y: 300,
            width: 300,
            height: 30
        },

        {
            x: 165
