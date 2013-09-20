// Create canvas and such
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Some data
function shape () {
   this.centerX = 50;
   this.centerY = 50;
   this.angle = 0;
   this.pts = new Array(
	{ x: 10, y: 10 },
	{ x: 100, y: 10 },
	{ x: 100, y: 100 },
	{ x: 10, y: 100 }
   );
};

var square = new shape();

//----
//Framework functions
//----
var update = function(modifier) {
	square.pts[2].x -= modifier;
};

//This code from http://stackoverflow.com/a/6722031/380176
var resetGraphics = function() {
	ctx.save();
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
};

//----
//make-stuff-happen code
//----

var renderBox = function(shape) {
	if (ready)
	{
		ctx.beginPath();
		ctx.moveTo(shape.pts[0].x, shape.pts[0].y);
		for(i = 1; i < shape.pts.length; i++)
		{
			ctx.lineTo(shape.pts[i].x, shape.pts[i].y);
		}	
		ctx.lineTo(shape.pts[0].x, shape.pts[0].y);
		ctx.stroke();
		ctx.fillStyle = '#8ED6FF';
      ctx.fill();
		
	}
};

var main = function() {
	var now = Date.now();
	var delta = now - then;
	resetGraphics();
	update(delta / 1000);
	renderBox(square);
	then = now;
};

//off we go
var ready = true;
var then = Date.now();
setInterval(main,1);
