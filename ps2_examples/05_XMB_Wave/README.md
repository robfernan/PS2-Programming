# 05: XMB Wave Engine

**Goal:** Create an animated procedural wave background inspired by PlayStation XMB with multiple rendering modes and themes.

![XMB Wave](05_XMB_Wave.png)

## Key Concepts Learned:

1. **Procedural Animation:** Using sine waves with time-based offsets to create smooth motion
2. **Layered Rendering:** Drawing multiple wave layers at different speeds for depth perception
3. **Frequency & Amplitude:** Controlling wave shape with mathematical parameters
4. **Smooth vs Segmented Rendering:** Two different visual modes (ribbon lines vs retro blocks)
5. **Theme System:** Cycling through multiple color palettes with alpha transparency
6. **Input-Driven Parameters:** Real-time adjustment of wave properties via controller input

## What This Example Does:

- Displays an animated XMB-style wave background with 3 layered waves
- **Layer 1 (Back):** Slow-moving, semi-transparent wave for depth
- **Layer 2 (Middle):** White glow layer for visual polish
- **Layer 3 (Front):** Fast-moving, full-opacity wave for visual impact
- Supports 5 color themes: Blue, Red, Green, Gold, Purple
- Two rendering modes: Smooth Ribbon (lines) and Segmented Dots (blocks)
- Optional wireframe point visualization
- Real-time amplitude adjustment

## Hardware Used:

- PS2 Graphics Synthesizer (GS) for 2D rendering
- DualShock 2 Controller (R1, CIRCLE, TRIANGLE, D-Pad)

## Controls:

- **R1:** Cycle through color themes
- **CIRCLE:** Toggle between Smooth Ribbon and Segmented Dots modes
- **TRIANGLE:** Toggle point visibility (wireframe)
- **UP/DOWN:** Increase/decrease wave amplitude

## Code Breakdown:

```javascript
// Wave parameters
let timer = 0;
let amplitude = 40;
let frequency = 0.02;
let scrollSpeed = 0.05;

// Update timer for animation
timer += scrollSpeed;

// Draw layered waves
drawWave(timer * 0.5, amplitude * 0.5, color1, 0, 8);    // Back layer
drawWave(timer * 0.8, amplitude * 0.8, color2, 100, 6);  // Middle layer
drawWave(timer, amplitude, color3, 200, 4);              // Front layer

// Sine wave calculation
function drawWave(t, amp, color, phase, step) {
    const centerY = 224;
    for (let x = step; x < 640; x += step) {
        let y = centerY + Math.sin((x * frequency) + t + phase) * amp;
        
        if (isSmooth) {
            Draw.line(prevX, prevY, x, y, color);  // Smooth ribbon
        } else {
            Draw.rect(x, y, step - 1, 4, color);   // Segmented blocks
        }
    }
}
```

## Mathematical Concepts:

- **Sine Wave:** `y = centerY + sin(x * frequency + time) * amplitude`
- **Frequency:** Controls wave density (0.02 = sparse, higher = dense)
- **Amplitude:** Controls wave height (40 = moderate, adjustable)
- **Phase Offset:** Shifts waves horizontally for layering effect
- **Time Offset:** Creates continuous scrolling animation

## Rendering Modes:

1. **Smooth Ribbon:** Connected lines for a fluid, modern look
2. **Segmented Dots:** Retro block-style for a classic aesthetic
3. **Wireframe:** Shows raw calculation points for debugging

## Next Steps:

Move to **06_Sprite** to learn texture management and 2D sprite rendering.
