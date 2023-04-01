// @ts-ignore
import { WebGLUtils } from "three";

let allPoints = [];
let allLines = [];

function init() {
  const canvas: HTMLElement | null = document.getElementById("canvas");
  if (canvas !== null) {
    // @ts-ignore
    const gl = canvas.getContext("webgl");

    // Set the default value of the color buffer
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Clear the color buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    canvas.addEventListener("mousedown", (event) => {
      // get x position from event.x normalized to canvas width between -1 and 1
      const x = (event.x / canvas.offsetWidth) * 2 - 1;

      // get y position from event.y normalized to canvas height between -1 and 1
      const y = -((event.y / canvas.offsetHeight) * 2 - 1);

      const point = new Point(x, y, Math.random() * 10);
      point.draw();
    });

    canvas.addEventListener("mouseup", (event) => {
      // get x position from event.x normalized to canvas width between -1 and 1
      const x = (event.x / canvas.offsetWidth) * 2 - 1;

      // get y position from event.y normalized to canvas height between -1 and 1
      const y = -((event.y / canvas.offsetHeight) * 2 - 1);

      const point = new Point(x, y, Math.random() * 10);
      point.draw();
    });
  }
}

init();
