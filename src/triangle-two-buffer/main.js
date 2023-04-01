/*
 * Draw a red triangle
 *
 * First approach to geometry drawing
 */

// Keep the WebGL context global to make code easier to read
let gl;

// Use only one global context object to keep code clear
let context = {
  triangle: null,
};

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
  let canvas = document.getElementById("canvas");
  gl = WebGLUtils.setupWebGL(canvas);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  context.triangle = new Rectangle([0.0, 0.0, 1.0]);
}

/*
 * Draw the triangle
 */
function render() {
  // Clear the frame buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the triangle
  context.triangle.draw();
}

init();
render();
