// Create canvas and such
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var CANVAS_WIDTH = 512;
var CANVAS_HEIGHT = 480;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
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
//---------------

//Constants
var NUM_LAYERS = 6;
var STARS_PER_LAYER = 80;
var DRIFT_PPS = -120;

function star(x,y,radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
}
 
//Create star layers as arrays
var starlayers = new Array(NUM_LAYERS);
for(var i = 0; i < starlayers.length; i++){
	starlayers[i] = [];
}

//For each layer, fill it with random stars
for(var l = 0; l < starlayers.length; l++){
	for(var s = 0; s < STARS_PER_LAYER; s++){
		starlayers[l].push(
			new star(
				Math.floor(Math.random() * 512 + 1),	//X
				Math.floor(Math.random() * 480 + 1),	//Y 
				1 / (l+1)	//Radius (also: Hasty math)
			)
		);
	}
}

var update = function(modifier) {
	//Move stars in each layer
	for(var l = 0; l < starlayers.length; l++){
		for(var s = 0; s < starlayers[l].length; s++){
			starlayers[l][s].x += modifier * DRIFT_PPS * 1/(l+1);	//Hasty math
		}
	}

	//Disappear offscreen stars and reappear them on the other side
	for(var l = 0; l < starlayers.length; l++){
		for(var s = 0; s < starlayers[l].length; s++){
			if(starlayers[l][s].x < 0){
				starlayers[l][s].x += CANVAS_WIDTH;
			} else if(starlayers[l][s].x > CANVAS_WIDTH){
				starlayers[l][s].x -= CANVAS_WIDTH;
			}			
		}
	}
};

var draw = function(){
	for(var l = 0; l < starlayers.length; l++){
		for(var s = 0; s < starlayers[l].length; s++){
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(starlayers[l][s].x, starlayers[l][s].y, starlayers[l][s].radius, 0, Math.PI * 2, false);
			ctx.fill();
		}
	}
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
