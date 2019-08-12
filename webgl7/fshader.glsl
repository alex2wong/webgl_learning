precision mediump float;
uniform vec4 u_FragColor;

// should receive vColor and vLight from vshader..
void main() {
    gl_FragColor = u_FragColor;
}