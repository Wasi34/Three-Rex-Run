import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.122/build/three.module.js';

import { math } from './math.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.122/examples/jsm/loaders/GLTFLoader.js';


export const background = (() => {

  class BackgroundCloud {
    constructor(params) {
      this.params_ = params;
      this.position_ = new THREE.Vector3();
      this.quaternion_ = new THREE.Quaternion();//Quaternion is used to represent rotations in Three.js, and this property is used to store the rotation of the object.
      this.scale_ = 1.0;
      this.mesh_ = null;
      //The mesh_ property will be used to store the Three.js mesh of the loaded 3D model.

      this.LoadModel_();
    }

    LoadModel_() {
      const loader = new GLTFLoader(); //gltf model load neyar jonno ei class ta call kora hoi
      loader.setPath('./resources/Clouds/GLTF/');
      loader.load('Cloud' + math.rand_int(1, 3) + '.glb', (glb) => {
        this.mesh_ = glb.scene; //ei mesh e amra model ta load korlam.
        this.params_.scene.add(this.mesh_);//ei jaigai ei cloud model ta amra scene e add korlam.

        this.position_.x = math.rand_range(0, 2000);
        this.position_.y = math.rand_range(100, 200);
        this.position_.z = math.rand_range(500, -1000);
        //scene e model tar positon ki hoibo eita bole dici amra.
        this.scale_ = math.rand_range(10, 20);
        //model mane cloud tar size ki hoibo eita eikne kra hoice . randomly size select hoite thkbo 10 theke 20 er modde.

        const q = new THREE.Quaternion().setFromAxisAngle( //ei method ta call kora hoice to set a rotation based on an axis and an agle
            new THREE.Vector3(0, 1, 0), math.rand_range(0, 360));//This part generates a random angle in degrees between 0 and 360. This angle determines the amount of rotation around the specified axis.
        this.quaternion_.copy(q);

        //Certainly! This code is responsible for generating a quaternion that represents a rotation around a specified axis and then applying that quaternion rotation to the object.


        this.mesh_.traverse(c => {
          if (c.geometry) {
            c.geometry.computeBoundingBox(); // ei cloud model tar bounding box ber krteche
          }

          let materials = c.material;
          if (!(c.material instanceof Array)) {
            materials = [c.material];
          }
  
          for (let m of materials) {
            if (m) {
              m.specular = new THREE.Color(0x000000);//This line sets the specular color of the material to black (0x000000), essentially turning off any shininess or reflection highlights.
              m.emissive = new THREE.Color(0xC0C0C0);
              //This line sets the emissive color of the material to a light gray (0xC0C0C0), which can give the material a faint self-illumination effect.
            }
          }    
          c.castShadow = true; //object tar shadow true kre dici jate shadow deka jai.
          c.receiveShadow = true;
          //onno object er shadow o jate ei object e pore eijnno eitake true kre dici.
        });
      });
    }

    Update(timeElapsed) {
      if (!this.mesh_) {
        return;
      }

      this.position_.x -= timeElapsed * 10; //eikne timeElapsed hocce which represents the time passed since the last frame .
      if (this.position_.x < -100) {
        this.position_.x = math.rand_range(2000, 3000);
        // cloud tar position jdi -100 er kome e cole jai thaole eitar position abr initialize hobe 2000 theke 3000 er modde r kono value dia.
      }

      this.mesh_.position.copy(this.position_);
      this.mesh_.quaternion.copy(this.quaternion_);
      this.mesh_.scale.setScalar(this.scale_);
    }
    //This method is responsible for updating the state of the background object over time, typically during each frame of the animation or simulation.
  };

  class BackgroundCrap {
    constructor(params) {
      this.params_ = params;
      this.position_ = new THREE.Vector3();
      this.quaternion_ = new THREE.Quaternion();
      this.scale_ = 1.0;
      this.mesh_ = null;

      this.LoadModel_();
    }

    LoadModel_() {
    //   const assets = [
    //     ['SmallPalmTree.glb', 'PalmTree.png', 3],
    //     ['BigPalmTree.glb', 'PalmTree.png', 5],
    //     ['Skull.glb', 'Ground.png', 1],
    //     ['Scorpion.glb', 'Scorpion.png', 1],
    //     ['Pyramid.glb', 'Ground.png', 40],
    //     ['Monument.glb', 'Ground.png', 10],
    //     ['Cactus1.glb', 'Ground.png', 5],
    //     ['Cactus2.glb', 'Ground.png', 5],
    //     ['Cactus3.glb', 'Ground.png', 5],
    // ];

      // const assets = [
      //     ['SmallPalmTree.glb', 'PalmTree.png', 3],
      //     ['BigPalmTree.glb', 'PalmTree.png', 5],
      //     ['Skull.glb', 'Ground.png', 1],
      //     ['Scorpion.glb', 'Scorpion.png', 1],
      //     ['BushBerries_1.glb', 'Ground.png', 1],
      //     ['Monument.glb', 'Ground.png', 10],
      //     ['Cactus1.glb', 'Ground.png', 5],
      //     ['Cactus2.glb', 'Ground.png', 5],
      //     ['Cactus3.glb', 'Ground.png', 5],
      //     ['Bones.glb', 'Ground.png', 5]
      // ];


      const assets = [
        ['SmallPalmTree.glb', 'PalmTree.png', 3],
        ['Bamboo_1.glb', 'PalmTree.png', 5],
        ['Skull.glb', 'Ground.png', 1],
        ['Cactus1.glb', 'Ground.png', 5],
        ['Cactus3.glb', 'Ground.png', 5]
        ['Scorpion.glb', 'Scorpion.png', 1],
        ['Pyramid.glb', 'Ground.png', 40]
        ['BushBerries_1.glb', 'Ground.png', 1],
        ['Bamboo_1.glb', 'Ground.png', 10],
        ['Bamboo_1.glb', 'Ground.png', 1],
        ['Cactus2.glb', 'Ground.png', 5],
        ['Bamboo_1.glb', 'Ground.png', 1],
        ['Bones.glb', 'Ground.png', 5],
        ['BigPalmTree.glb', 'PalmTree.png', 5],
        ['Cactus1.glb', 'Ground.png', 5],
        ['Cactus3.glb', 'Ground.png', 5]
    ];



      const [asset, textureName, scale] = assets[math.rand_int(0, assets.length - 1)];

      const texLoader = new THREE.TextureLoader();//a class provided by the Three.js library that's used to load texture images.
      const texture = texLoader.load('./resources/DesertPack/Blend/Textures/' + textureName);
      texture.encoding = THREE.sRGBEncoding;//This line sets the encoding of the loaded texture to THREE.sRGBEncoding. This is important for correctly interpreting and displaying the texture colors in a standard color space.

      const loader = new GLTFLoader();
      loader.setPath('./resources/DesertPack/GLTF/');
      loader.load(asset, (glb) => {
        this.mesh_ = glb.scene; // ei line tai amra amder loaded gltfl model ta dekte kmn eita ar scene ei mes er modde assign krci 
        this.params_.scene.add(this.mesh_);//This is what actually places the 3D object within the Three.js scene.

        this.position_.x = math.rand_range(0, 2000);
        this.position_.z = math.rand_range(500, -1000);
        this.scale_ = scale;

        const q = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0), math.rand_range(0, 360));//A quaternion q is created using the THREE.Quaternion().setFromAxisAngle method. This quaternion represents a rotation around the y-axis (0, 1, 0) by a random angle in the range of 0 to 360 degrees.
        this.quaternion_.copy(q);

        this.mesh_.traverse(c => {
          let materials = c.material;
          if (!(c.material instanceof Array)) {
            materials = [c.material];
          } // ei condition ta check kre je 3d model tar jei property gola ache tar modde konta array ar konta single material property
  
          for (let m of materials) {
            if (m) {
              if (texture) {
                m.map = texture;// This essentially applies the texture to the material, giving the object a textured appearance.
              }
              m.specular = new THREE.Color(0x000000);
              //This line sets the specular color of the material to black (0x000000). Specular color affects how light reflects off the material's surface. Here, it's being set to black, which will typically result in a non-glossy appearance.
            }
          }    
          c.castShadow = true;
          c.receiveShadow = true;
        });
      });
    }

    Update(timeElapsed) {
      if (!this.mesh_) {
        return;
      }

      this.position_.x -= timeElapsed * 10;
      if (this.position_.x < -100) {
        this.position_.x = math.rand_range(2000, 3000);
      }

      this.mesh_.position.copy(this.position_);
      this.mesh_.quaternion.copy(this.quaternion_);
      this.mesh_.scale.setScalar(this.scale_);
    }
  };

  class Background {
    constructor(params) {
      this.params_ = params;
      this.clouds_ = [];
      this.crap_ = [];

      this.SpawnClouds_();
      this.SpawnCrap_();
    }

    SpawnClouds_() {
      for (let i = 0; i < 25; ++i) {
        const cloud = new BackgroundCloud(this.params_);

        this.clouds_.push(cloud);
      }
    }

    SpawnCrap_() {
      for (let i = 0; i < 50; ++i) {
        const crap = new BackgroundCrap(this.params_);

        this.crap_.push(crap);
      }
    }

    Update(timeElapsed) {
      for (let c of this.clouds_) {
        c.Update(timeElapsed);
      }
      for (let c of this.crap_) {
        c.Update(timeElapsed);
      }
    }
  }

  return {
      Background: Background,
  };
})();