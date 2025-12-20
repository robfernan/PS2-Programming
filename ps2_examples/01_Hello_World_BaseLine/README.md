# 01: Hello World BaseLine

**Goal:** Display "Nero.JS: System Ready" on screen with custom colors and fonts.

![Nero Hello World](01_Nero.png)

## Key Concepts Learned:

1. **Font Initialization:** Creating a font object with `new Font("default")`
2. **Color Creation:** Using `Color.new(R, G, B)` to define colors
3. **Screen Rendering:** Using `Screen.clear()` and `Screen.flip()` for display updates
4. **Game Loop:** The main `while (true)` loop that runs continuously

## What This Example Does:

- Initializes a default font
- Creates white and black color objects
- Clears the screen with black background
- Prints "STATION OS LOADED" in white text at position (10, 10)
- Flips the screen buffer to display the result

## Hardware Used:

- PS2 Graphics Synthesizer (GS) for 2D rendering

## Code Breakdown:

```javascript
// Safe minimal code
const font = new Font("default");
const white = Color.new(255, 255, 255);
const black = Color.new(0, 0, 0);

while (true) {
    // This loop is translated by the Framework into:
    // PS2: Screen.flip() | Web: requestAnimationFrame() | Mobile: Canvas Draw
    Screen.clear(black);
    font.print(10, 10, "NERO.JS: SYSTEM READY", white);
    Screen.flip();
}
```

## Next Steps:

Move to **02_Input_Debug** to learn controller input handling and button mapping.
