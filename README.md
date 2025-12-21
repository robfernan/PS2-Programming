🛸 Nero.js: Universal JavaScript Framework

**"One Codebase. Every Console. Every Device."**

Nero.js is a high-level, component-based framework designed to bridge modern Web Development skills (JS/TS) to legacy PlayStation hardware and modern native platforms.

**Retros:** PS2, PSP, PS3, and PS1  
**Modern:** Desktop (NW.js), Mobile (Capacitor/Android), and Web

## 📍 Master Roadmap (2025 - 2026)

### 🧱 [01-05] The Foundation (COMPLETED ✅)

- **01:** Baseline Proof - Display "NERO OS" with custom colors/fonts
- **02:** Controller Debug - Full mapping of Digital, Analog, and DualShock Rumble
- **03:** UI Components - Selection menus with dynamic getTextSize() centering
- **04:** Audio Engine - SPU2 Streaming for 70MB+ WAV assets
- **05:** Procedural Wave - Animated XMB-style background with "Smooth Ribbon" math

### 🧪 [06-15] Engine Systems & Polish

- **06:** Sprite System - VRAM texture management, transparency, and 2D transforms
- **07:** Save System - JSON persistence for Memory Cards and LocalStorage
- **08:** Physics & Collision - AABB detection, gravity, and vehicle 
- **09:** Physics & Collision - AABB detection, gravity, and vehicle handling
- **10:** Scene Management - State-machine for Splash → Menu → Game transitions
- **11-15:** Visual Polish - Particles, FMV Video, Custom Fonts, and VRAM Budgeting

### 🌐 [16-24] Advanced Utility & The Universal Core

- **16:** Universal Core Merger - Auto-detection drivers for Web, NW.js, Capacitor, and Consoles
- **17-20:** Advanced I/O - Localization, Network Bridges (Web APIs), and USB HID Support
- **21-24:** Final Polish - AI Pathfinding, System Clock Sync, and ISO/APK Packaging

### 💎 [25-40] Professional Starter-Kits (Templates)

- **25-28:** Sim & Utility - Aviation Pro Kit, Desktop OS, Racing, and Survival Horror
- **29-32:** Story & Dev - Visual Novels, RPG Tilemaps, and Hot-Reloading Tools
- **33-40:** Action & Apps - FPS Zombies, Rhythm Pulse, Brawler Kit, and Multiplayer Party Pack

## 🛠 Multi-Platform Setup

### 🕹 Retro Consoles

| Platform | Runner / SDK | Rendering Method |
|----------|--------------|------------------|
| PlayStation 2 | AthenaEnv (QuickJS) | GS (2D) / VU1 (3D) |
| PSP | js-psp (QuickJS) | GU (Graphics Utility) |
| PS3 | Native WebKit Shell | WebGL / Canvas |
| PS1 | Duktape-PSX | GTE / GPU |

### 💻 Modern Devices

| Platform | Technology | Build Tools |
|----------|-----------|-------------|
| Desktop | NW.js | Node.js / NW.js Binary |
| Mobile | Capacitor | Android Studio (SDK 34+) |
| Web | Vanilla JS / React | Standard Browser / Itch.io |

## ⚙️ Development Workflow

### 1. Retro Deployment (PS2 Example)

- **Emulator:** PCSX2 Nightly (Enable Host File System in Settings)
- **Iteration:** Edit main.js → Save → Press Ctrl + R in PCSX2 for instant reload

### 2. Desktop Deployment (NW.js)

- **Runtime:** Run `nw .` in your project directory to boot the desktop version
- **Feature:** Access to Node.js fs module for local file management

### 3. Mobile Deployment (Capacitor)

- **Sync:** Run `npx cap sync android`
- **Build:** Open in Android Studio to compile the .apk or .aab for Play Store testing

## 📄 Universal Boilerplate Example

```javascript
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

## 🤝 Credits & Acknowledgments

- **PS2 Core:** AthenaEnv by Daniel Santos
- **PSP Core:** js-psp by yne
- **Inspiration:** JSLegendDev, Eightsprite, Pikuma
