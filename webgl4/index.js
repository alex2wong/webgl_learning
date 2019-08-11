var vshader = `
// extern positions..
attribute vec4 a_Position;

void main() {
    // position (can be vec4(0.2,0.2,0.1,1.0);) relative to canvas..
    gl_Position = a_Position; 
    gl_PointSize = 4.00;
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

// point Number, would random *2 positionValue.
const pNumber = 10000;

function renderFrame() {
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


  var flatArray = [];
  for (var j = pNumber * 2; j > 0; j--) {
    flatArray.push(Math.random()*2 - 1);
  }
  var n = initVertexBuffers(gl, flatArray);
  // 获取 Attribute 变量的存储位置  
  var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (u_FragColor < 0) {
    console.log("failed to get the storage location of u_FragColor");
    return;
  }
  gl.uniform4f(u_FragColor, 0.7,0.6,0.3,0.8);

  gl.clearColor(0.1, 0.1, 0.1, 1);
  // use previous clearColor to clear canvas ! if no clearColor, default.
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, n);
  requestAnimationFrame(renderFrame);
}

function main() {
  renderFrame();
  // setInterval(renderFrame, 17);
}

function initVertexBuffers(gl, flatArray){
    // var vertices = new Float32Array([
    //     0.1, 0.0, 0.6, 0.0, 0.9, 0.0,-0.6, -0.6
    // ]);
    if (!gl instanceof WebGLRenderingContext) return;
    var vertices = new Float32Array([]);
    if (flatArray instanceof Array && flatArray.length%2 == 0)
        vertices = new Float32Array(flatArray);

    var vertexBuffer = gl.createBuffer(); //WebglBuffer.
    if (!vertexBuffer) {
        return -1;
    } 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //target, webglBuffer.
    // write data to gl.ARRAY_BUFFER
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // pass data to a_Position(address) attributes in vertextShader..
    //// gl.vertexAttribPointer(attr, stepSize, precision, .., stride, offset);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return flatArray.length/2;
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
