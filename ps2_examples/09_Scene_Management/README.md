# 09: Scene Management

**Goal:** Implement a state machine for managing multiple game scenes (Title, Game, Pause, Options) with smooth transitions.

## Screenshots:

![Start Menu](09_start_menu.png)
![Game View](09_game_view.png)
![Pause Menu](09_pause_menu.png)

## Key Concepts Learned:

1. **State Machine:** Using constants to define scene states and switching between them
2. **Scene Functions:** Separating logic and rendering for each scene
3. **Global State:** Maintaining shared data (score, player position) across scenes
4. **Menu Navigation:** Handling menu selection with wrapping and input debouncing
5. **Scene Layering:** Drawing game behind pause menu for visual continuity
6. **Fade Transitions:** Smooth alpha-based transitions between scenes
7. **Utility Functions:** Reusable functions for common UI patterns (menu options, fading)

## What This Example Does:

- **Title Scene:** Start menu with "START MISSION" and "EXIT TO BIOS" options
- **Game Scene:** Platformer gameplay with score tracking and physics
- **Pause Scene:** Overlay menu with Resume, Options, and Quit options
- **Options Scene:** Settings menu to toggle FPS display
- **Transitions:** Smooth fade-in when entering game, menu wrapping on pause
- **Shared State:** Score and player position persist across scene changes

## Hardware Used:

- PS2 Graphics Synthesizer (GS) for 2D rendering
- DualShock 2 Controller (D-Pad, CROSS, START buttons)

## Controls:

- **UP/DOWN:** Navigate menu options
- **CROSS (X):** Select menu option
- **START:** Pause/Resume game
- **Arrow Cursor:** Visual indicator of selected menu item

## Scene Architecture:

```javascript
const SCENE_TITLE   = 0;  // Main menu
const SCENE_GAME    = 1;  // Gameplay
const SCENE_PAUSE   = 2;  // Pause overlay
const SCENE_OPTIONS = 3;  // Settings menu

let currentScene = SCENE_TITLE;  // Current active scene
```

## Code Breakdown:

### State Machine Pattern:

```javascript
switch(currentScene) {
    case SCENE_TITLE:   titleScene(); break;
    case SCENE_GAME:    gameScene(); break;
    case SCENE_PAUSE:   pauseScene(); break;
    case SCENE_OPTIONS: optionsScene(); break;
}
```

### Menu Navigation:

```javascript
function drawMenuOption(text, x, y, index) {
    const isSelected = (menuSelection === index);
    const col = isSelected ? GREEN : WHITE;
    
    if (isSelected) {
        font.print(x - 25, y, ">", GREEN);  // Arrow cursor
    }
    font.print(x, y, text, col);
}
```

### Scene Transitions:

```javascript
// Fade transition when entering game
if (menuSelection === 0) { 
    currentScene = SCENE_GAME; 
    fadeAlpha = 255;  // Start fade
}

// Smooth fade rendering
function handleFade() {
    if (fadeAlpha > 0) fadeAlpha -= 5;
    if (fadeAlpha > 0) {
        Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
    }
}
```

### Pause Menu Layering:

```javascript
function pauseScene() {
    gameScene();  // Draw game underneath
    Draw.rect(0, 0, 640, 448, DIM_BLACK);  // Semi-transparent overlay
    // Draw pause menu on top
}
```

## Scene Flow:

```
TITLE SCENE
    ↓ (START MISSION)
GAME SCENE
    ↓ (START button)
PAUSE SCENE
    ├→ RESUME → GAME SCENE
    ├→ OPTIONS → OPTIONS SCENE → PAUSE SCENE
    └→ QUIT → TITLE SCENE
```

## Global State Management:

```javascript
let currentScene = SCENE_TITLE;  // Active scene
let menuSelection = 0;           // Current menu index
let inputTimer = 0;              // Input debouncing
let score = 0;                   // Game score
let showStats = true;            // FPS display toggle
let fadeAlpha = 255;             // Transition fade value
```

## Input Debouncing:

```javascript
if (inputTimer === 0) {
    if (pad.btns & Pads.UP) { menuSelection = 0; inputTimer = 10; }
    if (pad.btns & Pads.DOWN) { menuSelection = 1; inputTimer = 10; }
}
if (inputTimer > 0) inputTimer--;  // Decrement each frame
```

## Menu Wrapping:

```javascript
// Wrap around logic for pause menu
if (menuSelection < 0) menuSelection = 2;
if (menuSelection > 2) menuSelection = 0;
```

## Performance Notes:

- State machine pattern is efficient and scalable
- Easy to add new scenes without modifying existing code
- Shared state allows data persistence across scenes
- Fade transitions use simple alpha blending

## Next Steps:

Move to **10_Particle_System** to learn particle effects and visual polish.
