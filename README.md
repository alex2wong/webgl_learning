# webgl_learning

Learning WebGL by book <<**WebGL Programming Guide**\>> 

Just have fun !

## Notes

1. webgl坐标系统, 与canvas 不同.

画布中心才是0，0，0，
传入vertexShader 的坐标都是相对整个画布的相对数值

2. Shader 实例

``` GLSL
// extern positions..
attribute vec4 a_Position;

void main() {
    // position (can be vec4(0.2,0.2,0.1,1.0);) relative to canvas..
    gl_Position = a_Position; 
    gl_PointSize = 8.00;
}

precision mediump float;
uniform vec4 u_FragColor;

// should receive vColor and vLight from vshader..
void main() {
    gl_FragColor = u_FragColor;
}
```


3. 绘制一个点的步骤

- 在顶点着色器中，声明attribute 变量
- 在着色器中，将attribute 变量赋值给 gl_Position
- 在js 中给attribute 传输点坐标.

其实webgl 内置的函数并不多，但是同族函数比较多，理解webgl 渲染流程可以方便记忆.

具体的绘制一个点（只有关键代码）:

``` JavaScript
// 获取 Attribute 变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

// 把坐标传给 vertextShader.. 把颜色值传给 片元着色器.
  gl.vertexAttrib2f(a_Position, position[0], position[1]);
  gl.uniform4f(u_FragColor, 0.9, 0.6, 0.3, 1);
  // 绘制gl 中的点数据，从索引0 开始， 绘制一个点.
  gl.drawArray(gl.POINTS, 0, 1);

```

4. 着色器之间数据传递示意

![data in shaders](https://upload-images.jianshu.io/upload_images/1950967-9e6b23f271ba9bcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 在线 DEMO

[Canvas 1w个点动画](https://alex2wong.github.io/webgl_learning/webgl5/index.html)

[WebGL 1w个点动画不开 glBuffer](https://alex2wong.github.io/webgl_learning/webgl4/index.html)

[WebGL 1w个点动画开 glBuffer](https://alex2wong.github.io/webgl_learning/webgl4/index.html)

[WebGL 三角形纯色](https://alex2wong.github.io/webgl_learning/webgl6/index.html)

[WebGL 三角行渐变色](https://alex2wong.github.io/webgl_learning/webgl7/index.html)
