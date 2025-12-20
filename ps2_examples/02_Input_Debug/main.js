const font = new Font("default");
const white = Color.new(255, 255, 255);
const green = Color.new(0, 255, 0);
const red = Color.new(255, 0, 0);
const blue = Color.new(0, 100, 255);

const pad = Pads.get(0);

while (true) {
    Screen.clear(Color.new(15, 15, 15));
    pad.update();

    font.print(10, 10, "--- FULL DUALSHOCK 2 DEBUG ---", white);

    // --- COLUMN 1: DPAD & SYSTEM ---
    let y = 50;
    const drawBtn = (label, btn) => {
        let pressed = pad.btns & btn;
        font.print(20, y, label + (pressed ? " [ON]" : " ----"), pressed ? green : white);
        y += 20;
    };

    drawBtn("UP:    ", Pads.UP);
    drawBtn("DOWN:  ", Pads.DOWN);
    drawBtn("LEFT:  ", Pads.LEFT);
    drawBtn("RIGHT: ", Pads.RIGHT);
    y += 10;
    drawBtn("START: ", Pads.START);
    drawBtn("SELECT:", Pads.SELECT);

    // --- COLUMN 2: FACE & SHOULDER ---
    y = 50;
    const drawBtn2 = (label, btn) => {
        let pressed = pad.btns & btn;
        font.print(200, y, label + (pressed ? " [ON]" : " ----"), pressed ? red : white);
        y += 20;
    };

    drawBtn2("TRIANGLE:", Pads.TRIANGLE);
    drawBtn2("CIRCLE:  ", Pads.CIRCLE);
    drawBtn2("CROSS:   ", Pads.CROSS);
    drawBtn2("SQUARE:  ", Pads.SQUARE);
    y += 10;
    drawBtn2("L1:", Pads.L1);
    drawBtn2("L2:", Pads.L2);
    drawBtn2("R1:", Pads.R1);
    drawBtn2("R2:", Pads.R2);

    // --- COLUMN 3: ANALOG STICKS & L3/R3 ---
    y = 50;
    font.print(400, y, "--- ANALOG ---", white); y += 25;
    
    // Left Stick
    font.print(400, y, "LX: " + Math.floor(pad.lx), blue); y += 20;
    font.print(400, y, "LY: " + Math.floor(pad.ly), blue); y += 20;
    let l3_pressed = pad.btns & Pads.L3;
    font.print(400, y, "L3 (Stick): " + (l3_pressed ? "PUSH" : "---"), l3_pressed ? green : white);
    y += 30;

    // Right Stick
    font.print(400, y, "RX: " + Math.floor(pad.rx), blue); y += 20;
    font.print(400, y, "RY: " + Math.floor(pad.ry), blue); y += 20;
    let r3_pressed = pad.btns & Pads.R3;
    font.print(400, y, "R3 (Stick): " + (r3_pressed ? "PUSH" : "---"), r3_pressed ? green : white);

    // Rumble Test
    if (pad.btns & Pads.L1) Pads.rumble(0, 150, 0); // Large motor
    else if (pad.btns & Pads.R1) Pads.rumble(0, 0, 255); // Small motor
    else Pads.rumble(0, 0, 0);

    Screen.flip();
}