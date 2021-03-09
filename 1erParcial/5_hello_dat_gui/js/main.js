import * as THREE from '/1erParcial/5_hello_dat_gui/build/three.module.js';
import {OrbitControls} from '/1erParcial/5_hello_dat_gui/js/jsm/controls/OrbitControls.js';
import Stats from '/1erParcial/5_hello_dat_gui/js/jsm/libs/stats.module.js';

"using strict";

let renderer, scene, camera, cameraControl, mesh, stats;

function init() {
    // RENDERER
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(new THREE.Color(0.2, 0.2, 0.35));
    document.body.appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    let fov = 60;
    let aspect = window.innerWidth / window.innerHeight;
    let near = 0.1;
    let far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 3);
    cameraControl = new OrbitControls(camera, renderer.domElement);

    // MODELS
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({color: "white", wireframe: true});
    mesh = new THREE.Mesh(geometry, material);

    // SCENE GRAPH
    scene.add(mesh);

    //GUI
    let gui = dat.GUI();

    //Model
    let model={
        x: mesh.position.x
    };

    //View
    let sliderPosX = gui.add(model,"x").min(-5).max(5);
    let sliderPosY = gui.add(mesh.rotation)

    // Controller
    sliderPosX.OnChange(function(){
        console.log(value);
    });

            
    // STATS
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // RENDER LOOP
    renderLoop();
}

function renderLoop() {
    stats.begin();
    renderer.render(scene, camera); // DRAW SCENE
    updateScene();
    stats.end();
    stats.update();
    requestAnimationFrame(renderLoop);
}

function updateScene() {
    
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});