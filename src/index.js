import * as THREE from 'three'
import { WEBGL } from './webgl'


if (WEBGL.isWebGLAvailable()) {

  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xA9A9A9);

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  //랜더러
  const renderer = new THREE.WebGLRenderer({antialias: true,alpha : true,});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  
  //텍스처 추가
  const textureLoader = new THREE.TextureLoader();
  const textureBaseColor = textureLoader.load('../static/img/Stone_basecolor.jpg');
  const textureNormalMap = textureLoader.load('../static/img/Stone_normal.jpg');
  const textureHeightMap = textureLoader.load('../static/img/Stone_height.png');
  const textureRoughnessMap = textureLoader.load('../static/img/Stone_roughness.jpg');

  
  //메쉬 start
  const geometry2 = new THREE.SphereGeometry(0.3, 32, 16);
  const material2 = new THREE.MeshStandardMaterial({
        map : textureBaseColor
  });
  const obj2 = new THREE.Mesh(geometry2, material2);
  obj2.position.x = -1.5;
  scene.add(obj2);

  //메쉬
  const geometry3 = new THREE.SphereGeometry(0.3, 32, 16);
  const material3 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap : textureNormalMap
  });
  const obj3 = new THREE.Mesh(geometry3, material3);
  obj3.position.x = -0.5;
  scene.add(obj3);

  //메쉬
  const geometry4 = new THREE.SphereGeometry(0.3, 32, 16);
  const material4 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.03
  });
  const obj4 = new THREE.Mesh(geometry4, material4);
  obj4.position.x = 0.5;
  scene.add(obj4);

  //메쉬
  const geometry1 = new THREE.SphereGeometry(0.3, 32, 16);
  const material1 = new THREE.MeshPhysicalMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.03,
    roughnessMap: textureRoughnessMap,
    roughness : 0.5
  });

  const obj1 = new THREE.Mesh(geometry1, material1);
  obj1.position.x = 1.5;
  scene.add(obj1);


  function render(time) {
    time *= 0.0005;  // convert time to seconds
  

    // obj1.rotation.y = time;
    // obj2.rotation.y = time;
  
    renderer.render(scene, camera);
  
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  //반응형 처리
  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);


} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
