var gl;

let allPoints = [];

function init() {
  const canvas = document.getElementById("canvas");
  gl = WebGLUtils.setupWebGL(canvas);

  // Set the default value of the color buffer
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  const point3 = new Point(-0.5, 0, 30);
  const point = new Point(0, 0, 120);
  const point2 = new Point(0.5, 0, 30);

  const point4 = new Point(0, 0.5, 30);
  const point5 = new Point(0, -0.5, 30);

  point2.draw();
  point3.draw();
  point.draw();
  point4.draw();
  point5.draw();
}

init();
