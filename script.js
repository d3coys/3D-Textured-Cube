// Scene, Camera, and Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light source
const light = new THREE.PointLight(0xFFFFAA, 1);
light.position.set(-10, 10, 10);
scene.add(light);

// Texture Loader
const loader = new THREE.TextureLoader();

// Load textures
const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('images-1.jpg', checkTexture, handleError) }),
    new THREE.MeshBasicMaterial({ map: loader.load('images-2.jpeg', checkTexture, handleError) }),
    new THREE.MeshBasicMaterial({ map: loader.load('images-3.jpeg', checkTexture, handleError) }),
    new THREE.MeshBasicMaterial({ map: loader.load('images-4.jpeg', checkTexture, handleError) }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green color for top face
    new THREE.MeshBasicMaterial({ color: 0xff0000 })  // Red color for bottom face
];

// Callback function to check if the texture has loaded
function checkTexture(texture) {
    console.log(`Texture loaded: ${texture.image.src}`);
}

// Callback function to handle errors
function handleError(error) {
    console.error('An error occurred loading the texture:', error);
}

// Create a cube with different textures
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 5;

// Animation and rotation controls
let rotateSpeed = 0.01;
let rotateClockwise = true;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += rotateSpeed * (rotateClockwise ? 1 : -1);
    cube.rotation.y += rotateSpeed * (rotateClockwise ? 1 : -1);
    renderer.render(scene, camera);
}

// Event listener for mouse click to toggle rotation direction
document.addEventListener('click', () => {
    rotateClockwise = !rotateClockwise;
});

// Event listeners for arrow keys to control rotation speed and direction
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            rotateSpeed += 0.01; // Increase rotation speed
            break;
        case 'ArrowDown':
            rotateSpeed = Math.max(0.01, rotateSpeed - 0.01); // Decrease rotation speed, minimum 0.01
            break;
        case 'ArrowLeft':
            rotateClockwise = true; // Rotate clockwise
            break;
        case 'ArrowRight':
            rotateClockwise = false; // Rotate counterclockwise
            break;
    }
});

// Event listeners for touch events on mobile devices
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xStart = null;
let yStart = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xStart = firstTouch.clientX;
    yStart = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!xStart || !yStart) {
        return;
    }

    const xEnd = event.touches[0].clientX;
    const yEnd = event.touches[0].clientY;

    const xDiff = xStart - xEnd;
    const yDiff = yStart - yEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Horizontal swipe
        if (xDiff > 0) {
            rotateClockwise = false; // Swipe left
        } else {
            rotateClockwise = true; // Swipe right
        }
    } else {
        // Vertical swipe
        if (yDiff > 0) {
            rotateSpeed = Math.max(0.01, rotateSpeed - 0.01); // Swipe up
        } else {
            rotateSpeed += 0.01; // Swipe down
        }
    }

    xStart = null;
    yStart = null;
}

animate();
