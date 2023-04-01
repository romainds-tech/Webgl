export default class Point {
  private program: null;
  private x: number;
  private y: number;
  private size: number;
  private attributes: {};
  private uniforms: {};

  constructor(x: number, y: number, size: number = 10) {
    this.program = null;
    this.x = x;
    this.y = y;
    this.size = size;

    this.attributes = {};
    this.uniforms = {};
    this.initProgram();
  }

  static get vertexShader() {
    return [
      "attribute vec2 a_Position;",
      "attribute float a_PointSize;",
      "void main()",
      "{",
      // gl_Position is a vec4 value in clip space (-1 .. +1)
      `   gl_Position = vec4(a_Position, 0.0, 1.0);`,

      // gl_PointSize should be set with a value in pixels
      `   gl_PointSize = a_PointSize;`,
      "}",
    ].join("\n");
  }

  static get fragmentShader() {
    return [
      "precision mediump float;",
      "",
      "uniform vec3 u_FragColor;",
      "",
      "void main()",
      "{",
      // The fragment color has 4 channels (r, g, b, a)
      `   gl_FragColor = vec4(u_FragColor, 1.0);`,
      "}",
    ].join("\n");
  }

  initProgram() {
    // Create the program with shader code
    this.program = WebGLShaderUtils.createProgram(
      gl,
      Point.vertexShader,
      Point.fragmentShader
    );

    // Use the program to allow access to attributes and uniforms location
    gl.useProgram(this.program);

    this.attributes.position = WebGLHelpers.getAttributeLocation(
      this.program,
      "a_Position"
    );
    this.attributes.pointSize = WebGLHelpers.getAttributeLocation(
      this.program,
      "a_PointSize"
    );

    this.uniforms.color = WebGLHelpers.getUniformLocation(
      this.program,
      "u_FragColor"
    );
  }

  draw() {
    allPoints.push(this);

    allPoints.forEach((point) => {
      gl.useProgram(point.program);

      gl.vertexAttrib1f(point.attributes.pointSize, point.size);
      gl.vertexAttrib2f(point.attributes.position, point.x, point.y);

      if (point.x > 0) {
        gl.uniform3fv(point.uniforms.color, [1.0, 0.0, 0.0]);
      } else {
        gl.uniform3fv(point.uniforms.color, [0.0, 0.0, 1.0]);
      }

      gl.drawArrays(gl.POINTS, 0, 1);
    });

    // Draw lines
    if (allPoints.length > 1) {
      const lastPoint = allPoints[allPoints.length - 1];
      const secondLastPoint = allPoints[allPoints.length - 2];

      const lineStart = new Float32Array([
        secondLastPoint.x,
        secondLastPoint.y,
      ]);
      const lineEnd = new Float32Array([lastPoint.x, lastPoint.y]);

      const line = new Line(lineStart, lineEnd);
      allLines.push(line);

      allLines.forEach((line) => {
        line.draw();
      });
    }
  }
}
