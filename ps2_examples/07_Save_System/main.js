// Phase 07: Nero JS - Universal Persistence Engine
const font = new Font("default");
const pad = Pads.get(0);

// Colors
const NERO_BLUE = Color.new(0, 150, 255);
const WHITE = Color.new(255, 255, 255);
const GREEN = Color.new(0, 255, 0);
const RED = Color.new(255, 0, 0);
const GRAY = Color.new(100, 100, 100);

// 1. DATA OBJECT
let appData = {
    counter: 0,
    lastSaved: "NEVER",
    method: "WAITING..."
};

const MC_PATH = "mc0:/NERO.JSN";
const HOST_PATH = "host:nero_save.json"; // Fallback to PC folder

let statusMessage = "SYSTEM INITIALIZED";
let inputTimer = 0;

/**
 * NERO SAVER: The most robust saving logic possible for AthenaEnv
 */
const NeroSaver = {
    save: function(content) {
        // Method 1: QuickJS Standard Library (Common in new Athena builds)
        if (typeof std !== 'undefined' && std.open) {
            try {
                let f = std.open(MC_PATH, "w");
                f.puts(content);
                f.close();
                appData.method = "std.open (MC)";
                return true;
            } catch(e) {
                // Try Host if MC fails
                let f = std.open(HOST_PATH, "w");
                f.puts(content);
                f.close();
                appData.method = "std.open (HOST)";
                return true;
            }
        }

        // Method 2: Legacy System API
        if (typeof System !== 'undefined') {
            if (System.writeFile) { System.writeFile(MC_PATH, content); appData.method = "System.writeFile"; return true; }
            if (System.saveFile)  { System.saveFile(MC_PATH, content);  appData.method = "System.saveFile";  return true; }
            if (System.save)      { System.save(MC_PATH, content);      appData.method = "System.save";      return true; }
        }

        // Method 3: IO Module
        if (typeof IO !== 'undefined' && IO.writeFile) {
            IO.writeFile(MC_PATH, content);
            appData.method = "IO.writeFile";
            return true;
        }

        throw new Error("No save function found in this ELF");
    },

    load: function() {
        // Method 1: std.loadFile
        if (typeof std !== 'undefined' && std.loadFile) {
            try { return std.loadFile(MC_PATH) || std.loadFile(HOST_PATH); } catch(e) { return null; }
        }

        // Method 2: System.readFile
        if (typeof System !== 'undefined') {
            if (System.readFile) return System.readFile(MC_PATH);
            if (System.loadFile) return System.loadFile(MC_PATH);
        }

        return null;
    }
};

function printCentered(text, y, color) {
    const textWidth = font.getTextSize(text).width;
    font.print((640 / 2) - (textWidth / 2), y, text, color);
}

while (true) {
    Screen.clear(Color.new(0, 0, 0));
    pad.update();

    if (inputTimer > 0) inputTimer--;

    // --- CONTROLS ---
    if (inputTimer === 0) {
        if (pad.btns & Pads.UP)   { appData.counter++; inputTimer = 8; }
        if (pad.btns & Pads.DOWN) { appData.counter--; inputTimer = 8; }

        // SAVE (Cross)
        if (pad.btns & Pads.CROSS) {
            try {
                const d = new Date();
                appData.lastSaved = d.getHours() + ":" + d.getMinutes();
                const success = NeroSaver.save(JSON.stringify(appData));
                statusMessage = success ? "SAVE SUCCESSFUL" : "SAVE FAILED";
            } catch (e) {
                statusMessage = "ERROR: " + e.message;
            }
            inputTimer = 30;
        }

        // LOAD (Square)
        if (pad.btns & Pads.SQUARE) {
            const data = NeroSaver.load();
            if (data) {
                appData = JSON.parse(data);
                statusMessage = "LOAD SUCCESSFUL";
            } else {
                statusMessage = "NO SAVE FOUND";
            }
            inputTimer = 30;
        }
    }

    // --- UI ---
    printCentered("NERO JS: PERSISTENCE ENGINE", 40, NERO_BLUE);
    printCentered("VALUE: " + appData.counter, 150, WHITE);
    printCentered("DETECTED METHOD: " + appData.method, 220, GRAY);
    printCentered("TIMESTAMP: " + appData.lastSaved, 250, GRAY);

    // Footer Log
    Draw.rect(0, 420, 640, 28, Color.new(20, 20, 20));
    let color = (statusMessage.indexOf("SUCCESS") > -1) ? GREEN : (statusMessage.indexOf("ERROR") > -1 ? RED : WHITE);
    font.print(10, 425, "LOG: " + statusMessage, color);

    font.print(10, 350, "[UP/DOWN] Edit | [X] SAVE | [#] LOAD", WHITE);

    Screen.flip();
}
