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