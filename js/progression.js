const SAVE_KEY = "birthday_adventure_save";

const DEFAULT_SAVE = {
    worlds: {
        1: {
            unlocked: true,
            levels: {
                1: {
                    unlocked: true,
                    completed: false,
                    coins: []
                },
                2: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                3: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                4: {
                    unlocked: false,
                    completed: false,
                    coins: []
                }
            }
        },

        2: {
            unlocked: false,
            levels: {
                1: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                2: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                3: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                4: {
                    unlocked: false,
                    completed: false,
                    coins: []
                }
            }
        },

        3: {
            unlocked: false,
            levels: {
                1: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                2: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                3: {
                    unlocked: false,
                    completed: false,
                    coins: []
                },
                4: {
                    unlocked: false,
                    completed: false,
                    coins: []
                }
            }
        }
    }
};


function createFreshSave() {
    return JSON.parse(
        JSON.stringify(DEFAULT_SAVE)
    );
}


let saveData = loadSave();


function loadSave() {

    const saved =
        localStorage.getItem(SAVE_KEY);

    if (!saved) {
        return createFreshSave();
    }

    try {

        const parsed =
            JSON.parse(saved);

        return mergeSaveData(
            createFreshSave(),
            parsed
        );

    } catch {

        return createFreshSave();

    }
}


function mergeSaveData(base, saved) {

    for (const worldKey of Object.keys(saved)) {

        if (
            typeof saved[worldKey] !==
            "object"
        ) {
            continue;
        }

        if (
            base[worldKey] &&
            typeof base[worldKey] ===
            "object"
        ) {

            mergeObject(
                base[worldKey],
                saved[worldKey]
            );

        }
    }

    return base;
}


function mergeObject(target, source) {

    for (const key of Object.keys(source)) {

        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
        ) {

            if (!target[key]) {
                target[key] = {};
            }

            mergeObject(
                target[key],
                source[key]
            );

        }

        else {

            target[key] = source[key];

        }
    }
}


function save() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );

}


export function getSaveData() {

    return saveData;

}


export function isWorldUnlocked(world) {

    return Boolean(
        saveData.worlds[world] &&
        saveData.worlds[world].unlocked
    );

}


export function isLevelUnlocked(
    world,
    level
) {

    return Boolean(
        saveData.worlds[world] &&
        saveData.worlds[world].levels[level] &&
        saveData.worlds[world].levels[level].unlocked
    );

}


export function isLevelCompleted(
    world,
    level
) {

    return Boolean(
        saveData.worlds[world] &&
        saveData.worlds[world].levels[level] &&
        saveData.worlds[world].levels[level].completed
    );

}


export function completeLevel(
    world,
    level
) {

    const levelData =
        saveData.worlds[world]?.levels[level];

    if (!levelData) {
        return;
    }

    levelData.completed = true;


    const nextLevel =
        level + 1;


    if (
        saveData.worlds[world].levels[nextLevel]
    ) {

        saveData.worlds[world]
            .levels[nextLevel]
            .unlocked = true;

    }


    const nextWorld =
        world + 1;


    if (
        level === 4 &&
        saveData.worlds[nextWorld]
    ) {

        saveData.worlds[nextWorld]
            .unlocked = true;

        saveData.worlds[nextWorld]
            .levels[1]
            .unlocked = true;

    }


    save();

}


export function collectCoin(
    world,
    level,
    coinId
) {

    const levelData =
        saveData.worlds[world]?.levels[level];

    if (!levelData) {
        return false;
    }


    if (
        levelData.coins.includes(coinId)
    ) {

        return false;

    }


    levelData.coins.push(coinId);

    save();

    return true;

}


export function hasCollectedCoin(
    world,
    level,
    coinId
) {

    const levelData =
        saveData.worlds[world]?.levels[level];

    if (!levelData) {
        return false;
    }


    return levelData.coins.includes(
        coinId
    );

}


export function getCollectedCoins(
    world,
    level
) {

    const levelData =
        saveData.worlds[world]?.levels[level];

    if (!levelData) {
        return [];

    }


    return [
        ...levelData.coins
    ];

}


export function getCoinCount(
    world,
    level
) {

    const levelData =
        saveData.worlds[world]?.levels[level];

    if (!levelData) {
        return 0;

    }


    return levelData.coins.length;

}


export function resetProgress() {

    saveData =
        createFreshSave();

    save();

}


save();
