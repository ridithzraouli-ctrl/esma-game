import { player, updatePlayer, jump } from "./player.js";
import { camera, updateCamera } from "./camera.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;


// ========================================
// TEMPORARY TEST LEVEL
// ========================================

const platforms = [
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

const WORLD_WIDTH = 4000;


// ========================================
// INPUT
// ========================================

const keys = {};

document.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    keys[key] = true;

    if (
        key === " " ||
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright"
    ) {
        event.preventDefault();
    }

    // Jump
    if (
        key === " " ||
        key === "arrowup" ||
        key === "w"
    ) {
        jump();
    }

});

document.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});


// ========================================
// UPDATE
// ========================================

function update() {

    updatePlayer(keys, platforms);

    updateCamera(
        player,
        canvas,
        WORLD_WIDTH
    );

}


// ========================================
// DRAW
// ========================================

function draw() {

    // Plain background
    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Everything below follows the camera
    ctx.save();

    ctx.translate(
        -camera.x,
        -camera.y
    );


    // Ground/platforms
    ctx.fillStyle = "#8B5A2B";

    for (const platform of platforms) {

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

    }


    // Player
    ctx.fillStyle = "#FF69B4";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    ctx.restore();

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
