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
    // should receive vColor and vLight from vshader..
    void main() {
        gl_FragColor = vec4(1.0, .7, .3, 1);
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
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('failed to get the storage location of a_Position');
    return;
  }

  // gl.vertexAttrib3f(a_Position, -0.5, -0.5, 0.0);
  var positions = [];
  positions.push(new Float32Array([0.1, 0.0, 0.1]));
  positions.push(new Float32Array([0.6, 0.0, 0.9]));
  positions.push(new Float32Array([0.9, 0.0, 0.4]));
  positions.push(new Float32Array([0.6, 0.5, 0.7]));
  positions.push(new Float32Array([-0.6, -0.6, 0.0]));

  gl.clearColor(0.1, 0.1, 0.1, 1);
  console.log("clearCanvas by gl.");
  // use previous clearColor to clear canvas ! if no clearColor, default.
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var ii = 0 ; ii < positions.length; ii ++) {
    gl.vertexAttrib3fv(a_Position, positions[ii]);
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
