// Scene, Camera, and Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light source
const light = new THREE.PointLight(0xFFFFFF, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Texture Loader
const loader = new THREE.TextureLoader();

// Load textures
const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('images-1.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('images-2.jpeg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('iamges-3.jpeg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('images-4.jpeg') }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green color for top face
    new THREE.MeshBasicMaterial({ color: 0xff0000 })  // Red color for bottom face
];

// Create a cube with different textures
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 5;

// Animation and rotation controls
let rotateClockwise = true;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01 * (rotateClockwise ? 1 : -1);
    cube.rotation.y += 0.01 * (rotateClockwise ? 1 : -1);
    renderer.render(scene, camera);
}

// Event listener for mouse click to toggle rotation direction
document.addEventListener('click', () => {
    rotateClockwise = !rotateClockwise;
});

animate();
