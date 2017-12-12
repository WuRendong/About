/*Utils*/
var Rect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// Except water block
var getRectByBlockPos = function(pos) {
    var row = Math.ceil(pos / NUM_COL_BLOCKS);
    var col = pos % NUM_COL_BLOCKS;

    return new Rect(col * WIDTH_BLOCK + (WIDTH_BLOCK - WIDTH_PLAYER) / 2, row * HEIGHT_BLOCK + 10/*the gap*/, WIDTH_BLOCK, HEIGHT_BLOCK);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// for array sort
var sortNumber = function(a, b) {
    return a - b;
}