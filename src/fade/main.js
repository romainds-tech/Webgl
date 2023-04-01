var gl;

let allPoints = [];

function init() {
  const canvas = document.getElementById("canvas");
  gl = WebGLUtils.setupWebGL(canvas);

  // Set the default value of the color buffer
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  const point = new Point(0, 0, 100);
  point.draw();
}

init();
