import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';

import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';


export const player = (() => {

  class Player {
    constructor(params) {
      this.position_ = new THREE.Vector3(0, 0, 0);
      this.velocity_ = 0.0;

      // this.mesh_ = new THREE.Mesh(
      //     new THREE.BoxBufferGeometry(1, 1, 1),
      //     new THREE.MeshStandardMaterial({
      //         color: 0x80FF80,
      //     }),
      // );
      // this.mesh_.castShadow = true;
      // this.mesh_.receiveShadow = true;
      // params.scene.add(this.mesh_);

      this.playerBox_ = new THREE.Box3();

      this.params_ = params;

      this.LoadModel_();
      this.InitInput_();
    }

    LoadModel_() {
      const loader = new FBXLoader();
      loader.setPath('./resources/Dinosaurs/FBX/'); // nicher value-'Parasaurolophus.fbx'
        loader.load(dinoModel, (fbx) => {
          fbx.scale.setScalar(0.0025); //model er size or scale thik krteci jate scene e fit hoite pare
          fbx.quaternion.setFromAxisAngle(
              new THREE.Vector3(0, 1, 0), Math.PI / 2); //model tar angle thik krtechi 
  
          this.mesh_ = fbx;
          this.params_.scene.add(this.mesh_); // scene e model tare add krci ei function dia
  
          fbx.traverse(c => {
            let materials = c.material;
            if (!(c.material instanceof Array)) {
              materials = [c.material];
            }
    
            for (let m of materials) {
              if (m) {
                m.specular = new THREE.Color(0x000000);
                m.color.offsetHSL(0, 0, 0.25);
              }
            }    
            c.castShadow = true;
            c.receiveShadow = true;
          });
            // ei jaigai  oi model er property traverse kre shadow property r find out krci ar model tar color adjust krci . then shadow ta true kre dici.
          const m = new THREE.AnimationMixer(fbx);
          this.mixer_ = m;
  
          for (let i = 0; i < fbx.animations.length; ++i) {
            if (fbx.animations[i].name.includes('Run')) {
              const clip = fbx.animations[i];
              const action = this.mixer_.clipAction(clip);
              action.play();
            }
          }
        });

      





    }
// ei khane  managing and blending er animation er setup kra hoiche . amra eikne model tar jonno avaiable animation ki ache oita iterate kre jei animation e run ache mane model running obosthai jei jei animation ace oita find out kre . running er somoi animation add  kreci.

//In summary, the LoadModel_() method loads the player's 3D model, sets its scale and orientation, adds it to the scene, configures material properties, enables shadows, and sets up animation for the running action.
    InitInput_() {
      this.keys_ = {
          spacebar: false,
      };
      this.oldKeys = {...this.keys_};

      document.addEventListener('keydown', (e) => this.OnKeyDown_(e), false);
      document.addEventListener('keyup', (e) => this.OnKeyUp_(e), false);
    }
    //In summary, the InitInput_() method initializes the tracking of keyboard input for the player character. It sets up event listeners for keydown and keyup events and associates them with methods that handle these events. The keys_ object is used to track the current state of specific keys, while the oldKeys object retains the key states from the previous frame for comparison.

    OnKeyDown_(event) {
      switch(event.keyCode) {
        case 32:
          this.keys_.space = true;
          break;
      }
    }
    //ei function ta check diteche je space press kra hoice ki na . kora hoile value tare true kre dei.

    OnKeyUp_(event) {
      switch(event.keyCode) {
        case 32:
          this.keys_.space = false;
          break;
      }
    }
//space cara hoile value tare false kre dei .
    CheckCollisions_() {
      const colliders = this.params_.world.GetColliders();
      //word.js file theke joto doroner collider ace sobaire ei variable store kre .

      this.playerBox_.setFromObject(this.mesh_);
      //The method uses the setFromObject() function of the playerBox_ to update the bounding box of the player's 3D model (this.mesh_). The bounding box represents the volume occupied by the player character.

      for (let c of colliders) {
        const cur = c.collider;

        if (cur.intersectsBox(this.playerBox_)) {
          this.gameOver = true;
        }
      }
      //The method iterates through each collider in the colliders array. For each collider, it checks if it intersects with the player's bounding box using the intersectsBox() method.If the player's bounding box intersects with the collider, it means that a collision has occurred.    In that case, the gameOver property of the player instance is set to true. 

    }

    Update(timeElapsed) {
      if (this.keys_.space && this.position_.y == 0.0) {
        this.velocity_ = 30;
      }

      const acceleration = -75 * timeElapsed;
      //The variable acceleration is calculated as a negative value to simulate the effect of gravity.

      this.position_.y += timeElapsed * (
          this.velocity_ + acceleration * 0.5);
      this.position_.y = Math.max(this.position_.y, 0.0);

      this.velocity_ += acceleration;
      this.velocity_ = Math.max(this.velocity_, -100);

      if (this.mesh_) {
        this.mixer_.update(timeElapsed);
        this.mesh_.position.copy(this.position_);
        this.CheckCollisions_();
      }
    }
  };

  return {
      Player: Player,
  };
})();

let gameMood;
let selectedDino;
let dinoModel;
let dayButton=document.getElementById("dayButton");
let nightButton=document.getElementById("nightButton");
// let dinoModel_parasaurolophus=document.getElementById("parasaurolophus");
// let dinoModel_triceratops=document.getElementById("triceratops");
// let dinoModel_stegosaurus=document.getElementById("stegosaurus");
// let dinoModel_trex=document.getElementById("trex");
// let dinoModel_velociraptor=document.getElementById("velociraptor");

const btn = document.querySelectorAll('.box-button');

btn.forEach(button => {
    button.addEventListener('click', () => {
      selectedDino=button.value;
      console.log(`your dinosaur is : ${selectedDino}`);
      dinoModel=`${selectedDino}.fbx`;
      console.log(`your selected dinomodel is : ${dinoModel}`);
    });
});


dayButton.addEventListener('click',function(){
  console.log("yes man. you pressed the day button .");
  gameMood=1;
  console.log(gameMood);
});
nightButton.addEventListener('click',function(){
  console.log("yoo boi. you are naughty. clicked the night button");
  gameMood=0;
  console.log(gameMood);
 });