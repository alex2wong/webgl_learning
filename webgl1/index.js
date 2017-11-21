function main() {
    var canvas = document.querySelector('#canv');
    var gl = getWebglContext(canvas);  // : WebGLRenderingContext
    if (!gl) {
        console.log('did not get gl from canvas.')
        return;
    }
    gl.clearColor(0.6, 0.4,0.0, 1);
    console.log("clearCanvas by gl.");
    // use previous clearColor to clear canvas ! if no clearColor, default.
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function getWebglContext(element) {
    if (element != undefined && element instanceof HTMLCanvasElement) {
        var gl = element.getContext("experimental-webgl");
        if (!gl) {
            gl = element.getContext('webgl');
        }
        if (gl) return gl;
    }
    return null;
}
