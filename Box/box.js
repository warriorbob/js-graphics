// Create canvas and such
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//----
//Framework functions
//----

//Math!
var sign = function(x) {
	return x > 0 ? 1 : x < 0 ? -1 : 0;
}

var updateShapePoints = function(shape) {
   var arc = 2 * Math.PI / shape.numPoints;
   for(i=0; i < shape.numPoints; i++)
   {
      shape.pts[i] = {
         x: shape.rho * Math.cos(i * arc + shape.rot) + shape.center.x, 
         y: shape.rho * Math.sin(i * arc + shape.rot) + shape.center.y
      };
   }
};

var collide = function(shape, modifier) {
	var foundCollision = false;
	for(i=0;i<shape.pts.length;i++)
	{
		var offsetVector = { 
			xoff: shape.center.x - shape.pts[i].x,
			yoff: shape.center.y - shape.pts[i].y,
		}
		if(shape.pts[i].x <=0)
		{
			shape.vector.x = -shape.vector.x;
			shape.center.x += -shape.pts[i].x;
			shape.rotSpeedRatio = Math.abs(shape.rotSpeedRatio) * sign(offsetVector.yoff);
			foundCollision = true;
		}
		else if(shape.pts[i].x >= canvas.width)
		{
			shape.vector.x = -shape.vector.x;
			shape.center.x -= (shape.pts[i].x - canvas.width);
			shape.rotSpeedRatio = Math.abs(shape.rotSpeedRatio) * -sign(offsetVector.yoff);
			foundCollision = true;
		}	
		if(shape.pts[i].y <=0)
		{
			shape.vector.y = -shape.vector.y;
			shape.center.y += -shape.pts[i].y;
			shape.rotSpeedRatio = Math.abs(shape.rotSpeedRatio) * -sign(offsetVector.xoff);
			foundCollision = true;
		}
		else if(shape.pts[i].y >= canvas.height)
		{
			shape.vector.y = -shape.vector.y;
			shape.center.y -= (shape.pts[i].y - canvas.height);
			shape.rotSpeedRatio = Math.abs(shape.rotSpeedRatio) * sign(offsetVector.xoff);
			foundCollision = true;
		}
	}
	if(foundCollision)
	{
		//shape.rotSpeedRatio = -shape.rotSpeedRatio;
	}
};

var update = function(shape, modifier) {
   shape.rot += Math.PI / 2 * modifier * shape.rotSpeedRatio
	shape.center.x += shape.vector.x * modifier;
	shape.center.y += shape.vector.y * modifier;
   updateShapePoints(shape);

	collide(shape, modifier);
};

//This code from http://stackoverflow.com/a/6722031/380176
var resetGraphics = function() {
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

//----
//make-stuff-happen code
//----

var main = function() {
	var now = Date.now();
	var delta = now - then;
	resetGraphics();
	update(square, delta / 1000);
	renderBox(square);
	then = now;
};

//Some data
function shape (numPoints) {
   this.center = { x: 150, y: 200 };
	this.vector = { x: -100, y: 100 };
   this.rot = 0;
	this.rotSpeedRatio = 1;
   this.rho = 72;
   this.numPoints = numPoints;
   this.pts = new Array()
};

//Initialize a square (for now)
var square = new shape(4);
var arc = 2 * Math.PI / square.numPoints;
updateShapePoints(square);

//off we go
var ready = true;
var then = Date.now();
setInterval(main,1);
