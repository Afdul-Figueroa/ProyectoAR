import * as THREE from "three";

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



    // quitar fondo blanco

    renderer.setClearColor(
        0x000000,
        0
    );


    // luz

    const light = new THREE.HemisphereLight(
        0xffffff,
        0xffffff,
        1
    );

    scene.add(light);



    // cubo de prueba

    const geometry = new THREE.BoxGeometry(
        0.5,
        0.5,
        0.5
    );


    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });


    const cube = new THREE.Mesh(
        geometry,
        material
    );


    cube.position.z = -1;


    scene.add(cube);



    await mindarThree.start();



    renderer.setAnimationLoop(() => {


        renderer.render(
            scene,
            camera
        );


    });


};


start();