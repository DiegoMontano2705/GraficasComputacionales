import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/js/jsm/controls/OrbitControls.js';
import Stats from '/js/jsm/libs/stats.module.js';
import dat from '/js/jsm/libs/dat.gui.module.js';

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
    mesh.name = "Cube";

    // SCENE GRAPH
    scene.add(mesh);

    // GUI
    let gui = new dat.GUI();

    // model
    let listColors = ["White", "Red", "Blue"];
    let model = {
        rotY: mesh.rotation.y * 180 / Math.PI,
        posHome: function() {
            mesh.position.x = 0;
            model.rotY = 0;
            mesh.rotation.y = model.rotY;
        },
        listColors,
        defaultItem: listColors[0],
        colorPalette: [255, 255, 255]
    }
    // view & controller

    // General menu
    let generalMenu = gui.addFolder("General Menu");
    // TextField Model Name
    let tfMeshName = generalMenu.add(mesh, "name").name("Model's Name").onChange(function(value) {

    }).onFinishChange(function(value) {
        console.log(mesh.name);
    });
    generalMenu.open();

    // Position Menu
    let posMenu = gui.addFolder("Model's Position Menu");
    //posMenu.open();
    //Model Position
    let sliderPosX = posMenu.add(mesh.position, "x").min(-5).max(5).step(0.5).name("X").listen().onChange(function(value) {

    });
    // Button Position Home
    let btnPosHome = posMenu.add(model, "posHome").name("HOME");

    // Rotation Menu
    let rotMenu = gui.addFolder("Model's Rotation Menu");
    // Model Orientation
    let sliderRotY = rotMenu.add(model, "rotY").min(-180).max(180).step(5).name("Y (deg)").listen().onChange(function(value) {
        mesh.rotation.y = value * Math.PI / 180;
    });

    // Model's Appearance Menu
    let appearMenu = gui.addFolder("Model's Appeareance Menu");
    // Model Draw Mode
    let chbWireframe = appearMenu.add(mesh.material, "wireframe").setValue(true).name("Wireframe").onChange(function(value) {
        
    });
    let listColor = appearMenu.add(model, "defaultItem", model.listColors).name("Color List").onChange(function(item) {
        mesh.material.color = new THREE.Color(item.toLowerCase());
        model.colorPalette = [mesh.material.color.r * 255, mesh.material.color.g * 255, mesh.material.color.b * 255];
    });
    let colorPalette = appearMenu.addColor(model, "colorPalette").name("Color Palette").listen().onChange(function(color) {
        mesh.material.color = new THREE.Color(color[0]/255, color[1]/255, color[2]/255);
    });

    gui.close();

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