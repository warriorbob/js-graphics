// Create canvas and such
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = '320';
canvas.height = '240';	// Old PC, close to Genesis
document.body.appendChild(canvas);


/*
Idea:

Divide the canvas into squares and use those to make a really ghetto platformer.
No slopes, nothing clever, just a 1-block dude running around colliding with anything solid.
Boing boing boing.

*/

const BOXSIZE = 16;

var dude = {
	xpos: 100,
	ypos: 100
}

var sprite = new Image();
sprite.src = 'dude.bmp';

var drawGrid = function()
{
	for(var i = 0; i < canvas.height / BOXSIZE; i++)
	{	//Horizontal lines
		ctx.beginPath();
		ctx.moveTo(0.5, i * BOXSIZE);
		ctx.lineTo(canvas.width, i * BOXSIZE);
		ctx.lineWidth = "0.2";
		ctx.stroke();
	}

	for(var j = 0; j < canvas.width / BOXSIZE; j++)
	{
		//Vertical lines
		ctx.beginPath();
		ctx.moveTo(j * BOXSIZE, 0.5);
		ctx.lineTo(j * BOXSIZE, canvas.height);
		ctx.lineWidth = "0.2";
		ctx.stroke();
	}
}

var drawDude = function(x, y)
{
	ctx.drawImage(sprite, x, y);
}

// GO DO STUFF 
var draw = function()
{
	drawGrid();
	drawDude(dude.xpos, dude.ypos);
}

var update = function()
{
	dude.ypos++;
};

var resetGraphics = function(modifier) {
   ctx.save();
   // Use the identity matrix while clearing the canvas
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.restore();

   ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(canvas.width,0);
	ctx.lineTo(canvas.width,canvas.height);
	ctx.lineTo(0,canvas.height);
	ctx.lineTo(0,0);
	ctx.stroke();
};

//---------------
// Go
//---------------
var main = function() {
	var now = Date.now();
	var delta = now - then;
	resetGraphics();
	update(delta / 1000);
	draw();
	then = now;
};

//off we go
var ready = true;
var then = Date.now();
setInterval(main,1);