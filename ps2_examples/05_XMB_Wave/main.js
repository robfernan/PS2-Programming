// Phase 5: Final XMB Wave Engine
const font = new Font("default");
const pad = Pads.get(0);

// Theme Colors (r, g, b, alpha)
const THEMES = [
    Color.new(0, 100, 255, 128), // Blue
    Color.new(255, 50, 50, 128),  // Red
    Color.new(50, 255, 50, 128),  // Green
    Color.new(255, 200, 0, 128),  // Gold
    Color.new(138, 43, 226, 128)  // Purple
];

let currentTheme = 0;
let timer = 0;
let amplitude = 40;
let frequency = 0.02;
let scrollSpeed = 0.05;

// Toggle States
let isSmooth = true;
let showPoints = false;
let inputTimer = 0;

function getCenteredX(text) {
    return (640 / 2) - (font.getTextSize(text).width / 2);
}

while (true) {
    Screen.clear(Color.new(0, 0, 0));
    pad.update();

    // --- LOGIC: INPUT DEBOUNCING ---
    if (inputTimer > 0) inputTimer--;

    if (inputTimer === 0) {
        // Change Theme
        if (pad.btns & Pads.R1) {
            currentTheme = (currentTheme + 1) % THEMES.length;
            inputTimer = 15;
        }
        
        // Toggle Smooth vs Segmented
        if (pad.btns & Pads.CIRCLE) {
            isSmooth = !isSmooth;
            inputTimer = 15;
        }

        // Toggle Points visibility
        if (pad.btns & Pads.TRIANGLE) {
            showPoints = !showPoints;
            inputTimer = 15;
        }

        // Adjust Amplitude
        if (pad.btns & Pads.UP) amplitude += 2;
        if (pad.btns & Pads.DOWN) amplitude -= 2;
    }

    timer += scrollSpeed;

    // --- DRAWING: THE WAVES ---
    // Draw 3 layers for depth
    // Layer 1 (Back - Slow)
    drawWave(timer * 0.5, amplitude * 0.5, THEMES[currentTheme], 0, 8); 
    
    // Layer 2 (Middle - White/Glow)
    drawWave(timer * 0.8, amplitude * 0.8, Color.new(255, 255, 255, 40), 100, 6); 
    
    // Layer 3 (Front - Fast/Large)
    drawWave(timer, amplitude, THEMES[currentTheme], 200, 4);

    // --- UI OVERLAY ---
    const title = "STATION OS: WAVE ENGINE v1.0";
    font.print(getCenteredX(title), 40, title, Color.new(255, 255, 255));

    // Stats
    const modeText = "MODE: " + (isSmooth ? "SMOOTH RIBBON" : "SEGMENTED DOTS");
    font.print(10, 360, modeText, THEMES[currentTheme]);

    font.print(10, 390, "[O] TOGGLE MODE | [/ \ ] TOGGLE POINTS", Color.new(180, 180, 180));
    font.print(10, 410, "L1/R1: THEME | UP/DOWN: AMP (" + amplitude + ")", Color.new(180, 180, 180));

    Screen.flip();
}

/**
 * Main Wave Drawing Function
 * @param {number} t - Time offset
 * @param {number} amp - Height
 * @param {object} color - Color
 * @param {number} phase - Horizontal shift
 * @param {number} step - Quality (lower is better)
 */
function drawWave(t, amp, color, phase, step) {
    const centerY = 224;
    
    // Store the first point to start the line
    let prevX = 0;
    let prevY = centerY + Math.sin((0 * frequency) + t + phase) * amp;

    for (let x = step; x < 640; x += step) {
        let y = centerY + Math.sin((x * frequency) + t + phase) * amp;
        
        if (isSmooth) {
            // MODE A: Smooth Ribbon (Line connection)
            Draw.line(prevX, prevY, x, y, color);
            
            // Extra thickness: Draw another line 1px down
            Draw.line(prevX, prevY + 1, x, y + 1, color);
        } else {
            // MODE B: Segmented (Retro Blocks)
            Draw.rect(x, y, step - 1, 4, color);
        }

        // Optional: Show the raw points (Wireframe look)
        if (showPoints) {
            Draw.rect(x - 1, y - 1, 2, 2, Color.new(255, 255, 255));
        }
        
        prevX = x;
        prevY = y;
    }
}