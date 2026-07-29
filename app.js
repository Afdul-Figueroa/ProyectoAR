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



    // Fondo transparente para que se vea la cámara

    renderer.setClearColor(
        0x000000,
        0
    );


    // Luz

    const light = new THREE.HemisphereLight(
        0xffffff,
        0xbbbbbb,
        2
    );

    scene.add(light);



    // Crear ancla del plano

    const anchor = mindarThree.addAnchor(0);



    anchor.onTargetFound = () => {

        console.log("🎯 PLANO DETECTADO");

    };


    anchor.onTargetLost = () => {

        console.log("❌ PLANO PERDIDO");

    };



    // Cargar modelo

    const loader = new GLTFLoader();



    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/v1/decoders/"
    );


    loader.setDRACOLoader(
        dracoLoader
    );



    loader.load(

        "./models/proyecto.glb",


        (gltf) => {


            const model = gltf.scene;


            // Ajusta aquí el tamaño de la vivienda

            model.scale.set(
                0.1,
                0.1,
                0.1
            );


            // Posición sobre el plano

            model.position.set(
                0,
                0,
                0
            );


            anchor.group.add(model);



            console.log(
                "✅ MODELO CARGADO"
            );


        },


        undefined,


        (error) => {

            console.error(
                "❌ Error modelo:",
                error
            );

        }


    );



    // Iniciar MindAR

    try {


        await mindarThree.start();


        console.log(
            "✅ MindAR iniciado"
        );


    } catch(error) {


        console.error(
            "❌ Error cámara:",
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