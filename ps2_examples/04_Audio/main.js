const font = new Font("default");
const white = Color.new(255, 255, 255);
const black = Color.new(0, 0, 0);
const blue = Color.new(0, 100, 255);
const green = Color.new(0, 255, 0);

// 1. Get the pad object once
const pad = Pads.get(0);

let bgm = null;
let loading = false;
let loaded = false;
let error = false;

while (true) {
    Screen.clear(black);
    
    // 2. Update the pad state inside the loop
    pad.update();

    font.print(10, 10, "STATION OS: AUDIO SYSTEM", blue);

    // --- STATE: INITIAL ---
    if (!loaded && !loading && !error) {
        font.print(10, 60, "READY TO LOAD: host:assets/music.wav", white);
        font.print(10, 85, "PRESS [CROSS] TO ATTEMPT STREAM", white);
        
        // Use bitmask check (working style from Phase 2)
        if (pad.btns & Pads.CROSS) {
            loading = true;
        }
    }

    // --- STATE: LOADING ---
    if (loading && !loaded) {
        font.print(10, 60, "LOADING STREAM... PLEASE WAIT...", green);
        Screen.flip(); // Force draw

        try {
            // Based on discovery, Sound.Stream is a method.
            // We use the path relative to the ELF: host:assets/music.wav
            bgm = Sound.Stream("host:assets/music.wav");
            
            if (bgm) {
                loaded = true;
                loading = false;
            } else {
                throw new Error("Handle is null");
            }
        } catch (e) {
            loading = false;
            error = true;
        }
    }

    // --- STATE: ERROR ---
    if (error) {
        font.print(10, 60, "LOAD FAILED!", Color.new(255, 0, 0));
        font.print(10, 85, "1. Check music.wav is 16-bit PCM", white);
        font.print(10, 110, "2. Check path: 04_Audio/assets/music.wav", white);
        font.print(10, 150, "PRESS [TRIANGLE] TO TRY AGAIN", white);
        
        if (pad.btns & Pads.TRIANGLE) error = false;
    }

    // --- STATE: READY / PLAYING ---
    if (loaded) {
        font.print(10, 60, "STREAM READY", green);
        font.print(10, 90, "PRESS [START] TO PLAY / [TRIANGLE] TO STOP", white);
        
        if (pad.btns & Pads.START) {
            bgm.play();
        }
        
        if (pad.btns & Pads.TRIANGLE) {
            bgm.stop();
        }

        // Volume logic
        if (pad.btns & Pads.R1) Sound.setVolume(100);
    }

    Screen.flip();
}