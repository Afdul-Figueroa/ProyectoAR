import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

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



    // Hacer transparente el fondo del canvas AR

    renderer.setClearColor(
        0x000000,
        0
    );



    // Luz para el modelo 3D

    const light = new THREE.HemisphereLight(
        0xffffff,
        0xbbbbff,
        1
    );

    scene.add(light);



    // Cargar modelo GLB

    const loader = new GLTFLoader();



    // Soporte para modelos comprimidos Draco

    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/v1/decoders/"
    );


    loader.setDRACOLoader(
        dracoLoader
    );



    let model;



    loader.load(

        "./models/proyecto.glb",


        (gltf) => {


            model = gltf.scene;


            model.scale.set(
                0.1,
                0.1,
                0.1
            );


            model.position.set(
                0,
                0,
                0
            );


            scene.add(model);



            console.log(
                "✅ Modelo cargado correctamente"
            );


        },


        undefined,


        (error) => {


            console.error(
                "❌ Error cargando modelo:",
                error
            );


        }

    );



    // Ancla al primer target del archivo .mind

    const anchor = mindarThree.addAnchor(0);



    // Iniciar cámara

    try {


        await mindarThree.start();


    } catch(error) {


        console.log(
            "No se pudo iniciar la cámara:",
            error
        );


    }



    renderer.setAnimationLoop(() => {


        renderer.render(
            scene,
            camera
        );


    });


};



start();