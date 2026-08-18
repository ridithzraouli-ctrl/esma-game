// ========================================
// LEVEL DATA
// ========================================

export const WORLD_WIDTH = 4000;


// ========================================
// CURRENT LEVEL
// ========================================

export let currentWorld = 1;
export let currentLevel = 1;


// ========================================
// TEST LEVEL
// ========================================

const testLevel = {

    platforms: [

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

    ]

};


// ========================================
// LEVEL STORAGE
// ========================================

const levels = {

    1: {
        1: testLevel,
        2: testLevel,
        3: testLevel,
        4: testLevel
    },

    2: {
        1: testLevel,
        2: testLevel,
        3: testLevel,
        4: testLevel
    },

    3: {
        1: testLevel,
        2: testLevel,
        3: testLevel,
        4: testLevel
    }

};


// ========================================
// GET CURRENT LEVEL
// ========================================

export function getCurrentLevel() {

    return levels[currentWorld][currentLevel];

}


// ========================================
// CHANGE LEVEL
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


    // Game completed

    return false;

}
