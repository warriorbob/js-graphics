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

var drawGrid = function()
{
	for(var i = 0; i < canvas.height / BOXSIZE; i++)
	{
		ctx.beginPath();
		ctx.moveTo(0, i * BOXSIZE);
		ctx.lineTo(canvas.width, i * BOXSIZE);
		ctx.lineWidth = "1";
		ctx.stroke();
	}

	for(var j = 0; j < canvas.width / BOXSIZE; j++)
	{
		ctx.beginPath();
		ctx.moveTo(j * BOXSIZE, 0);
		ctx.lineTo(j * BOXSIZE, canvas.height);
		ctx.lineWidth = "1";
		ctx.stroke();
	}
}


// GO DO STUFF
drawGrid();
