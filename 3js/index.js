const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

consthandleResize=() => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
// 0.0265
scene.fog= new THREE.FogExp2(0x333331, 0.0200)
renderer.setClearColor(scene.fog.color);

const createCloud = (target, quantity, r = 0.05, color= 0xf55f66) => {
const cloudGeo = new THREE.SphereGeometry(r, 3, 3);
const cloudMaterial = new THREE.MeshPhongMaterial({
  color,
})
  for(let p = 0; p < quantity; p++){
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.floor(Math.random() * (15 - -15 + 1)) + -15 ,
      Math.floor(Math.random() * (15 - -15 + 1)) + -15, 
      Math.floor(Math.random() * (15 - -15 + 1)) + -15,
    );
    cloud.material.opacity = 0.1
    target.add(cloud);
  }
};


let ambient = new THREE.AmbientLight(0x66d366);
scene.add(ambient)

const createSphere = (r = 1.3, color= 0xff3333) => {
  const sphereGeo = new THREE.SphereGeometry(r, 25, 25);
  const sphereMat = new THREE.MeshPhongMaterial({
    color,

  });
  return new THREE.Mesh(sphereGeo, sphereMat);
};

camera.position.z = 40;

const createPointLight = (i = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, i);
}

const nucleus = createSphere(3.5);

scene.add(nucleus);

const l1 = createPointLight(.9);
l1.position.set(60,0,10);

const l2 = createPointLight(.9);
l2.position.set(-60,0,10);

nucleus.add(l1,l2)

const createElectron= (r = 0.3, color = 0xffd300) => {
  const sphere = createSphere(r,color);
  const pivot = new THREE.Object3D();
  pivot.add(sphere);
  return {
    sphere,
    pivot
  }
}

const e1 = createElectron(0.3, 0x54bb22);
e1.sphere.position.set(7,0,0);

const e2 = createElectron(0.3, 0x54bb22);
e2.sphere.position.set(-7,0,0);

const e3 = createElectron();
e3.sphere.position.set(14,0,0);
const e4 = createElectron();
e4.sphere.position.set(-14,0,0);

const e5 = createElectron();
e5.sphere.position.set(14,5,5);
const e6 = createElectron();
e6.sphere.position.set(-14,-5,-5);

const e7 = createElectron();
e7.sphere.position.set(14,5,-5);

nucleus.add(e1.pivot,e2.pivot,e3.pivot,e4.pivot,e5.pivot,e6.pivot,e7.pivot);

// createCloud(e1.sphere, 10);
// createCloud(e2.sphere, 10);
// createCloud(e3.sphere, 10);
// createCloud(e4.sphere, 10);
// createCloud(e5.sphere, 10);
// createCloud(e6.sphere, 10);
// createCloud(e7.sphere, 10);
// createCloud(nucleus, 100)

const loop = () => {
  renderer.render(scene, camera);
  const electronRotationSpeed = 0.03;
  const rand = Math.random() * 0.03
  e1.pivot.rotation.z += electronRotationSpeed + rand; e1.pivot.rotation.y += electronRotationSpeed ; e1.pivot.rotation.z += electronRotationSpeed + rand;
  e2.pivot.rotation.z += electronRotationSpeed + rand; e2.pivot.rotation.y += electronRotationSpeed; e2.pivot.rotation.z += electronRotationSpeed;
  e3.pivot.rotation.z -= electronRotationSpeed ; e3.pivot.rotation.y -= electronRotationSpeed; e3.pivot.rotation.z -= electronRotationSpeed;
  e4.pivot.rotation.z += electronRotationSpeed +0.1; e4.pivot.rotation.y += electronRotationSpeed -0.1; e4.pivot.rotation.z -= electronRotationSpeed +0.1;
  e5.pivot.rotation.z -= electronRotationSpeed; e5.pivot.rotation.y += electronRotationSpeed + rand; e5.pivot.rotation.z -= electronRotationSpeed;
  e6.pivot.rotation.z -= electronRotationSpeed; e6.pivot.rotation.y -= electronRotationSpeed; e6.pivot.rotation.z += electronRotationSpeed -0.1 + rand;
  e7.pivot.rotation.z -= electronRotationSpeed -0.1; e7.pivot.rotation.y += electronRotationSpeed + rand; e7.pivot.rotation.z += electronRotationSpeed;

  e1.sphere.rotation.z += electronRotationSpeed + rand; e1.sphere.rotation.y += electronRotationSpeed ; e1.sphere.rotation.z += electronRotationSpeed + rand;
  e1.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  e2.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  e3.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  e4.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  e5.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  e6.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  e7.sphere.children.forEach(element => {
    element.rotation.z += electronRotationSpeed + rand; element.rotation.y += electronRotationSpeed + rand; element.rotation.x += electronRotationSpeed + rand;
  });
  

  const nucleusRotationSpeed = 0.03
  nucleus.rotation.z += nucleusRotationSpeed - rand; 
  nucleus.rotation.x += nucleusRotationSpeed + rand;
  nucleus.rotation.y += nucleusRotationSpeed - rand;

  requestAnimationFrame(loop);
}

loop()



