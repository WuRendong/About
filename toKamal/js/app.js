var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    imgWidth = 1024;
    imgHeight = 961;
    canvas.width = window.innerHeight - 20;
    canvas.height = canvas.width * imgHeight / imgWidth;

    doc.getElementById('main').appendChild(canvas);

    function drawBg() {
    	console.log("draw background");
    	ctx.drawImage(Resources.get('images/bg.png'), 0, 0, imgWidth, imgHeight, 0, 0, canvas.width, canvas.height);
    }

    function drawText() {
        ctx.fillStyle="black";
        ctx.font = "40px Comic Sans MS";
        ctx.fillText("Merry Christmas! Kamal", 100, 300);

        ctx.font = "20px Comic Sans MS";
        ctx.fillText("May the spirit of the Christmas fill your home with", 100, 380);
        ctx.fillText("peace, joy and love.  I wish you and your family", 100, 420);
		ctx.fillText("merry Christmas and Happy new year!", 100, 460);

        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Aaron Wu", 480, 520);
        ctx.fillText("2017-12-25", 480, 550);
    }

    function startDraw() {
    	drawBg();
    	drawText();
    }
	console.log("Engine start");

    Resources.load([
        'images/bg.png',
    ]);
    Resources.onReady(startDraw);

})(this);