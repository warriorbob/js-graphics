// Create canvas and such
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Some data
var pt1 = { x: 10, y: 10 };
var pt2 = { x: 100, y: 10 };
var pt3 = { x: 100, y: 100 };
var pt4 = { x: 10, y: 100 };

var render = function() {
	if (ready)
	{
		ctx.beginPath();
		ctx.moveTo(pt1.x, pt1.y);
		ctx.lineTo(pt2.x, pt2.y);
		ctx.lineTo(pt3.x, pt3.y);
		ctx.lineTo(pt4.x, pt4.y);
		ctx.lineTo(pt1.x, pt1.y);
		ctx.stroke();
		ctx.fillStyle = '#8ED6FF';
      ctx.fill();
		
	}
};

var main = function() {
	var now = Date.now();
	var delta = now = then;
	render();
	then = now;
};

//off we go
var ready = true;
var then = Date.now();
main();
