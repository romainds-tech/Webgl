class Line {
  constructor(start, end) {
    this.program = null;
    this.attributes = {};
    this.uniforms = {};
    this.buffer = null;
    this.start = start;
    this.end = end;

    this.initProgram();
    this.initBuffer();
  }

  static get vertexShader() {
    return WebGLShaderUtils.shaderArrayToString([
      "attribute vec2 a_Position;",
      "void main()",
      "{",
      "   gl_Position = vec4(a_Position, 0.0, 1.0);",
      "}",
    ]);
  }

  static get fragmentShader() {
    return WebGLShaderUtils.shaderArrayToString([
      "precision mediump float;",
      "uniform vec4 u_Color;",
      "void main()",
      "{",
      "   gl_FragColor = u_Color;",
      "}",
    ]);
  }

  initProgram() {
    // Create the program with shader code
    this.program = WebGLShaderUtils.createProgram(
      gl,
      Line.vertexShader,
      Line.fragmentShader
    );

    // Use the program to allow access to attributes and uniforms location
    gl.useProgram(this.program);

    this.attributes.position = WebGLHelpers.getAttributeLocation(
      this.program,
      "a_Position"
    );

    this.uniforms.color = WebGLHelpers.getUniformLocation(
      this.program,
      "u_Color"
    );
  }

  initBuffer() {
    const vertices = new Float32Array([
      this.start[0],
      this.start[1],
      this.end[0],
      this.end[1],
    ]);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  }

  draw() {
    gl.useProgram(this.program);

    gl.uniform4fv(this.uniforms.color, [0.0, 1.0, 0.0, 1.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(this.attributes.position, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, 2);
  }
}
