// extern positions..
attribute vec4 a_Position;
attribute float a_PointSize;

void main() {
    // position (can be vec4(0.2,0.2,0.1,1.0);) relative to canvas..
    gl_Position = a_Position; 
    gl_PointSize = a_PointSize;
}