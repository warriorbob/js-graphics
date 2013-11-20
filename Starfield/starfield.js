// Create canvas and such
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Capture keyboard input
var keysDown = { };

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

//Math!
var sign = function(x) {
	return x > 0 ? 1 : x < 0 ? -1 : 0;
}

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

//---------------
//Interesting stuff

function star(x,y,radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
}
 
var stars = [];
stars.push(new star(256, 240, 10));

var update = function(modifier) {
};

var draw = function(){
	for(var i = 0; i < stars.length; i++){
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(stars[i].x, stars[i].y, stars[i].radius, 0, Math.PI * 2, false);
		ctx.fill();
	}
};

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
