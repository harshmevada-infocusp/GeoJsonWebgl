import { createProgramFromSources } from "./utils/webglutils";
import type { CountryFeature, GeoJSONMinimal } from "./utils/geo-json-type";
import { drawCountryPoints, getBounds } from "./utils/utils";
import jsondata from "./utils/geojson.json";

const geoJson: GeoJSONMinimal = jsondata;

const vertexShaderSource = `#version 300 es

in vec2 aPosition;
in vec3 aColor;
uniform vec2 uResolution;

out vec3 fColor;

void main (){

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = aPosition / uResolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  gl_PointSize = 1.0;

  fColor = aColor;
}`;

const fragmentShaderSource = `#version 300 es

  precision mediump float;
  in vec3 fColor;
  out vec4 color;

void main (){

  color = vec4(1,0,0.3,1);

  }`;

const simpleCountries: CountryFeature[] = geoJson.features.map((f) => ({
  type: f.type,
  properties: {
    name: f.properties.name,
  },
  geometry: f.geometry,
}));

function main() {
  const canvas = document.getElementById("gl-canvas") as HTMLCanvasElement;

  //giving canvas the size of the screen
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

  //setting up viewport of the canvas
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  //converting canvas to black color
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const program = createProgramFromSources({
    gl,
    vertexShaderSource,
    fragmentShaderSource,
  });
  console.log("program", program);

  gl.useProgram(program);

  //setting up resolution of the webgl context
  var resolutionUniformLocation = gl.getUniformLocation(program, "uResolution");
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  //line color
  const aColorLoc = gl.getAttribLocation(program, "aColor");
  gl.enableVertexAttribArray(aColorLoc);
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([1, 0, 0, 0, 1, 0]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(aColorLoc);
  gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 3 * 4, 0);

  // Create a vertex array object (attribute state)
  var vao = gl.createVertexArray();

  // and make it the one we're currently working with
  gl.bindVertexArray(vao);

  //position of point
  const aPsitionLoc = gl.getAttribLocation(program, "aPosition");
  const positionBuffer = gl.createBuffer();
  gl.enableVertexAttribArray(aPsitionLoc);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(aPsitionLoc, 2, gl.FLOAT, false, 2 * 4, 0);

  //databounds

  const dataBounds = getBounds(
    simpleCountries
      .map((country) => country.geometry.coordinates.flat(1))
      .flat(1) as number[][],
  );

  simpleCountries
    // .filter((e) => e.name === "India")
    .map((e) => {
      drawCountryPoints(
        gl,
        e.geometry.coordinates[0] as number[][],
        dataBounds,
      );
    });
}

main();
