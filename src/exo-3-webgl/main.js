const canvas = document.getElementById("canvas");

if (canvas != null) {
  let gl = WebGLUtils.setupWebGL(canvas);

  const VERTEX_SHADER = WebGLShaderUtils.shaderArrayToString([
    "void main()",
    "{",
    "   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);",
    "   gl_PointSize = 50.0;",
    "}",
  ]);

  const FRAGMENT_SHADER = WebGLShaderUtils.shaderArrayToString([
    "void main()",
    "{",
    "   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
    "}",
  ]);

  let program = WebGLShaderUtils.createProgram(
    gl,
    VERTEX_SHADER,
    FRAGMENT_SHADER
  );
  gl.useProgram(program);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}
