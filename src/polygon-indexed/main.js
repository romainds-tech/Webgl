// import { GUI } from "dat.gui";

/*
 * Draw a red triangle
 *
 * First approach to geometry drawing
 */

// Keep the WebGL context global to make code easier to read
let gl;

// Use only one global context object to keep code clear
let context = {
  polygon: null,
};

var canvas = document.getElementById("canvas");
gl = WebGLUtils.setupWebGL(canvas);

/*
 * Rectangle class
 *
 * Define its shaders and geometry
 *
 */

/*
 * Init GL context and setup the scene
 */
function init() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  context.polygon = new Polygon(Math.floor(Math.random() * 100) + 3);
}

/*
 * Draw the triangle
 */
function render() {
  // Clear the frame buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the triangle
  context.polygon.draw();
}

// render every time with requestAnimationFrame

function animate() {
  init();
  render();
  requestAnimationFrame(animate);
}

// Start the program
init();
animate();
