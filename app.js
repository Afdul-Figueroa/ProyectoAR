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



    // Luz para iluminar la vivienda

    const light = new THREE.HemisphereLight(
        0xffffff,
        0xbbbbff,
        1
    );

    scene.add(light);



    // Cargar modelo GLB

    const loader = new GLTFLoader();



    // Activar soporte Draco

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



            // Escala inicial del modelo

            model.scale.set(
                0.1,
                0.1,
                0.1
            );



            // Posición inicial

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



    // Punto donde aparecerá el modelo

    mindarThree.addAnchor(0);



    // Iniciar cámara AR

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