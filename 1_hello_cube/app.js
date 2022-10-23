import * as THREE from 'three';
import { OrbitControls } from '../../libs/three140/examples/jsm/controls/OrbitControls.js';

class App{
    constructor(){
        const container = document.createElement('div');
        document.body.appendChild( container );
    
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 0, 4);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xeeeeee );
        
        const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( ambientLight );

        const directionalLight = new THREE.DirectionalLight( 0xff0000, 1);
        directionalLight.position.set(0.2, 1, 1);
        this.scene.add(directionalLight);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild( this.renderer.domElement )
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({color: 0xff0000});

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        const controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.renderer.setAnimationLoop(this.render.bind(this));
    
        window.addEventListener('resize', this.resize.bind(this));
    
    }

    greet(){
        console.log("Hello Three.js")
    }

    render(){
        this.mesh.rotateY(0.1);
        this.renderer.render(this.scene, this.camera);
    }

    resize(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth/ window.innerHeight
        this.camera.updateProjectionMatrix();
    }
}

export {App};