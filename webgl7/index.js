// import vshader from './vshader.glsl';
// import fshader from './fshader.glsl';

var vshader = `
// extern positions..
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;

void main() {
    // position (can be vec4(0.2,0.2,0.1,1.0);) relative to canvas..
    gl_Position = a_Position; 
    gl_PointSize = 6.0;
    v_Color = a_Color;
}
`
var fshader = `
precision mediump float;
varying vec4 v_Color;

// should receive vColor and vLight from vshader..
void main() {
    gl_FragColor = v_Color;
}
`;


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

  var flatArray = [
    .5, .5, .9, 0.0, 0.0,
    .5, -.5, 0.0, .9, 0.0,
    -.5, .5, 0.0, 0.0, .9,
  ];

  var n = initVertexBuffers(gl, flatArray);
  // 获取 Attribute 变量的存储位置  

  // gl.clearColor(0.1, 0.1, 0.1, 1);
  // use previous clearColor to clear canvas ! if no clearColor, default.
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
  gl.drawArrays(gl.POINTS, 0, n);
}

function main() {
  renderFrame();
}

function initVertexBuffers(gl, flatArray){
    if (!gl instanceof WebGLRenderingContext) return;
    var vertices = new Float32Array([]);
    if (flatArray instanceof Array && flatArray.length%5 == 0)
        vertices = new Float32Array(flatArray);

    var vertexBuffer = gl.createBuffer(); //WebglBuffer.
    if (!vertexBuffer) {
        return -1;
    } 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //target, webglBuffer.
    // write data to gl.ARRAY_BUFFER
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var FSIZE = vertices.BYTES_PER_ELEMENT;
    console.log('BYTES_PER_ELEMENT', FSIZE);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // pass data to a_Position(address) attributes in vertextShader..
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    // gl.vertexAttribPointer(attr, howManyValue2read, type, .., stride, offset);
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);

    return flatArray.length/5;
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
