import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js";


const start = async () => {


    const mindarThree = new MindARThree({

        container: document.querySelector("#ar-container"),

        imageTargetSrc: "./targets/plano.mind"

    });


    const {
        renderer,
        scene,
        camera
    } = mindarThree;



    renderer.setClearColor(
        0x000000,
        0
    );


    const light = new THREE.HemisphereLight(
        0xffffff,
        0xffffff,
        2
    );

    scene.add(light);



    // ANCLA AL PLANO

    const anchor = mindarThree.addAnchor(0);



    // CUBO DE PRUEBA

    const geometry = new THREE.BoxGeometry(
        0.3,
        0.3,
        0.3
    );


    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });


    const cube = new THREE.Mesh(
        geometry,
        material
    );


    cube.position.set(
        0,
        0,
        0
    );


    anchor.group.add(cube);



    anchor.onTargetFound = () => {

        console.log("🎯 PLANO ENCONTRADO");

    };


    anchor.onTargetLost = () => {

        console.log("❌ PLANO PERDIDO");

    };



    await mindarThree.start();



    renderer.setAnimationLoop(()=>{


        renderer.render(
            scene,
            camera
        );


    });


};


start();