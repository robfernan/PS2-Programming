# 06: Sprite System

**Goal:** Load PNG images into VRAM and render 2D sprites with positioning and movement.

![Sprite System](06_sprite.png)

## Key Concepts Learned:

1. **Image Loading:** Using `new Image(path)` to load PNG files from the filesystem
2. **VRAM Management:** Understanding `.ready()` to check if the image has been uploaded to VRAM
3. **Sprite Dimensions:** Setting width and height for proper rendering
4. **Sprite Drawing:** Using `.draw(x, y)` to render sprites at specific coordinates
5. **Sprite Movement:** Updating position based on controller input
6. **Asset Paths:** Using relative paths (`host:assets/icon.png`) for asset loading

## What This Example Does:

- Loads a PNG image from `assets/icon.png`
- Waits for the image to be uploaded to VRAM (`.ready()` check)
- Displays the sprite at 128x128 pixels
- Allows movement with D-Pad (Up/Down/Left/Right)
- Shows loading status while VRAM transfer is in progress
- Displays success status once the sprite is rendered

## Hardware Used:

- PS2 Graphics Synthesizer (GS) for 2D rendering
- PS2 VRAM for texture storage
- DualShock 2 Controller (D-Pad for movement)

## Asset Requirements:

- **Format:** PNG image
- **Location:** `06_Sprite/assets/icon.png`
- **Recommended Size:** 128x128 pixels (power of 2 for optimal VRAM usage)
- **Path Format:** `host:assets/icon.png` (relative to ELF)

## Code Breakdown:

```javascript
// Load image into memory
const myIcon = new Image("host:assets/icon.png");

// Check if image is ready in VRAM
if (myIcon.ready()) {
    // Set sprite dimensions
    myIcon.width = 128;
    myIcon.height = 128;
    
    // Draw sprite at position
    myIcon.draw(posX, posY);
} else {
    // Still uploading to VRAM
    console.log("Uploading to VRAM...");
}

// Movement with D-Pad
if (pad.btns & Pads.UP) posY -= 2;
if (pad.btns & Pads.DOWN) posY += 2;
if (pad.btns & Pads.LEFT) posX -= 2;
if (pad.btns & Pads.RIGHT) posX += 2;
```

## VRAM Considerations:

- PS2 has 4MB of VRAM total
- PNG images are decompressed when loaded
- Use power-of-2 dimensions (128x128, 256x256) for optimal VRAM usage
- `.ready()` ensures the GPU has finished the transfer before drawing

## Next Steps:

Move to **07_Save_System** to learn data persistence with JSON and Memory Cards.
