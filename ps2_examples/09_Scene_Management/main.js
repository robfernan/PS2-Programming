// Phase 09: Nero.js - Polished Scene Management
const font = new Font("default");
const pad = Pads.get(0);

// --- 1. ENGINE CONSTANTS ---
const SCENE_TITLE   = 0;
const SCENE_GAME    = 1;
const SCENE_PAUSE   = 2;
const SCENE_OPTIONS = 3;

// --- 2. GLOBAL COLORS ---
const NERO_BLUE = Color.new(0, 150, 255);
const WHITE     = Color.new(255, 255, 255);
const GREEN     = Color.new(0, 255, 0);
const GRAY      = Color.new(100, 100, 100);
const DIM_BLACK = Color.new(0, 0, 0, 180);

// --- 3. GLOBAL STATE ---
let currentScene = SCENE_TITLE;
let menuSelection = 0;
let inputTimer = 0;
let score = 0;
let showStats = true;
let fadeAlpha = 255;

// Shared Physics Data
let player = { x: 50, y: 350, w: 24, h: 32, vx: 0, vy: 0, isGrounded: false };
let platform = { x: 0, y: 400, w: 640, h: 48 };

// --- 4. UTILITY FUNCTIONS ---
function drawMenuOption(text, x, y, index) {
    const isSelected = (menuSelection === index);
    const col = isSelected ? GREEN : WHITE;
    
    // Draw an arrow cursor if selected
    if (isSelected) {
        font.print(x - 25, y, ">", GREEN);
    }
    font.print(x, y, text, col);
}

function handleFade() {
    if (fadeAlpha > 0) fadeAlpha -= 5;
    if (fadeAlpha > 0) {
        Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
    }
}

// --- 5. SCENE LOGIC & DRAWING ---
function titleScene() {
    font.print(210, 100, "NERO.JS ENGINE", NERO_BLUE);
    
    // Draw Options
    drawMenuOption("START MISSION", 250, 220, 0);
    drawMenuOption("EXIT TO BIOS", 250, 250, 1);
    
    // Logic
    if (inputTimer === 0) {
        if (pad.btns & Pads.UP)   { menuSelection = 0; inputTimer = 10; }
        if (pad.btns & Pads.DOWN) { menuSelection = 1; inputTimer = 10; }
        if (pad.btns & Pads.CROSS) {
            if (menuSelection === 0) { currentScene = SCENE_GAME; fadeAlpha = 255; }
            else { System.exitToBrowser(); }
            inputTimer = 20;
        }
    }
}

function gameScene() {
    // Input for Pause
    if (pad.justPressed(Pads.START)) { currentScene = SCENE_PAUSE; menuSelection = 0; return; }
    
    // Physics Logic (Phase 08)
    if (pad.btns & Pads.LEFT) player.vx = -3.5;
    else if (pad.btns & Pads.RIGHT) player.vx = 3.5;
    else player.vx *= 0.85;
    
    player.vy += 0.4;
    player.x += player.vx;
    player.y += player.vy;
    
    if (player.y + player.h > platform.y) {
        player.y = platform.y - player.h;
        player.vy = 0;
        player.isGrounded = true;
    }
    
    if (pad.justPressed(Pads.CROSS) && player.isGrounded) {
        player.vy = -9.0;
        player.isGrounded = false;
        score += 10;
    }
    
    // Rendering
    Draw.rect(platform.x, platform.y, platform.w, platform.h, GRAY);
    Draw.rect(player.x, player.y, player.w, player.h, WHITE);
    font.print(10, 10, "SCORE: " + score, WHITE);
}

function pauseScene() {
    gameScene(); // Show game behind pause
    Draw.rect(0, 0, 640, 448, DIM_BLACK);
    font.print(260, 140, "- PAUSED -", NERO_BLUE);
    
    // Draw Options
    drawMenuOption("RESUME", 250, 200, 0);
    drawMenuOption("OPTIONS", 250, 230, 1);
    drawMenuOption("QUIT TO TITLE", 250, 260, 2);
    
    // Logic
    if (inputTimer === 0) {
        if (pad.btns & Pads.UP)   { menuSelection--; inputTimer = 10; }
        if (pad.btns & Pads.DOWN) { menuSelection++; inputTimer = 10; }
        
        // Wrap around logic
        if (menuSelection < 0) menuSelection = 2;
        if (menuSelection > 2) menuSelection = 0;
        
        if (pad.btns & Pads.CROSS) {
            if (menuSelection === 0) currentScene = SCENE_GAME;
            if (menuSelection === 1) { currentScene = SCENE_OPTIONS; menuSelection = 0; }
            if (menuSelection === 2) currentScene = SCENE_TITLE;
            inputTimer = 20;
        }
    }
}

function optionsScene() {
    Draw.rect(0, 0, 640, 448, Color.new(20, 20, 40));
    font.print(250, 100, "ENGINE OPTIONS", NERO_BLUE);
    
    let toggleLabel = "SHOW STATS: " + (showStats ? "[ON]" : "[OFF]");
    drawMenuOption(toggleLabel, 200, 200, 0);
    drawMenuOption("BACK TO PAUSE", 200, 230, 1);
    
    if (inputTimer === 0) {
        if (pad.btns & Pads.UP)   { menuSelection = 0; inputTimer = 10; }
        if (pad.btns & Pads.DOWN) { menuSelection = 1; inputTimer = 10; }
        if (pad.btns & Pads.CROSS) {
            if (menuSelection === 0) showStats = !showStats;
            if (menuSelection === 1) currentScene = SCENE_PAUSE;
            inputTimer = 20;
        }
    }
}

// --- MAIN LOOP ---
while (true) {
    Screen.clear(Color.new(0, 0, 0));
    pad.update();
    
    if (inputTimer > 0) inputTimer--;
    
    switch(currentScene) {
        case SCENE_TITLE:   titleScene(); break;
        case SCENE_GAME:    gameScene(); break;
        case SCENE_PAUSE:   pauseScene(); break;
        case SCENE_OPTIONS: optionsScene(); break;
    }
    
    // Always draw FPS if enabled
    if (showStats) {
        font.print(520, 10, "FPS: " + Screen.getFPS(), GRAY);
    }
    
    handleFade();
    Screen.flip();
}
