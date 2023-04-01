class Polygon {
  constructor(sides) {
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
    this.sides = sides;

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
      Polygon.vertexShader,
      Polygon.fragmentShader
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

  calculPointsPositionsAndIndicesFromSidesIndexed() {
    let position = [0, 0];
    let indice = [];
    let color = [1.0, 0.0, 0.0];
    let angleStep = (2 * Math.PI) / this.sides;
    let radius = 0.5;
    let x = 0;
    let y = 0;

    for (let i = 0; i < this.sides; i++) {
      let angle = angleStep * i;
      x = radius * Math.cos(angle);
      y = radius * Math.sin(angle);

      position.push(x, y);

      color.push(Math.random(), Math.random(), Math.random());

      if (i === this.sides - 1) {
        indice.push(0, i + 1, 1);
      } else {
        indice.push(0, i + 1, i + 2);
      }
    }

    return { position, indice, color };
  }

  initGeometry() {
    // Positions definition (2D clip space)
    let { position, indice, color } =
      this.calculPointsPositionsAndIndicesFromSidesIndexed();

    let positions = new Float32Array([...position]);
    let indices = new Uint8Array([...indice]);
    let colors = new Float32Array([...color]);

    // Create the vertex buffer
    this.vertexBuffer = gl.createBuffer();
    this.colorBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();

    this.nIndices = indices.length;

    // Bind the new buffer to the ARRAY BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // Set positions data into the buffer
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Bind the new buffer to the ARRAY BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

    // Set color data into the buffer
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

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
    // gl.uniform3fv(this.uniforms.color, this.color);

    // Draw element
    gl.drawElements(gl.TRIANGLES, this.nIndices, gl.UNSIGNED_BYTE, 0);
  }
}
