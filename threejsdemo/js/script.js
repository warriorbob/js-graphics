var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

var geometry = new THREE.BoxGeometry(100,100,100);
var material = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('http://www.html5canvastutorials.com/demos/assets/crate.jpg')
});
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 200;

function render() {
	requestAnimationFrame(render);
	cube.rotation.x -= 0.01;
	cube.rotation.y -= 0.005;
	renderer.render(scene, camera);
}
render();