class Rectangle {
  constructor(color) {
    this.color = color;

    /*
     * Program and shaders definitions
     */
    this.program = null;
    this.uniforms = {};
    this.attributes = {};

    /*
     * Geometry definitions
     */
    this.vertexBuffer = null;
    this.indexBuffer = null;
    this.nIndices = 0;

    /*
     * Init program and geometry
     */
    this.initProgram();
    this.initGeometry();
  }

  static get vertexShader() {
    return WebGLShaderUtils.shaderArrayToString([
      "attribute vec4 aPosition;",
      "attribute vec3 aColor;",
      "varying vec3 vColor;",
      "",
      "void main()",
      "{",
      "   gl_Position = aPosition;",
      "   vColor = aColor;",
      "}",
    ]);
  }

  static get fragmentShader() {
    return WebGLShaderUtils.shaderArrayToString([
      "precision mediump float;",
      "",
      "varying vec3 vColor;",
      "",
      "void main()",
      "{",
      "   gl_FragColor = vec4(vColor, 1.0);",
      "}",
    ]);
  }

  initProgram() {
    // Create the program with shader code
    this.program = WebGLShaderUtils.createProgram(
      gl,
      Rectangle.vertexShader,
      Rectangle.fragmentShader
    );

    // Use the program to allow access to attributes and uniforms location
    gl.useProgram(this.program);

    // Get all attributes locations
    this.attributes.position = WebGLHelpers.getAttributeLocation(
      this.program,
      "aPosition"
    );

    this.attributes.color = WebGLHelpers.getAttributeLocation(
      this.program,
      "aColor"
    );
  }

  initGeometry() {
    // Positions definition (2D clip space)

    // prettier-ignore
    const positions = new Float32Array([
      -1.0, 0.75,
      1.0, 0.75,
      1.0, -0.75,
      -1.0, -0.75,
    ]);

    // prettier-ignore
    const color = new Float32Array([
      1.0, 0.0, 1.0,
      1.0, 1.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 1.0, 1.0,
    ]);

    // Create the vertex buffer
    this.vertexBuffer = gl.createBuffer();
    this.colorBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();

    // prettier-ignore
    let indices = new Uint8Array([
        0, 1, 2,
        0, 2, 3
    ]);

    this.nIndices = indices.length;

    // Bind the new buffer to the ARRAY BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // Set positions data into the buffer
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Bind the new buffer to the ARRAY BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

    // Set color data into the buffer
    gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);

    // Bind the new buffer to the ELEMENT ARRAY BUFFER
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    // Set indices data into the buffer
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  }

  beforeDraw() {
    // Use the program
    gl.useProgram(this.program);

    // Bind the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // Define how the position attribute will be read into the buffer
    gl.vertexAttribPointer(
      this.attributes.position,
      2,
      gl.FLOAT,
      false,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    );

    // Enable the position attribute
    gl.enableVertexAttribArray(this.attributes.position);

    // Bind the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

    // Define how the position attribute will be read into the buffer
    gl.vertexAttribPointer(
      this.attributes.color,
      3,
      gl.FLOAT,
      false,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0
    );

    // Enable the position attribute
    gl.enableVertexAttribArray(this.attributes.color);

    // Bind the index buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  }

  draw() {
    this.beforeDraw();

    // Set current uniform : warning this is a rendundant call, do it once if you can
    gl.uniform3fv(this.uniforms.color, this.color);

    // Draw element
    gl.drawElements(gl.TRIANGLES, this.nIndices, gl.UNSIGNED_BYTE, 0);
  }
}
