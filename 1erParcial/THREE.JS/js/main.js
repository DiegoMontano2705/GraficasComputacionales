import * as THREE from 'https://unpkg.com/three/build/three.module.js'; // in case you install THREE.Js change Path
import {OrbitControls} from '/js/jsm/controls/OrbitControls.js';
"using strict";

let renderer,scene,camera, mesh

function init(){
  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("red");  // renderer.setClearColor(new THREE.Color(0,0,0));  to use RGB
  document.body.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();
  
  // Virtual Camera
  let fov = 60;
  let aspect = window.innerWidth / window.innerHeight;
  let near = 0.1;
  let far = 10000;
  camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.set(0,0,3);

  // Models
  let geometry = new THREE.BoxGeometry();
  let material = new THREE.MeshBasicMaterial({color: "blue" ,wireframe: true});
  mesh = new THREE.Mesh(geometry,material);

  // Scene Hierarchy/Graph

  // Render Loop
  renderLoop();

}

function renderLoop(){
  // Draw Scene
  renderer.render(scene,camera);
  updateScene();
  requestAnimationFrame(renderLoop);
}

function updateScene(){
  mesh.rotation.y = mesh.rotation.y + 1 + Math.PI / 180;
}

// Event Listeners/Handlers
document.addEventListener("DOMContentLoaded",init);
window.addEventListener("resize",function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
