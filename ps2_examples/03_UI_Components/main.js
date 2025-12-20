// Phase 3: UI Components & Selection Logic
const font = new Font("default");
const pad = Pads.get(0);

// Colors
const THEME_BLUE = Color.new(0, 100, 255);
const WHITE = Color.new(255, 255, 255);
const BLACK = Color.new(0, 0, 0);
const GRAY = Color.new(50, 50, 50);

// Screen Constants
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 448;

// Menu State
const menuItems = ["START GAME", "LOAD DATA", "OPTIONS", "EXIT"];
let selected = 0;

// Input Debouncing
let inputTimer = 0;
const INPUT_DELAY = 10; 

/**
 * Helper function to draw a centered button
 */
function drawButton(text, x, y, isSelected) {
    const width = 200;
    const height = 40;

    // 1. Draw Background Box
    const bgColor = isSelected ? THEME_BLUE : GRAY;
    Draw.rect(x, y, width, height, bgColor);

    // 2. Draw Outline if selected
    if (isSelected) {
        Draw.rect(x - 2, y - 2, width + 4, 2, WHITE); // Top
        Draw.rect(x - 2, y + height, width + 4, 2, WHITE); // Bottom
    }

    // --- CORRECTED CENTERING LOGIC ---
    // font.getTextSize(text) returns { width, height }
    const textWidth = font.getTextSize(text).width;
    
    // Horizontal center inside the button:
    const textX = x + (width / 2) - (textWidth / 2);
    
    // Vertical center inside the button:
    const textY = y + (height / 2) - 10;

    // 3. Draw Text
    font.print(textX, textY, text, WHITE);
}

while (true) {
    Screen.clear(BLACK);
    pad.update();

    // --- LOGIC: SELECTION ---
    if (inputTimer > 0) inputTimer--;

    if (inputTimer === 0) {
        if (pad.btns & Pads.UP) {
            selected--;
            if (selected < 0) selected = menuItems.length - 1;
            inputTimer = INPUT_DELAY;
        }
        if (pad.btns & Pads.DOWN) {
            selected++;
            if (selected >= menuItems.length) selected = 0;
            inputTimer = INPUT_DELAY;
        }
    }

    // --- LOGIC: ACTION ---
    if (pad.btns & Pads.CROSS && inputTimer === 0) {
        Pads.rumble(0, 255, 0);
        inputTimer = INPUT_DELAY * 2;
    }

    // --- DRAWING: HEADER ---
    const title = "STATION OS MENU";
    const titleSize = font.getTextSize(title); // Get object
    const titleX = (SCREEN_WIDTH / 2) - (titleSize.width / 2);
    font.print(titleX, 50, title, THEME_BLUE);

    // --- DRAWING: BUTTONS ---
    for (let i = 0; i < menuItems.length; i++) {
        const btnWidth = 200;
        const x = (SCREEN_WIDTH / 2) - (btnWidth / 2);
        const y = 120 + (i * 50); 
        
        drawButton(menuItems[i], x, y, i === selected);
    }

    // --- DRAWING: HINT TEXT ---
    const hint = "USE DPAD TO MOVE, CROSS TO SELECT";
    const hintSize = font.getTextSize(hint); // Corrected here
    const hintX = (SCREEN_WIDTH / 2) - (hintSize.width / 2);
    font.print(hintX, 360, hint, WHITE);

    Screen.flip();
}