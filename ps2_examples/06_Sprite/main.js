const font = new Font("default");
const pad = Pads.get(0);

// Use the path relative to the 06_Sprite folder
const path = "host:assets/icon.png";
const myIcon = new Image(path);

let posX = 320;
let posY = 224;

while (true) {
    Screen.clear(Color.new(0, 0, 0));
    pad.update();

    font.print(10, 10, "PHASE 06: SPRITE SYSTEM", Color.new(0, 100, 255));

    // 1. Check if the hardware has finished moving the image to VRAM
    if (myIcon.ready()) {
        // Set standard dimensions for a 128x128 image
        myIcon.width = 128;
        myIcon.height = 128;

        // Draw the image
        myIcon.draw(posX, posY);
        font.print(10, 40, "STATUS: IMAGE RENDERED", Color.new(0, 255, 0));

        // Movement Controls
        if (pad.btns & Pads.UP)    posY -= 2;
        if (pad.btns & Pads.DOWN)  posY += 2;
        if (pad.btns & Pads.LEFT)  posX -= 2;
        if (pad.btns & Pads.RIGHT) posX += 2;
    } else {
        // This will show if the file exists but the PS2 hasn't processed it yet
        font.print(10, 40, "STATUS: UPLOADING " + path, Color.new(255, 255, 0));
    }

    Screen.flip();
}
