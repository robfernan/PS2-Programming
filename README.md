# 🕹️ PS2-Programming
**"Engineering Modern Systems on Legacy Hardware"**

This repository contains a comprehensive collection of technical modules and examples for **PlayStation 2** development using **AthenaEnvJS**. My work focuses on expanding and documenting the capacity of this environment to bridge modern JavaScript logic with legacy GS/VU1 hardware.

## 🔗 Official Framework & Ecosystem
For those interested in the underlying framework or official documentation, please visit:
* **Core Framework:** [AthenaEnv by Daniel Santos](https://github.com/DanielSant0s/AthenaEnv) — The QuickJS-based runtime for the PS2.
* **Documentation Hub:** [AthenaEnv Website by Daniel Abrante](https://github.com/DanielAbrante/athena-env-website) — The Docusaurus-based center for framework content and standards.

---

## 🧱 Module Overview (Completed ✅)
These nine modules represent a verified foundation of systems engineering on real PS2 hardware.

* **01: Hello World BaseLine**
    * **Goal:** Display "Nero.JS: System Ready" on screen with custom colors and fonts.
* **02: Input Debug**
    * **Goal:** Full DualShock 2 controller mapping and debugging with real-time input display.
* **03: UI Components & Selection Logic**
    * **Goal:** Build a functional menu system with selection highlighting and input debouncing.
* **04: Audio Engine**
    * **Goal:** Stream and playback 16-bit PCM WAV audio files using the PS2 SPU2 audio processor.
* **05: XMB Wave Engine**
    * **Goal:** Create an animated procedural wave background inspired by the PlayStation XMB.
* **06: Sprite System**
    * **Goal:** Load PNG images into VRAM and render 2D sprites with positioning and movement.
* **07: Save System & Persistence**
    * **Goal:** Implement JSON-based data saving to physical/virtual Memory Cards with universal file I/O.
* **08: Physics & Collisions (Platformer Engine)**
    * **Goal:** Implement a solid platformer with gravity, jumping, and pixel-perfect collision detection.
* **09: Scene Management**
    * **Goal:** Implement a state machine for managing game scenes (Title, Game, Pause) with smooth transitions.

---

## 🚀 Future Vision: The Universal Workflow
My long-term goal is to merge these low-level retro modules into a unified, cross-platform pipeline. The objective is a single codebase that can be deployed across modern and legacy systems simultaneously.

### **Target Ecosystem**
* **Modern Workflows:** Web (HTML/CSS/JS), Desktop (NW.js), and Mobile (Capacitor).
* **Legacy Platforms:** PlayStation 2 (Active), PS1, PSP, PS3, Dreamcast, and Game Boy.

### **Universal Boilerplate Concept**
```javascript
while (true) {
    // This loop is translated by the Framework into:
    // PS2: Screen.flip() | Web: requestAnimationFrame() | Mobile: Canvas Draw
    Screen.clear(black);
    font.print(10, 10, "SYSTEM READY: CROSS-PLATFORM", white);
    Screen.flip();
}
