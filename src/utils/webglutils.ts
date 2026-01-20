export const createProgramFromSources = ({
  gl,
  vertexShaderSource,
  fragmentShaderSource,
}: {
  gl: WebGL2RenderingContext;
  vertexShaderSource: string;
  fragmentShaderSource: string;
}): WebGLProgram => {
  //vertex shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  //fragment shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  //program

  const glProgram = gl.createProgram();

  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);

  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    console.log("vertexShaderError", gl.getShaderInfoLog(vertexShader));
    console.log("fragmentShaderError", gl.getShaderInfoLog(fragmentShader));
  }

  return glProgram;
};
