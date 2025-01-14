import * as THREE from 'https://twinex123.github.io/NSI/three.module.js';
import { OrbitControls } from 'https://twinex123.github.io/NSI/OrbitControls.js';
import { FBXLoader } from 'https://twinex123.github.io/NSI/FBXLoader.js';

// Initialisation de la scène, caméra et rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter un éclairage
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Contrôles de la caméra
const controls = new OrbitControls(camera, renderer.domElement);

// Charger le modèle FBX
const loader = new FBXLoader();
loader.load(
    './assets/city.fbx',
    (object) => {
        object.scale.set(0.1, 0.1, 0.1); // Ajustez l'échelle si nécessaire
        scene.add(object);
    },
    (xhr) => {
        console.log(`Chargement : ${(xhr.loaded / xhr.total) * 100}% terminé`);
    },
    (error) => {
        console.error('Erreur lors du chargement du modèle :', error);
    }
);

// Fonction de redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
