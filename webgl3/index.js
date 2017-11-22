var vshader = `
// extern positions..
attribute vec4 a_Position;

void main() {
    // position (can be vec4(0.2,0.2,0.1,1.0);) relative to canvas..
    gl_Position = a_Position; 
    gl_PointSize = 20.00;
}
`;

var fshader = `
precision mediump float;
uniform vec4 u_FragColor;

// should receive vColor and vLight from vshader..
void main() {
    gl_FragColor = u_FragColor;
}
`;

function main() {
  var canvas = document.querySelector("#canv");
  var gl = getWebglContext(canvas); // : WebGLRenderingContext
  if (!gl) {
    console.log("did not get gl from canvas.");
    return;
  }
  // extern method, bind gl with Shaders..
  if (!initShaders(gl, vshader, fshader)) {
    console.log("failed to init shaders..");
    return;
  }

  // 获取 Attribute 变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (a_Position < 0 || u_FragColor < 0) {
    console.log("failed to get the storage location of a_Position");
    return;
  }

  // gl.vertexAttrib3f(a_Position, -0.5, -0.5, 0.0);
  var positions = [];
  positions.push([0.1, 0.0]);
  positions.push([0.6, 0.0]);
  positions.push([0.9, 0.0]);
  positions.push([0.6, 0.5]);
  positions.push([-0.6, -0.6]);

  gl.clearColor(0.1, 0.1, 0.1, 1);
  console.log("clearCanvas by gl.");
  // use previous clearColor to clear canvas ! if no clearColor, default.
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var ii = 0; ii < positions.length; ii++) {
    // pass positon to vertextShader..
    gl.vertexAttrib2f(a_Position, positions[ii][0], positions[ii][1]);
    if (positions[ii] instanceof Array && positions[ii].length > 1) {
        console.log('p index: ' + ii + ' pointX: ' + positions[ii][0]);
        if (positions[ii][0] > 0.2) {
            // uniform4f , pass vec4 to u_FragColor in FragShader.
            gl.uniform4f(u_FragColor, 0.9, 0.6, 0.3, 1);
        } else {
            gl.uniform4f(u_FragColor, 0.6, 0.8, 0.9, 1);
        }
    }
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

function getWebglContext(element) {
  if (element != undefined && element instanceof HTMLCanvasElement) {
    var gl = element.getContext("experimental-webgl");
    if (!gl) {
      gl = element.getContext("webgl");
    }
    if (gl) return gl;
  }
  return null;
}
