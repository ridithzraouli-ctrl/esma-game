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


function makeLevel(platforms, enemies, blocks = [], exitX = 3880) {

    return {
        spawn: {
            x: 64,
            y: 420
        },

        platforms,

        enemies,

        blocks,

        exit: {
            x: exitX,
            y: 430,
            width: 16,
            height: 40
        }
    };
}


/* WORLD 1 */


const world1Level1 = makeLevel(

    [
        platform(0, 470, 32),
        platform(576, 470, 20),
        platform(960, 422, 10),
        platform(1152, 470, 24),
        platform(1536, 406, 12),
        platform(1776, 470, 20),
        platform(2096, 438, 10),
        platform(2288, 470, 24),
        platform(2672, 390, 12),
        platform(2928, 470, 18),
        platform(3296, 422, 14),
        platform(3552, 470, 28)
    ],

    [
        enemy("beetle", 320, 454),
        enemy("beetle", 720, 454),
        enemy("beetle", 1810, 454),
        enemy("beetle", 2360, 454),
        enemy("fly", 1010, 370),
        enemy("fly", 2730, 330)
    ],

    [
        block(352, 406, "strawberry"),
        block(368, 406),
        block(784, 406, "wings"),
        block(800, 406),
        block(1584, 342)
    ],

    3824
);


const world1Level2 = makeLevel(

    [
        platform(0, 470, 24),
        platform(448, 422, 9),
        platform(640, 374, 8),
        platform(832, 326, 8),
        platform(1024, 374, 10),
        platform(1248, 438, 12),
        platform(1504, 470, 18),
        platform(1792, 406, 10),
        platform(1984, 342, 10),
        platform(2176, 406, 10),
        platform(2368, 470, 18),
        platform(2656, 390, 10),
        platform(2848, 326, 10),
        platform(3040, 390, 10),
        platform(3232, 470, 16),
        platform(3488, 422, 10),
        platform(3680, 470, 20)
    ],

    [
        enemy("beetle", 240, 454),
        enemy("fly", 690, 300),
        enemy("fly", 1060, 300),
        enemy("beetle", 1560, 454),
        enemy("cockroach", 1824, 380),
        enemy("fly", 2700, 330),
        enemy("beetle", 3280, 454)
    ],

    [
        block(480, 358),
        block(672, 310, "strawberry"),
        block(848, 262),
        block(1040, 310),
        block(1840, 342, "wings"),
        block(2000, 278),
        block(2672, 326)
    ],

    3824
);


const world1Level3 = makeLevel(

    [
        platform(0, 470, 20),
        platform(352, 422, 8),
        platform(528, 374, 8),
        platform(704, 326, 8),
        platform(880, 374, 8),
        platform(1056, 422, 8),
        platform(1232, 470, 16),
        platform(1488, 438, 8),
        platform(1664, 390, 8),
        platform(1840, 342, 8),
        platform(2016, 390, 8),
        platform(2192, 438, 8),
        platform(2368, 470, 16),
        platform(2624, 406, 9),
        platform(2816, 342, 9),
        platform(3008, 278, 9),
        platform(3200, 342, 9),
        platform(3392, 406, 9),
        platform(3584, 470, 26)
    ],

    [
        enemy("beetle", 160, 454),
        enemy("fly", 560, 300),
        enemy("fly", 900, 300),
        enemy("beetle", 1300, 454),
        enemy("cockroach", 1680, 364),
        enemy("fly", 2050, 300),
        enemy("beetle", 2420, 454),
        enemy("fly", 2850, 270),
        enemy("spider", 3210, 310)
    ],

    [
        block(368, 374),
        block(544, 326),
        block(720, 278, "strawberry"),
        block(896, 326),
        block(1504, 390),
        block(1856, 294, "wings"),
        block(2672, 358),
        block(3024, 230)
    ],

    3824
);


const world1Level4 = makeLevel(

    [
        platform(0, 470, 18),
        platform(320, 406, 9),
        platform(512, 342, 8),
        platform(688, 406, 8),
        platform(864, 470, 12),
        platform(1056, 390, 10),
        platform(1248, 310, 10),
        platform(1440, 390, 10),
        platform(1632, 470, 16),
        platform(1888, 422, 9),
        platform(2080, 358, 9),
        platform(2272, 294, 9),
        platform(2464, 358, 9),
        platform(2656, 422, 9),
        platform(2848, 470, 16),
        platform(3104, 390, 10),
        platform(3296, 326, 10),
        platform(3488, 390, 10),
        platform(3680, 470, 20)
    ],

    [
        enemy("beetle", 180, 454),
        enemy("beetle", 900, 454),
        enemy("cockroach", 1080, 364),
        enemy("fly", 1300, 250),
        enemy("cockroach", 1660, 444),
        enemy("fly", 2100, 300),
        enemy("spider", 2280, 254),
        enemy("fly", 2500, 300),
        enemy("beetle", 2900, 454),
        enemy("cockroach", 3120, 364),
        enemy("fly", 3520, 320)
    ],

    [
        block(336, 358, "strawberry"),
        block(528, 294),
        block(704, 358),
        block(1088, 342),
        block(1264, 262, "wings"),
        block(1904, 374),
        block(2096, 310),
        block(2288, 246),
        block(3120, 342)
    ],

    3824
);


/* WORLD 2 */


const world2Level1 = makeLevel(

    [
        platform(0, 470, 18),
        platform(320, 422, 8),
        platform(496, 374, 8),
        platform(672, 326, 8),
        platform(848, 278, 8),
        platform(1024, 326, 8),
        platform(1200, 374, 8),
        platform(1376, 422, 8),
        platform(1552, 470, 12),
        platform(1792, 390, 9),
        platform(1984, 310, 9),
        platform(2176, 390, 9),
        platform(2368, 470, 14),
        platform(2592, 350, 9),
        platform(2784, 270, 9),
        platform(2976, 350, 9),
        platform(3168, 430, 9),
        platform(3360, 470, 10),
        platform(3584, 390, 9),
        platform(3776, 470, 14)
    ],

    [
        enemy("fly", 380, 350),
        enemy("fly", 730, 250),
        enemy("beetle", 1280, 358),
        enemy("fly", 1830, 310),
        enemy("spider", 2010, 270),
        enemy("fly", 2630, 270),
        enemy("fly", 3020, 270),
        enemy("beetle", 3420, 454),
        enemy("fly", 3630, 320)
    ],

    [
        block(336, 374),
        block(512, 326),
        block(688, 278),
        block(864, 230, "bunny"),
        block(1040, 278),
        block(1824, 342),
        block(2016, 262),
        block(2608, 302)
    ],

    3824
);


const world2Level2 = makeLevel(

    [
        platform(0, 470, 16),
        platform(288, 406, 7),
        platform(448, 342, 7),
        platform(608, 278, 7),
        platform(768, 342, 7),
        platform(928, 406, 7),
        platform(1088, 470, 12),
        platform(1280, 390, 8),
        platform(1456, 310, 8),
        platform(1632, 230, 8),
        platform(1808, 310, 8),
        platform(1984, 390, 8),
        platform(2160, 470, 12),
        platform(2400, 374, 8),
        platform(2576, 278, 8),
        platform(2752, 374, 8),
        platform(2928, 470, 12),
        platform(3152, 342, 8),
        platform(3328, 246, 8),
        platform(3504, 342, 8),
        platform(3680, 470, 20)
    ],

    [
        enemy("fly", 330, 320),
        enemy("fly", 650, 220),
        enemy("fly", 970, 320),
        enemy("spider", 1300, 350),
        enemy("fly", 1500, 200),
        enemy("ghost", 1650, 140),
        enemy("fly", 1880, 200),
        enemy("spider", 2430, 334),
        enemy("fly", 2640, 180),
        enemy("ghost", 3170, 250),
        enemy("fly", 3360, 170)
    ],

    [
        block(304, 358),
        block(464, 294),
        block(624, 230, "bunny"),
        block(784, 294),
        block(1312, 342),
        block(1488, 262),
        block(1664, 182),
        block(2416, 326),
        block(3168, 294, "bunny")
    ],

    3824
);


const world2Level3 = makeLevel(

    [
        platform(0, 470, 14),
        platform(256, 422, 7),
        platform(416, 374, 7),
        platform(576, 326, 7),
        platform(736, 278, 7),
        platform(896, 326, 7),
        platform(1056, 374, 7),
        platform(1216, 422, 7),
        platform(1376, 470, 12),
        platform(1600, 406, 8),
        platform(1776, 342, 8),
        platform(1952, 278, 8),
        platform(2128, 342, 8),
        platform(2304, 406, 8),
        platform(2480, 470, 12),
        platform(2704, 374, 8),
        platform(2880, 278, 8),
        platform(3056, 182, 8),
        platform(3232, 278, 8),
        platform(3408, 374, 8),
        platform(3584, 470, 26)
    ],

    [
        enemy("fly", 290, 350),
        enemy("fly", 600, 250),
        enemy("fly", 940, 250),
        enemy("spider", 1070, 338),
        enemy("ghost", 1650, 320),
        enemy("fly", 1810, 250),
        enemy("spider", 2140, 310),
        enemy("fly", 2740, 280),
        enemy("ghost", 2910, 200),
        enemy("fly", 3240, 210),
        enemy("spider", 3410, 342)
    ],

    [
        block(272, 374),
        block(432, 326),
        block(592, 278, "bunny"),
        block(752, 230),
        block(912, 278),
        block(1632, 358),
        block(1808, 294),
        block(1984, 230),
        block(2736, 326),
        block(3072, 134, "bunny")
    ],

    3824
);


const world2Level4 = makeLevel(

    [
        platform(0, 470, 16),
        platform(288, 390, 8),
        platform(464, 310, 8),
        platform(640, 230, 8),
        platform(816, 310, 8),
        platform(992, 390, 8),
        platform(1168, 470, 12),
        platform(1408, 350, 8),
        platform(1584, 246, 8),
        platform(1760, 142, 8),
        platform(1936, 246, 8),
        platform(2112, 350, 8),
        platform(2288, 470, 12),
        platform(2528, 326, 8),
        platform(2704, 214, 8),
        platform(2880, 326, 8),
        platform(3056, 438, 8),
        platform(3232, 470, 12),
        platform(3456, 358, 8),
        platform(3632, 278, 8),
        platform(3792, 470, 13)
    ],

    [
        enemy("fly", 330, 300),
        enemy("ghost", 670, 160),
        enemy("fly", 850, 240),
        enemy("spider", 1010, 350),
        enemy("ghost", 1430, 270),
        enemy("fly", 1610, 180),
        enemy("ghost", 1800, 80),
        enemy("fly", 1980, 180),
        enemy("spider", 2140, 310),
        enemy("ghost", 2560, 250),
        enemy("fly", 2740, 140),
        enemy("spider", 3060, 398),
        enemy("ghost", 3480, 270),
        enemy("fly", 3650, 200)
    ],

    [
        block(304, 342),
        block(480, 262),
        block(656, 182, "bunny"),
        block(832, 262),
        block(1008, 342),
        block(1424, 302),
        block(1600, 198),
        block(1776, 94, "bunny"),
        block(2544, 278),
        block(2720, 166),
        block(3472, 310)
    ],

    3824
);


/* WORLD 3 */


const world3Level1 = makeLevel(

    [
        platform(0, 470, 18),
        platform(320, 406, 8),
        platform(496, 342, 8),
        platform(672, 406, 8),
        platform(848, 470, 12),
        platform(1088, 390, 8),
        platform(1264, 310, 8),
        platform(1440, 390, 8),
        platform(1616, 470, 12),
        platform(1856, 358, 9),
        platform(2048, 278, 9),
        platform(2240, 358, 9),
        platform(2432, 470, 12),
        platform(2672, 342, 8),
        platform(2848, 246, 8),
        platform(3024, 342, 8),
        platform(3200, 438, 8),
        platform(3376, 470, 10),
        platform(3584, 390, 8),
        platform(3760, 470, 15)
    ],

    [
        enemy("beetle", 160, 454),
        enemy("cockroach", 350, 380),
        enemy("spider", 520, 316),
        enemy("cockroach", 900, 454),
        enemy("fly", 1130, 300),
        enemy("spider", 1280, 284),
        enemy("cockroach", 1650, 454),
        enemy("ghost", 1900, 250),
        enemy("spider", 2060, 262),
        enemy("cockroach", 2450, 454),
        enemy("cactus", 2710, 326),
        enemy("ghost", 2880, 180),
        enemy("cactus", 3040, 326),
        enemy("spider", 3600, 374)
    ],

    [
        block(336, 358),
        block(512, 294),
        block(688, 358),
        block(1120, 342),
        block(1280, 262, "fire"),
        block(1456, 342),
        block(1888, 310),
        block(2064, 230),
        block(2688, 294),
        block(2864, 198, "fire"),
        block(3040, 294)
    ],

    3824
);


const world3Level2 = makeLevel(

    [
        platform(0, 470, 14),
        platform(256, 406, 7),
        platform(416, 342, 7),
        platform(576, 278, 7),
        platform(736, 342, 7),
        platform(896, 406, 7),
        platform(1056, 470, 12),
        platform(1280, 374, 8),
        platform(1456, 278, 8),
        platform(1632, 374, 8),
        platform(1808, 470, 12),
        platform(2048, 326, 8),
        platform(2224, 230, 8),
        platform(2400, 326, 8),
        platform(2576, 422, 8),
        platform(2752, 470, 12),
        platform(2992, 342, 8),
        platform(3168, 246, 8),
        platform(3344, 342, 8),
        platform(3520, 438, 8),
        platform(3696, 470, 19)
    ],

    [
        enemy("cockroach", 290, 370),
        enemy("spider", 430, 316),
        enemy("fly", 620, 210),
        enemy("cockroach", 920, 370),
        enemy("ghost", 1300, 280),
        enemy("spider", 1470, 252),
        enemy("cactus", 1640, 330),
        enemy("cockroach", 1840, 454),
        enemy("ghost", 2070, 220),
        enemy("spider", 2240, 204),
        enemy("cactus", 2420, 278),
        enemy("ghost", 3000, 250),
        enemy("cactus", 3180, 198),
        enemy("spider", 3360, 310),
        enemy("ghost", 3540, 340)
    ],

    [
        block(272, 358),
        block(432, 294),
        block(592, 230, "fire"),
        block(752, 294),
        block(912, 358),
        block(1312, 326),
        block(1488, 230),
        block(1664, 326),
        block(2080, 278, "fire"),
        block(2256, 182),
        block(2416, 278),
        block(3008, 294),
        block(3184, 198)
    ],

    3824
);


const world3Level3 = makeLevel(

    [
        platform(0, 470, 12),
        platform(224, 422, 7),
        platform(384, 374, 7),
        platform(544, 326, 7),
        platform(704, 278, 7),
        platform(864, 326, 7),
        platform(1024, 374, 7),
        platform(1184, 422, 7),
        platform(1344, 470, 12),
        platform(1584, 390, 8),
        platform(1760, 310, 8),
        platform(1936, 230, 8),
        platform(2112, 310, 8),
        platform(2288, 390, 8),
        platform(2464, 470, 12),
        platform(2704, 358, 8),
        platform(2880, 246, 8),
        platform(3056, 358, 8),
        platform(3232, 470, 12),
        platform(3472, 310, 8),
        platform(3648, 214, 8),
        platform(3824, 470, 11)
    ],

    [
        enemy("fly", 270, 340),
        enemy("spider", 400, 348),
        enemy("fly", 720, 210),
        enemy("ghost", 900, 250),
        enemy("cactus", 1040, 338),
        enemy("cockroach", 1380, 454),
        enemy("spider", 1600, 364),
        enemy("ghost", 1780, 230),
        enemy("cactus", 1950, 198),
        enemy("ghost", 2120, 230),
        enemy("spider", 2300, 364),
        enemy("cactus", 2720, 326),
        enemy("ghost", 2900, 166),
        enemy("cactus", 3070, 326),
        enemy("spider", 3490, 278),
        enemy("ghost", 3660, 150)
    ],

    [
        block(240, 374),
        block(400, 326),
        block(560, 278, "fire"),
        block(720, 230),
        block(880, 278),
        block(1600, 342),
        block(1776, 262),
        block(1952, 182, "fire"),
        block(2128, 262),
        block(2720, 310),
        block(2896, 198),
        block(3488, 262),
        block(3664, 166)
    ],

    3880
);


const world3Level4 = makeLevel(

    [
        platform(0, 470, 16),
        platform(288, 390, 8),
        platform(464, 310, 8),
        platform(640, 230, 8),
        platform(816, 310, 8),
        platform(992, 390, 8),
        platform(1168, 470, 12),
        platform(1408, 350, 8),
        platform(1584, 246, 8),
        platform(1760, 142, 8),
        platform(1936, 246, 8),
        platform(2112, 350, 8),
        platform(2288, 470, 12),
        platform(2528, 326, 8),
        platform(2704, 214, 8),
        platform(2880, 326, 8),
        platform(3056, 438, 8),
        platform(3232, 470, 12),
        platform(3456, 342, 8),
        platform(3632, 230, 8),
        platform(3792, 470, 13)
    ],

    [
        enemy("cockroach", 330, 360),
        enemy("fly", 500, 190),
        enemy("cactus", 650, 198),
        enemy("ghost", 850, 220),
        enemy("spider", 1010, 364),
        enemy("cockroach", 1200, 454),
        enemy("ghost", 1430, 250),
        enemy("spider", 1600, 220),
        enemy("cactus", 1780, 110),
        enemy("ghost", 1950, 180),
        enemy("spider", 2130, 310),
        enemy("cockroach", 2320, 454),
        enemy("cactus", 2540, 294),
        enemy("ghost", 2720, 150),
        enemy("cactus", 2890, 294),
        enemy("spider", 3070, 402),
        enemy("ghost", 3260, 300),
        enemy("cactus", 3470, 310),
        enemy("ghost", 3650, 166)
    ],

    [
        block(304, 342),
        block(480, 262),
        block(656, 182, "fire"),
        block(832, 262),
        block(1008, 342),
        block(1424, 302),
        block(1600, 198),
        block(1776, 94, "fire"),
        block(1952, 198),
        block(2544, 278),
        block(2720, 166),
        block(2896, 278, "fire"),
        block(3472, 294),
        block(3648, 182)
    ],

    3824
);


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


export function setLevel(world, level) {

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
