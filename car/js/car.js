// Paul Irish's cross-browser requestAnimationFrame shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//Set up canvas
canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var resetGraphics = function() {
   ctx.save();
   // Use the identity matrix while clearing the canvas
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.restore();

   //outline canvas
   	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(canvas.width,0);
	ctx.lineTo(canvas.width,canvas.height);
	ctx.lineTo(0,canvas.height);
	ctx.lineTo(0,0);
	ctx.stroke();
};


//--------------------------------------


var x = 0;
var y = 0;

drawSquare = function(x,y) {
	ctx.beginPath();
	ctx.moveTo(x+0,y+0);
	ctx.lineTo(x+100,y+0);
	ctx.lineTo(x+100,y+100);
	ctx.lineTo(x+0,y+100);
	ctx.lineTo(x+0,y+0);
	ctx.stroke();
}

var fps = 30;

function animate() {
	resetGraphics();
	drawSquare(x,y);
	x++;
	y++;

	setTimeout(function() {
		requestAnimFrame(animate);
	}, 1000 / fps);
}

animate();