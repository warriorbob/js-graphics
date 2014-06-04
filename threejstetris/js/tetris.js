if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
      window.setTimeout( callback, 1000 / 60 );
    };
  })();
}


var Tetris = {};

Tetris.init = function() {
  // set the scene size
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
 
  // set some camera attributes
  var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

  // create a WebGL renderer, camera
  // and a scene
  Tetris.renderer = new THREE.WebGLRenderer();
  Tetris.camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                  ASPECT,
                                  NEAR,
                                  FAR  );
  Tetris.scene = new THREE.Scene();

   // the camera starts at 0,0,0 so pull it back
  Tetris.camera.position.z = 600;
  Tetris.scene.add(Tetris.camera);

  // start the renderer
  Tetris.renderer.setSize(WIDTH, HEIGHT);

   // attach the render-supplied DOM element
  document.body.appendChild(Tetris.renderer.domElement);

  // configuration object
	var boundingBoxConfig = {
	  width: 360,
	  height: 360,
	  depth: 1200,
	  splitX: 6,
	  splitY: 6,
	  splitZ: 20
	};

	Tetris.boundingBoxConfig = boundingBoxConfig;
	Tetris.blockSize = boundingBoxConfig.width/boundingBoxConfig.splitX;

	var boundingBox = new THREE.Mesh(
 	 new THREE.CubeGeometry(
	    boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth, 
	    boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ), 
  	new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } )
);
Tetris.scene.add(boundingBox);

// first render
Tetris.renderer.render(Tetris.scene, Tetris.camera);

Tetris.stats = new Stats();
  Tetris.stats.domElement.style.position = 'absolute';
  Tetris.stats.domElement.style.top = '10px';
  Tetris.stats.domElement.style.left = '10px';
  document.body.appendChild( Tetris.stats.domElement );
   
  document.getElementById("play_button").addEventListener('click', function (event) {
    event.preventDefault();
    Tetris.start();
  });
};

Tetris.start = function() {
   document.getElementById("menu").style.display = "none";
   Tetris.pointsDOM = document.getElementById("points");
   Tetris.pointsDOM.style.display = "block";
 
   Tetris.animate();
};

Tetris.gameStepTime = 1000;
 
Tetris.frameTime = 0; // ms
Tetris.cumulatedFrameTime = 0; // ms
Tetris._lastFrameTime = Date.now(); // timestamp
 
Tetris.gameOver = false;

Tetris.animate = function() {
  var time = Date.now();
  Tetris.frameTime = time - Tetris._lastFrameTime;
  Tetris._lastFrameTime = time;
  Tetris.cumulatedFrameTime += Tetris.frameTime;
 
  while(Tetris.cumulatedFrameTime > Tetris.gameStepTime) {
    // block movement will go here
    Tetris.cumulatedFrameTime -= Tetris.gameStepTime;
  }
     
  Tetris.renderer.render(Tetris.scene, Tetris.camera);
     
  Tetris.stats.update();
     
  if(!Tetris.gameOver) window.requestAnimationFrame(Tetris.animate);
}




Tetris.staticBlocks = [];
Tetris.zColors = [
  0x6666ff, 0x66ffff, 0xcc68EE, 0x666633, 0x66ff66, 0x9966ff, 0x00ff66, 0x66EE33, 0x003399, 0x330099, 0xFFA500, 0x99ff00, 0xee1289, 0x71C671, 0x00BFFF, 0x666633, 0x669966, 0x9966ff
];
Tetris.addStaticBlock = function(x,y,z) {
  if(Tetris.staticBlocks[x] === undefined) Tetris.staticBlocks[x] = [];
  if(Tetris.staticBlocks[x][y] === undefined) Tetris.staticBlocks[x][y] = [];
 
  var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( Tetris.blockSize, Tetris.blockSize, Tetris.blockSize), [
    new THREE.MeshBasicMaterial({color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true}),
    new THREE.MeshBasicMaterial({color: Tetris.zColors[z]}) 
  ] );
     
  mesh.position.x = (x - Tetris.boundingBoxConfig.splitX/2)*Tetris.blockSize + Tetris.blockSize/2;
  mesh.position.y = (y - Tetris.boundingBoxConfig.splitY/2)*Tetris.blockSize + Tetris.blockSize/2;
  mesh.position.z = (z - Tetris.boundingBoxConfig.splitZ/2)*Tetris.blockSize + Tetris.blockSize/2;
  mesh.overdraw = true;
     
  Tetris.scene.add(mesh);   
  Tetris.staticBlocks[x][y][z] = mesh;
};

Tetris.currentPoints = 0;
Tetris.addPoints = function(n) {
  Tetris.currentPoints += n;
  Tetris.pointsDOM.innerHTML = Tetris.currentPoints;
  Cufon.replace('#points');
}

window.addEventListener("load", Tetris.init);