// Phase 08: Nero.js - Solid Platformer Engine
const font = new Font("default");
const pad = Pads.get(0);

// Colors
const NERO_BLUE = Color.new(0, 150, 255);
const WHITE = Color.new(255, 255, 255);
const BG_COLOR = Color.new(15, 15, 20);

// --- 1. PHYSICS SETTINGS ---
const GRAVITY = 0.35;
const WALK_SPEED = 3.5;
const JUMP_FORCE = -8.0;
const FRICTION = 0.85;

// --- 2. THE PLAYER ---
let player = {
    x: 50, y: 300, w: 24, h: 32,
    vx: 0, vy: 0,
    isGrounded: false
};

// --- 3. THE LEVEL (Array of Platforms) ---
// Each platform: { x, y, w, h }
let platforms = [
    { x: 0,   y: 400, w: 640, h: 48 }, // The Floor
    { x: 100, y: 300, w: 120, h: 20 }, // Platform 1
    { x: 300, y: 240, w: 120, h: 20 }, // Platform 2
    { x: 450, y: 320, w: 100, h: 20 }, // Platform 3
    { x: 250, y: 120, w: 150, h: 20 }, // High Platform
    { x: 580, y: 0,   w: 60,  h: 400 } // Right Wall
];

// Helper to check collision between two rects
function getOverlap(r1, r2) {
    return (r1.x < r2.x + r2.w && r1.x + r1.w > r2.x &&
            r1.y < r2.y + r2.h && r1.y + r1.h > r2.y);
}

while (true) {
    Screen.clear(BG_COLOR);
    pad.update();

    // --- 4. HORIZONTAL MOVEMENT ---
    if (pad.btns & Pads.LEFT)  player.vx = -WALK_SPEED;
    else if (pad.btns & Pads.RIGHT) player.vx = WALK_SPEED;
    else player.vx *= FRICTION; // Slide to a stop

    player.x += player.vx;

    // Check Horizontal Collisions
    for (let i = 0; i < platforms.length; i++) {
        if (getOverlap(player, platforms[i])) {
            if (player.vx > 0) player.x = platforms[i].x - player.w;
            if (player.vx < 0) player.x = platforms[i].x + platforms[i].w;
            player.vx = 0;
        }
    }

    // --- 5. VERTICAL MOVEMENT (Gravity) ---
    player.vy += GRAVITY;
    player.y += player.vy;
    player.isGrounded = false; // Assume falling until proven otherwise

    // Check Vertical Collisions
    for (let i = 0; i < platforms.length; i++) {
        if (getOverlap(player, platforms[i])) {
            // Falling down onto a platform
            if (player.vy > 0) {
                player.y = platforms[i].y - player.h;
                player.vy = 0;
                player.isGrounded = true;
            }
            // Hitting head on a ceiling
            else if (player.vy < 0) {
                player.y = platforms[i].y + platforms[i].h;
                player.vy = 0;
            }
        }
    }

    // --- 6. JUMP LOGIC ---
    if (pad.justPressed(Pads.CROSS) && player.isGrounded) {
        player.vy = JUMP_FORCE;
        player.isGrounded = false;
    }

    // --- 7. DRAWING ---
    // Draw all platforms
    for (let i = 0; i < platforms.length; i++) {
        Draw.rect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h, NERO_BLUE);
    }

    // Draw Player
    Draw.rect(player.x, player.y, player.w, player.h, WHITE);

    // UI & Debug
    font.print(10, 10, "NERO.JS PLATFORMER ENGINE", NERO_BLUE);
    font.print(10, 30, "X: " + Math.floor(player.x) + " Y: " + Math.floor(player.y), WHITE);
    if (player.isGrounded) font.print(500, 10, "GROUNDED", Color.new(0, 255, 0));

    Screen.flip();
}
