# 08: Physics & Collisions - Platformer Engine

**Goal:** Implement a solid platformer with gravity, jumping, and pixel-perfect collision detection.

![Physics & Collisions](08_Physics_collisions.png)

## Key Concepts Learned:

1. **Gravity Simulation:** Applying constant downward acceleration to create realistic falling
2. **Velocity-Based Movement:** Using velocity vectors (vx, vy) for smooth physics
3. **Friction:** Slowing horizontal movement when no input is applied
4. **Grounded Detection:** Checking if player is standing on a platform
5. **Separate Axis Collision:** Handling X and Y collisions independently for solid platforms
6. **Jump Mechanics:** Applying upward velocity only when grounded
7. **Platform Array:** Storing multiple collision objects for level design

## What This Example Does:

- Displays a white player character (24x32) that can walk and jump
- Renders blue platforms at various heights
- Applies gravity to pull the player downward
- Detects when player is standing on platforms (grounded state)
- Allows jumping only when grounded
- Prevents walking through platforms (solid collision)
- Shows player position and grounded status
- Implements friction for natural deceleration

## Hardware Used:

- PS2 Graphics Synthesizer (GS) for 2D rendering
- DualShock 2 Controller (D-Pad Left/Right, CROSS for jump)

## Controls:

- **LEFT/RIGHT:** Walk left and right
- **CROSS (X):** Jump (only when grounded)
- **Visual Feedback:** Green "GROUNDED" indicator when standing on platform

## Physics Parameters:

```javascript
const GRAVITY = 0.35;      // Downward acceleration per frame
const WALK_SPEED = 3.5;    // Horizontal movement speed
const JUMP_FORCE = -8.0;   // Upward velocity on jump (negative = up)
const FRICTION = 0.85;     // Velocity multiplier when no input (0-1)
```

## Code Breakdown:

```javascript
// Horizontal movement with friction
if (pad.btns & Pads.LEFT) player.vx = -WALK_SPEED;
else if (pad.btns & Pads.RIGHT) player.vx = WALK_SPEED;
else player.vx *= FRICTION;  // Decelerate

player.x += player.vx;

// Vertical movement with gravity
player.vy += GRAVITY;
player.y += player.vy;

// Collision detection (separate X and Y)
for (let i = 0; i < platforms.length; i++) {
    if (getOverlap(player, platforms[i])) {
        if (player.vy > 0) {  // Falling
            player.y = platforms[i].y - player.h;
            player.vy = 0;
            player.isGrounded = true;
        }
        else if (player.vy < 0) {  // Jumping into ceiling
            player.y = platforms[i].y + platforms[i].h;
            player.vy = 0;
        }
    }
}

// Jump only when grounded
if (pad.justPressed(Pads.CROSS) && player.isGrounded) {
    player.vy = JUMP_FORCE;
    player.isGrounded = false;
}
```

## Collision Detection:

The `getOverlap()` function uses AABB (Axis-Aligned Bounding Box) to detect rectangle collisions:

```javascript
function getOverlap(r1, r2) {
    return (r1.x < r2.x + r2.w && r1.x + r1.w > r2.x &&
            r1.y < r2.y + r2.h && r1.y + r1.h > r2.y);
}
```

## Level Design:

Platforms are stored in an array for easy level editing:

```javascript
let platforms = [
    { x: 0,   y: 400, w: 640, h: 48 }, // Floor
    { x: 100, y: 300, w: 120, h: 20 }, // Platform 1
    { x: 300, y: 240, w: 120, h: 20 }, // Platform 2
    // Add more platforms here
];
```

## Physics Concepts:

- **Velocity:** Rate of change in position per frame
- **Acceleration:** Rate of change in velocity (gravity = 0.35 pixels/frame²)
- **Friction:** Multiplier that reduces velocity over time (0.85 = 15% loss per frame)
- **Grounded State:** Boolean flag to prevent mid-air jumping

## Performance Notes:

- Collision checks are O(n) where n = number of platforms
- Suitable for 50+ platforms without performance issues
- Separate X/Y collision handling prevents "sticky" corners

## Next Steps:

Move to **09_Scene_Management** to learn state machines and scene transitions.
