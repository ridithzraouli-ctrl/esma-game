export const WORLD_WIDTH = 4000;

export let currentWorld = 1;
export let currentLevel = 1;

const TILE = 16;

function platform(x, y, tiles, height = 2) {
    return {
        x,
        y,
        width: tiles * TILE,
        height: height * TILE
    };
}

function enemy(type, x, y) {
    return {
        type,
        x,
        y
    };
}

function block(x, y, type = null) {
    return {
        x,
        y,
        type
    };
}

function coin(id, x, y) {
    return {
        id,
        x,
        y,
        width: 16,
        height: 16
    };
}

function generateCoins(platforms) {

    const coins = [];

    const usable =
        platforms.slice(
            0,
            Math.max(1, platforms.length - 1)
        );

    for (
        let i = 0;
        i < Math.min(7, usable.length);
        i++
    ) {

        const p =
            usable[
                Math.floor(
                    i * usable.length /
                    Math.min(7, usable.length)
                )
            ];

        coins.push(
            coin(
                i + 1,
                p.x + p.width / 2 - 8,
                p.y - 28
            )
        );

    }

    return coins;
}

function makeLevel(
    platforms,
    enemies,
    blocks = [],
    exitX = 3824
) {

    return {

        spawn: {
            x: 64,
            y: 420
        },

        platforms,
        enemies,
        blocks,

        coins:
            generateCoins(platforms),

        exit: {
            x: exitX,
            y: 430,
            width: 16,
            height: 40
        }

    };
}


/* =========================
   WORLD 1
========================= */

const world1Level1 = makeLevel(

    [
        platform(0, 470, 26),
        platform(480, 406, 8),
        platform(656, 342, 7),
        platform(832, 406, 8),
        platform(1008, 470, 14),
        platform(1248, 390, 9),
        platform(1440, 326, 8),
        platform(1616, 390, 8),
        platform(1792, 470, 14),
        platform(2032, 422, 8),
        platform(2208, 358, 8),
        platform(2384, 422, 8),
        platform(2560, 470, 14),
        platform(2800, 374, 9),
        platform(2992, 310, 8),
        platform(3184, 374, 8),
        platform(3376, 470, 28)
    ],

    [
        enemy("beetle", 260, 454),
        enemy("beetle", 690, 326),
        enemy("fly", 870, 330),
        enemy("beetle", 1120, 454),
        enemy("cockroach", 1280, 374),
        enemy("fly", 1470, 250),
        enemy("beetle", 1870, 454),
        enemy("fly", 2250, 280),
        enemy("beetle", 2620, 454),
        enemy("fly", 2850, 300),
        enemy("cockroach", 3020, 294),
        enemy("beetle", 3440, 454)
    ],

    [
        block(320, 406, "strawberry"),
        block(336, 406),
        block(352, 406, "brick"),

        block(704, 278, "wings"),
        block(720, 278),

        block(1328, 326, "brick"),
        block(1344, 326),
        block(1360, 326),

        block(2080, 358),
        block(2096, 358, "brick"),

        block(2864, 326, "brick"),
        block(2880, 326, "brick"),
        block(2896, 326)
    ]
);


const world1Level2 = makeLevel(

    [
        platform(0, 470, 20),
        platform(368, 422, 7),
        platform(528, 358, 7),
        platform(688, 294, 7),
        platform(848, 358, 7),
        platform(1008, 422, 7),
        platform(1168, 470, 12),
        platform(1408, 390, 8),
        platform(1584, 310, 8),
        platform(1760, 230, 8),
        platform(1936, 310, 8),
        platform(2112, 390, 8),
        platform(2288, 470, 12),
        platform(2528, 350, 8),
        platform(2704, 270, 8),
        platform(2880, 350, 8),
        platform(3056, 430, 8),
        platform(3232, 470, 28)
    ],

    [
        enemy("beetle", 200, 454),
        enemy("fly", 400, 350),
        enemy("fly", 720, 220),
        enemy("beetle", 1040, 406),
        enemy("cockroach", 1430, 358),
        enemy("fly", 1620, 220),
        enemy("ghost", 1780, 150),
        enemy("fly", 1960, 220),
        enemy("spider", 2130, 350),
        enemy("beetle", 2380, 454),
        enemy("fly", 2730, 200),
        enemy("cockroach", 3060, 398),
        enemy("beetle", 3400, 454)
    ],

    [
        block(416, 374),
        block(432, 374, "brick"),

        block(576, 310, "strawberry"),
        block(592, 310),
        block(608, 310, "brick"),

        block(1456, 342),
        block(1472, 342, "brick"),
        block(1488, 342),

        block(1648, 262, "wings"),
        block(1664, 262),

        block(1808, 182, "brick"),
        block(1824, 182),
        block(1840, 182, "brick"),

        block(2576, 302, "brick"),
        block(2592, 302),
        block(2608, 302, "brick")
    ]
);


const world1Level3 = makeLevel(

    [
        platform(0, 470, 18),
        platform(320, 390, 7),
        platform(480, 310, 7),
        platform(640, 390, 7),
        platform(800, 470, 10),
        platform(1008, 406, 8),
        platform(1184, 342, 8),
        platform(1360, 278, 8),
        platform(1536, 342, 8),
        platform(1712, 406, 8),
        platform(1888, 470, 12),
        platform(2128, 374, 8),
        platform(2304, 278, 8),
        platform(2480, 374, 8),
        platform(2656, 470, 12),
        platform(2896, 342, 8),
        platform(3072, 246, 8),
        platform(3248, 342, 8),
        platform(3424, 438, 8),
        platform(3600, 470, 24)
    ],

    [
        enemy("beetle", 150, 454),
        enemy("fly", 360, 320),
        enemy("beetle", 830, 454),
        enemy("fly", 1050, 330),
        enemy("cockroach", 1200, 326),
        enemy("fly", 1400, 210),
        enemy("beetle", 1740, 390),
        enemy("spider", 1940, 444),
        enemy("fly", 2160, 300),
        enemy("ghost", 2320, 190),
        enemy("beetle", 2680, 454),
        enemy("fly", 2920, 270),
        enemy("spider", 3090, 198),
        enemy("cockroach", 3260, 310),
        enemy("beetle", 3470, 422)
    ],

    [
        block(352, 342, "strawberry"),
        block(368, 342),
        block(384, 342, "brick"),

        block(544, 262, "brick"),
        block(560, 262),
        block(576, 262, "brick"),

        block(1216, 294, "wings"),
        block(1232, 294),

        block(1392, 230, "brick"),
        block(1408, 230),
        block(1424, 230),

        block(2176, 326),
        block(2192, 326, "brick"),

        block(2960, 294, "brick"),
        block(2976, 294),
        block(2992, 294, "brick")
    ]
);


const world1Level4 = makeLevel(

    [
        platform(0, 470, 16),
        platform(288, 406, 8),
        platform(464, 342, 8),
        platform(640, 278, 8),
        platform(816, 342, 8),
        platform(992, 406, 8),
        platform(1168, 470, 12),
        platform(1408, 374, 8),
        platform(1584, 278, 8),
        platform(1760, 374, 8),
        platform(1936, 470, 12),
        platform(2176, 342, 8),
        platform(2352, 246, 8),
        platform(2528, 342, 8),
        platform(2704, 438, 8),
        platform(2880, 470, 12),
        platform(3120, 358, 8),
        platform(3296, 262, 8),
        platform(3472, 358, 8),
        platform(3648, 470, 22)
    ],

    [
        enemy("beetle", 180, 454),
        enemy("fly", 330, 300),
        enemy("cockroach", 500, 326),
        enemy("fly", 680, 210),
        enemy("beetle", 1050, 390),
        enemy("spider", 1430, 334),
        enemy("fly", 1610, 190),
        enemy("ghost", 1775, 280),
        enemy("beetle", 2000, 454),
        enemy("fly", 2210, 270),
        enemy("spider", 2370, 198),
        enemy("beetle", 2750, 422),
        enemy("cockroach", 3160, 326),
        enemy("ghost", 3320, 190),
        enemy("fly", 3500, 280)
    ],

    [
        block(320, 358, "strawberry"),
        block(336, 358),
        block(352, 358, "brick"),

        block(496, 294, "brick"),
        block(512, 294),
        block(528, 294, "brick"),

        block(1440, 326, "wings"),
        block(1456, 326),

        block(1616, 230, "brick"),
        block(1632, 230),
        block(1648, 230),

        block(2240, 294),
        block(2256, 294, "brick"),
        block(2272, 294),

        block(3184, 310, "brick"),
        block(3200, 310),
        block(3216, 310, "brick")
    ]
);


/* =========================
   WORLD 2
========================= */

const world2Level1 = makeLevel(

    [
        platform(0, 470, 16),
        platform(272, 406, 7),
        platform(432, 326, 7),
        platform(592, 246, 7),
        platform(752, 326, 7),
        platform(912, 406, 7),
        platform(1072, 470, 12),
        platform(1312, 374, 8),
        platform(1488, 278, 8),
        platform(1664, 374, 8),
        platform(1840, 470, 12),
        platform(2080, 342, 8),
        platform(2256, 230, 8),
        platform(2432, 342, 8),
        platform(2608, 470, 12),
        platform(2848, 326, 8),
        platform(3024, 214, 8),
        platform(3200, 326, 8),
        platform(3376, 438, 8),
        platform(3552, 470, 28)
    ],

    [
        enemy("fly", 320, 320),
        enemy("fly", 610, 170),
        enemy("ghost", 760, 250),
        enemy("beetle", 1120, 454),
        enemy("spider", 1340, 326),
        enemy("fly", 1510, 180),
        enemy("ghost", 1680, 270),
        enemy("beetle", 1880, 454),
        enemy("fly", 2110, 250),
        enemy("spider", 2270, 190),
        enemy("ghost", 2450, 250),
        enemy("fly", 2880, 230),
        enemy("spider", 3040, 170),
        enemy("ghost", 3210, 230),
        enemy("beetle", 3410, 422)
    ],

    [
        block(320, 358),
        block(336, 358, "brick"),

        block(480, 278, "bunny"),
        block(496, 278),

        block(640, 198, "brick"),
        block(656, 198),
        block(672, 198, "brick"),

        block(1376, 326, "brick"),
        block(1392, 326),
        block(1408, 326),

        block(1520, 230, "bunny"),
        block(1536, 230),

        block(2144, 294, "brick"),
        block(2160, 294),
        block(2176, 294, "brick"),

        block(2912, 278, "brick"),
        block(2928, 278)
    ]
);


const world2Level2 = makeLevel(

    [
        platform(0, 470, 14),
        platform(240, 390, 7),
        platform(400, 310, 7),
        platform(560, 390, 7),
        platform(720, 470, 10),
        platform(928, 358, 8),
        platform(1104, 246, 8),
        platform(1280, 358, 8),
        platform(1456, 470, 12),
        platform(1696, 342, 8),
        platform(1872, 214, 8),
        platform(2048, 342, 8),
        platform(2224, 470, 12),
        platform(2464, 374, 8),
        platform(2640, 278, 8),
        platform(2816, 374, 8),
        platform(2992, 470, 12),
        platform(3232, 310, 8),
        platform(3408, 214, 8),
        platform(3584, 310, 8),
        platform(3760, 470, 15)
    ],

    [
        enemy("fly", 270, 300),
        enemy("ghost", 420, 220),
        enemy("fly", 750, 330),
        enemy("spider", 950, 310),
        enemy("fly", 1130, 170),
        enemy("ghost", 1300, 280),
        enemy("beetle", 1500, 454),
        enemy("fly", 1720, 250),
        enemy("ghost", 1890, 140),
        enemy("spider", 2060, 280),
        enemy("beetle", 2260, 454),
        enemy("fly", 2490, 280),
        enemy("ghost", 2660, 200),
        enemy("spider", 2830, 310),
        enemy("fly", 3260, 220),
        enemy("ghost", 3420, 140),
        enemy("beetle", 3620, 294)
    ],

    [
        block(288, 342, "bunny"),
        block(304, 342),
        block(320, 342, "brick"),

        block(448, 262, "brick"),
        block(464, 262),
        block(480, 262),

        block(976, 310, "brick"),
        block(992, 310, "brick"),

        block(1152, 198, "bunny"),
        block(1168, 198),

        block(1744, 294, "brick"),
        block(1760, 294),
        block(1776, 294, "brick"),

        block(1936, 166, "brick"),
        block(1952, 166),

        block(2512, 326),
        block(2528, 326, "brick"),

        block(3280, 262, "brick"),
        block(3296, 262),
        block(3312, 262)
    ]
);


const world2Level3 = makeLevel(

    [
        platform(0, 470, 12),
        platform(208, 422, 7),
        platform(368, 342, 7),
        platform(528, 262, 7),
        platform(688, 342, 7),
        platform(848, 422, 7),
        platform(1008, 470, 12),
        platform(1248, 358, 8),
        platform(1424, 230, 8),
        platform(1600, 358, 8),
        platform(1776, 470, 12),
        platform(2016, 326, 8),
        platform(2192, 198, 8),
        platform(2368, 326, 8),
        platform(2544, 470, 12),
        platform(2784, 342, 8),
        platform(2960, 214, 8),
        platform(3136, 342, 8),
        platform(3312, 438, 8),
        platform(3488, 470, 32)
    ],

    [
        enemy("fly", 250, 340),
        enemy("ghost", 390, 260),
        enemy("fly", 550, 180),
        enemy("spider", 700, 290),
        enemy("fly", 870, 330),
        enemy("ghost", 1270, 250),
        enemy("spider", 1440, 174),
        enemy("fly", 1620, 250),
        enemy("beetle", 1820, 454),
        enemy("ghost", 2040, 250),
        enemy("fly", 2210, 150),
        enemy("spider", 2380, 290),
        enemy("ghost", 2800, 260),
        enemy("fly", 2980, 150),
        enemy("spider", 3150, 290),
        enemy("beetle", 3340, 422)
    ],

    [
        block(256, 374),
        block(272, 374, "brick"),

        block(416, 294, "bunny"),
        block(432, 294),

        block(576, 214, "brick"),
        block(592, 214),
        block(608, 214, "brick"),

        block(1296, 310, "brick"),
        block(1312, 310),

        block(1472, 182, "bunny"),
        block(1488, 182),

        block(2064, 278, "brick"),
        block(2080, 278),
        block(2096, 278, "brick"),

        block(2832, 294, "brick"),
        block(2848, 294),
        block(2864, 294),

        block(3008, 166, "brick"),
        block(3024, 166)
    ]
);const world2Level4 = makeLevel(

    [
        platform(0, 470, 14),
        platform(256, 374, 8),
        platform(432, 278, 8),
        platform(608, 374, 8),
        platform(784, 470, 12),
        platform(1024, 326, 8),
        platform(1200, 198, 8),
        platform(1376, 326, 8),
        platform(1552, 470, 12),
        platform(1792, 294, 8),
        platform(1968, 166, 8),
        platform(2144, 294, 8),
        platform(2320, 470, 12),
        platform(2560, 342, 8),
        platform(2736, 214, 8),
        platform(2912, 342, 8),
        platform(3088, 470, 12),
        platform(3328, 310, 8),
        platform(3504, 182, 8),
        platform(3680, 310, 8),
        platform(3840, 470, 10)
    ],

    [
        enemy("fly", 290, 280),
        enemy("ghost", 450, 170),
        enemy("spider", 620, 310),
        enemy("beetle", 850, 454),
        enemy("fly", 1050, 230),
        enemy("ghost", 1220, 120),
        enemy("spider", 1390, 280),
        enemy("beetle", 1580, 454),
        enemy("fly", 1810, 190),
        enemy("ghost", 1980, 90),
        enemy("spider", 2160, 250),
        enemy("beetle", 2350, 454),
        enemy("fly", 2580, 250),
        enemy("ghost", 2750, 140),
        enemy("spider", 2930, 280),
        enemy("beetle", 3110, 454),
        enemy("fly", 3350, 200),
        enemy("ghost", 3520, 100),
        enemy("spider", 3700, 270)
    ],

    [
        block(304, 326, "bunny"),
        block(320, 326),

        block(480, 230, "brick"),
        block(496, 230),
        block(512, 230, "brick"),

        block(1072, 278, "brick"),
        block(1088, 278),

        block(1232, 150, "bunny"),
        block(1248, 150),

        block(1840, 246, "brick"),
        block(1856, 246),
        block(1872, 246, "brick"),

        block(2016, 118, "brick"),
        block(2032, 118),

        block(2608, 294, "brick"),
        block(2624, 294),
        block(2640, 294),

        block(3376, 262, "brick"),
        block(3392, 262),
        block(3408, 262, "brick")
    ]
);


/* =========================
   WORLD 3
========================= */

const world3Level1 = makeLevel(

    [
        platform(0, 470, 14),
        platform(256, 390, 8),
        platform(432, 310, 8),
        platform(608, 390, 8),
        platform(784, 470, 12),
        platform(1024, 342, 8),
        platform(1200, 214, 8),
        platform(1376, 342, 8),
        platform(1552, 470, 12),
        platform(1792, 310, 8),
        platform(1968, 182, 8),
        platform(2144, 310, 8),
        platform(2320, 470, 12),
        platform(2560, 326, 8),
        platform(2736, 198, 8),
        platform(2912, 326, 8),
        platform(3088, 470, 12),
        platform(3328, 294, 8),
        platform(3504, 166, 8),
        platform(3680, 294, 8),
        platform(3840, 470, 10)
    ],

    [
        enemy("cockroach", 280, 350),
        enemy("fly", 450, 220),
        enemy("cactus", 620, 358),
        enemy("ghost", 820, 300),
        enemy("spider", 1040, 326),
        enemy("fly", 1220, 120),
        enemy("cactus", 1390, 310),
        enemy("cockroach", 1580, 454),
        enemy("ghost", 1810, 230),
        enemy("spider", 1980, 166),
        enemy("fly", 2160, 230),
        enemy("cactus", 2340, 438),
        enemy("spider", 2580, 278),
        enemy("ghost", 2750, 120),
        enemy("cactus", 2930, 294),
        enemy("cockroach", 3110, 454),
        enemy("fly", 3350, 190),
        enemy("ghost", 3520, 90),
        enemy("cactus", 3700, 278)
    ],

    [
        block(304, 342, "fire"),
        block(320, 342),
        block(336, 342, "brick"),

        block(480, 262, "brick"),
        block(496, 262),
        block(512, 262, "brick"),

        block(1072, 294, "fire"),
        block(1088, 294),

        block(1248, 166, "brick"),
        block(1264, 166),
        block(1280, 166, "brick"),

        block(1840, 262, "brick"),
        block(1856, 262),
        block(1872, 262),

        block(2624, 278, "fire"),
        block(2640, 278),

        block(3392, 246, "brick"),
        block(3408, 246),
        block(3424, 246, "brick")
    ]
);


const world3Level2 = makeLevel(

    [
        platform(0, 470, 12),
        platform(224, 406, 8),
        platform(400, 342, 8),
        platform(576, 278, 8),
        platform(752, 342, 8),
        platform(928, 406, 8),
        platform(1104, 470, 12),
        platform(1344, 358, 8),
        platform(1520, 230, 8),
        platform(1696, 358, 8),
        platform(1872, 470, 12),
        platform(2112, 326, 8),
        platform(2288, 198, 8),
        platform(2464, 326, 8),
        platform(2640, 470, 12),
        platform(2880, 342, 8),
        platform(3056, 214, 8),
        platform(3232, 342, 8),
        platform(3408, 438, 8),
        platform(3584, 470, 26)
    ],

    [
        enemy("cockroach", 260, 386),
        enemy("spider", 420, 286),
        enemy("fly", 600, 190),
        enemy("ghost", 770, 270),
        enemy("cactus", 950, 374),
        enemy("cockroach", 1140, 454),
        enemy("spider", 1360, 310),
        enemy("fly", 1540, 150),
        enemy("ghost", 1710, 280),
        enemy("cactus", 1900, 454),
        enemy("spider", 2130, 278),
        enemy("fly", 2300, 120),
        enemy("ghost", 2480, 270),
        enemy("cactus", 2670, 454),
        enemy("spider", 2900, 294),
        enemy("ghost", 3070, 150),
        enemy("cactus", 3250, 310),
        enemy("cockroach", 3420, 422)
    ],

    [
        block(272, 358),
        block(288, 358, "fire"),

        block(448, 294, "brick"),
        block(464, 294),
        block(480, 294, "brick"),

        block(624, 230, "fire"),
        block(640, 230),

        block(1408, 310, "brick"),
        block(1424, 310),
        block(1440, 310, "brick"),

        block(1584, 182, "fire"),
        block(1600, 182),

        block(2176, 278, "brick"),
        block(2192, 278),
        block(2208, 278),

        block(2944, 294, "brick"),
        block(2960, 294),
        block(2976, 294, "brick")
    ]
);


const world3Level3 = makeLevel(

    [
        platform(0, 470, 10),
        platform(192, 422, 7),
        platform(352, 342, 7),
        platform(512, 262, 7),
        platform(672, 342, 7),
        platform(832, 422, 7),
        platform(992, 470, 12),
        platform(1232, 374, 8),
        platform(1408, 246, 8),
        platform(1584, 374, 8),
        platform(1760, 470, 12),
        platform(2000, 310, 8),
        platform(2176, 150, 8),
        platform(2352, 310, 8),
        platform(2528, 470, 12),
        platform(2768, 342, 8),
        platform(2944, 182, 8),
        platform(3120, 342, 8),
        platform(3296, 470, 12),
        platform(3536, 278, 8),
        platform(3712, 150, 8),
        platform(3888, 470, 7)
    ],

    [
        enemy("fly", 220, 350),
        enemy("spider", 370, 286),
        enemy("ghost", 530, 170),
        enemy("cactus", 690, 310),
        enemy("fly", 850, 350),
        enemy("cockroach", 1030, 454),
        enemy("spider", 1250, 310),
        enemy("ghost", 1420, 170),
        enemy("cactus", 1600, 326),
        enemy("cockroach", 1790, 454),
        enemy("ghost", 2020, 230),
        enemy("fly", 2190, 100),
        enemy("spider", 2370, 270),
        enemy("cactus", 2550, 454),
        enemy("ghost", 2780, 250),
        enemy("spider", 2960, 150),
        enemy("cactus", 3140, 310),
        enemy("cockroach", 3320, 454),
        enemy("ghost", 3550, 200),
        enemy("fly", 3730, 80)
    ],

    [
        block(240, 374, "fire"),
        block(256, 374),

        block(400, 294, "brick"),
        block(416, 294),
        block(432, 294, "brick"),

        block(560, 214, "fire"),
        block(576, 214),

        block(1280, 326, "brick"),
        block(1296, 326),
        block(1312, 326),

        block(1456, 198, "fire"),
        block(1472, 198),

        block(2048, 262, "brick"),
        block(2064, 262),
        block(2080, 262, "brick"),

        block(2848, 294, "fire"),
        block(2864, 294),

        block(3024, 134, "brick"),
        block(3040, 134),
        block(3056, 134, "brick"),

        block(3616, 230, "fire"),
        block(3632, 230)
    ]
);


const world3Level4 = makeLevel(

    [
        platform(0, 470, 12),
        platform(240, 390, 8),
        platform(416, 294, 8),
        platform(592, 198, 8),
        platform(768, 294, 8),
        platform(944, 390, 8),
        platform(1120, 470, 12),
        platform(1360, 342, 8),
        platform(1536, 214, 8),
        platform(1712, 86, 8),
        platform(1888, 214, 8),
        platform(2064, 342, 8),
        platform(2240, 470, 12),
        platform(2480, 310, 8),
        platform(2656, 182, 8),
        platform(2832, 310, 8),
        platform(3008, 470, 12),
        platform(3248, 278, 8),
        platform(3424, 150, 8),
        platform(3600, 278, 8),
        platform(3776, 470, 14)
    ],

    [
        enemy("cockroach", 270, 358),
        enemy("fly", 440, 190),
        enemy("cactus", 610, 166),
        enemy("ghost", 790, 230),
        enemy("spider", 960, 354),
        enemy("cockroach", 1150, 454),
        enemy("ghost", 1380, 250),
        enemy("spider", 1550, 180),
        enemy("cactus", 1730, 54),
        enemy("ghost", 1900, 150),
        enemy("spider", 2080, 310),
        enemy("cockroach", 2260, 454),
        enemy("cactus", 2500, 278),
        enemy("ghost", 2670, 110),
        enemy("spider", 2850, 278),
        enemy("cockroach", 3020, 454),
        enemy("cactus", 3270, 246),
        enemy("ghost", 3440, 80),
        enemy("spider", 3620, 246)
    ],

    [
        block(288, 342, "fire"),
        block(304, 342),
        block(320, 342, "brick"),

        block(464, 246, "brick"),
        block(480, 246),
        block(496, 246, "brick"),

        block(640, 150, "fire"),
        block(656, 150),

        block(1408, 294, "brick"),
        block(1424, 294),
        block(1440, 294, "brick"),

        block(1584, 166, "fire"),
        block(1600, 166),

        block(1760, 38, "brick"),
        block(1776, 38),
        block(1792, 38, "brick"),

        block(2528, 262, "fire"),
        block(2544, 262),

        block(2704, 134, "brick"),
        block(2720, 134),
        block(2736, 134),

        block(3296, 230, "fire"),
        block(3312, 230),

        block(3472, 102, "brick"),
        block(3488, 102),
        block(3504, 102, "brick")
    ]
);


/* =========================
   LEVEL TABLE
========================= */

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


export function getCurrentLevel() {

    return levels[
        currentWorld
    ][
        currentLevel
    ];

}


export function setLevel(
    world,
    level
) {

    currentWorld = world;
    currentLevel = level;

}


export function nextLevel() {

    if (
        currentLevel < 4
    ) {

        currentLevel++;

        return true;

    }


    if (
        currentWorld < 3
    ) {

        currentWorld++;

        currentLevel = 1;

        return true;

    }


    return false;

        }
