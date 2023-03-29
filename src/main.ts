import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import {Matrix4, Quaternion, Vector2, Vector3} from "three";
// import {negate} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: 'high-performance'})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2

const controls = new TrackballControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()

const green_cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0x00ff00}))

const red_cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xff0000}))
red_cube.position.x = -2
red_cube.position.y = 1

// const helper = new THREE.CameraHelper(camera)
// scene.add(helper)


// light
const light = new THREE.AmbientLight(0xffffff, 0.7)

scene.add(red_cube)
scene.add(green_cube)
scene.add(light)

// var mouse = new Vector3()

window.addEventListener('resize', onWindowResize, false)
document.body.addEventListener('mousemove', rotateCube, false)

function onWindowResize() : void {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    render()
}

function rotateCube(event: MouseEvent) : void{
    if(!isNaN(event.clientY)) {

        render()
    }
}

function animate() : void {
    requestAnimationFrame(animate)

    controls.update()

    render()
}

function render() : void {
    renderer.setRenderTarget(null)
    renderer.render(scene, camera)
}

animate()
