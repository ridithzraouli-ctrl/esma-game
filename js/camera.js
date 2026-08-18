export const camera = {
    x: 0,
    y: 0
};

export function updateCamera(player, canvas, worldWidth) {

    // Keep the player slightly left of center
    const targetX = player.x - canvas.width * 0.4;

    // Smooth movement
    camera.x += (targetX - camera.x) * 0.08;

    // Don't go past the beginning
    if (camera.x < 0) {
        camera.x = 0;
    }

    // Don't go past the end
    const maxCameraX = worldWidth - canvas.width;

    if (camera.x > maxCameraX) {
        camera.x = maxCameraX;
    }
}
