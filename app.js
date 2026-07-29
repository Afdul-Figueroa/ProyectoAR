import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js';


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



    const anchor = mindarThree.addAnchor(0);



    const loader = new GLTFLoader();


    loader.load(

        "./models/proyecto.glb",

        (gltf)=>{


            const model = gltf.scene;


            model.scale.set(
                0.05,
                0.05,
                0.05
            );


            model.position.set(
                0,
                0,
                0
            );


            // IMPORTANTE:
            // lo añadimos directamente a la escena

            scene.add(model);



            console.log(
                "MODELO EN ESCENA"
            );


        },

        undefined,


        (error)=>{

            console.log(
                error
            );

        }

    );



    await mindarThree.start();


    renderer.setAnimationLoop(()=>{

        renderer.render(
            scene,
            camera
        );

    });


};


start();