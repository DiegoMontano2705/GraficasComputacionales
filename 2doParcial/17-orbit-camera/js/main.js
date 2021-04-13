/*
Individualmente, implementar una app THREEJS que permita al usuario iniciar, detener y resetear la orbitación de una cámara alrededor de un objeto situado en el origen coordenado

Pueden usar como punto de partida el archivo: 17-orbit-camera  localizado en el drive compartido del curso 
*/
import * as THREE from '/2doParcial/17-orbit-camera/build/three.module.js';
import {OrbitControls} from '/2doParcial/17-orbit-camera/js/jsm/controls/OrbitControls.js';
import Stats from '/2doParcial/17-orbit-camera/js/jsm/libs/stats.module.js';
import dat from '/2doParcial/17-orbit-camera/js/jsm/libs/dat.gui.module.js';

"using strict";

let renderer, scene, camera, cameraControl, mesh, stats, params;

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
    let geometry = new THREE.ConeGeometry();
    let material = new THREE.MeshBasicMaterial({color: "yellow", wireframe: false});
    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "Cube";
    mesh.position.set(0, 0.5, 0);

     // WORLD AXES
     let worldAxes = new THREE.AxesHelper(10);

    // SCENE GRAPH
    scene.add(mesh);
    scene.add(worldAxes);

    // GUI
    let gui = new dat.GUI();

     // SHOW/HIDE WORLD-AXES
     gui.add(worldAxes, "visible").name("World Axes").setValue(false).listen().onChange(function(value) {
 
     });

     

     // SHOW/HIDE WORLD-AXES
     params =  {
         rotOn: false,
         play: function() {
            console.log("play");
            params.rotOn = true;
         },
         stop: function() {

            console.log("stop");
            params.rotOn = false;
        },
        home: function() {
            camera.position.set(0, 0, 3);
            camera.lookAt(scene.position);
            console.log("home");
        }
         
     };
     
    gui.add(params, "play").name("ORBIT").listen().onChange(function(value) {
        
    });
    gui.add(params, "stop").name("STOP").listen().onChange(function(value) {
        

    });
    gui.add(params, "home").name("HOME").listen().onChange(function(value) {
 

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

let rotSpeed = 0.02;

function updateScene() {

    if(params.rotOn){
        let x = camera.position.x,
        y = camera.position.y,
        z = camera.position.z;
        camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
        camera.lookAt(scene.position);
    }
    
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


class Floor extends THREE.Mesh {
    constructor() {
        super();
        this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
        this.material = new THREE.MeshBasicMaterial();
        this.rotation.x = -0.5 * Math.PI;
        this.wireframeHelper = new THREE.LineSegments(new THREE.WireframeGeometry(this.geometry));
        this.wireframeHelper.material.color = new THREE.Color(0.2, 0.2, 0.2);
        this.add(this.wireframeHelper);
        this.visible = false;
    }
}