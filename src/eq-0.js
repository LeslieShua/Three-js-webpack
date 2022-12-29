import * as THREE from 'three'
import { WEBGL } from './webgl'


if (WEBGL.isWebGLAvailable()) {

  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xA9A9A9);

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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

  
  //메시 추가
  const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material2 = new THREE.MeshStandardMaterial({color: 0xFF7F});
  const obj2 = new THREE.Mesh(geometry2, material2);
  obj2.rotation.y = 0.5;
  scene.add(obj2);


  //바닥 추가
    const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0.5;
    scene.add(plane);

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
