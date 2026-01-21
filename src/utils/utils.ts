import type { Boundaries } from "./geo-json-type";

export function getBounds(points: number[][]) {
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  for (const [lng, lat] of points) {
    if (lng < minX) minX = lng;
    if (lng > maxX) maxX = lng;
    if (lat < minY) minY = lat;
    if (lat > maxY) maxY = lat;
  }
  return { minX, maxX, minY, maxY };
}

export function projectToCanvas(
  lng: number,
  lat: number,
  bounds: any,
  canvas: HTMLCanvasElement,
) {
  const { minX, maxX, minY, maxY } = bounds;
  const padding = 100;
  const scaleX = (canvas.width - padding * 2) / (maxX - minX);
  const scaleY = (canvas.height - padding * 2) / (maxY - minY);

  // keep aspect ratio
  const scale = Math.min(scaleX, scaleY);

  const x = padding + (lng - minX) * scale;
  const y = padding + (lat - minY) * scale; // invert because canvas y increases downward

  return [x + canvas.width / 8, canvas.height - y];
}

export const drawCountryPoints = (
  gl: WebGL2RenderingContext,
  countryData: number[][],
  bounds: Boundaries,
) => {
  let verts: number[] = [];
  // console.log("countryData", countryData);

  for (let i = 0; i < countryData.length; i++) {
    const [lng, lat] = countryData[i];

    const [x, y] = projectToCanvas(
      lng,
      lat,
      bounds,
      gl.canvas as HTMLCanvasElement,
    );

    verts.push(x, y);
  }
  const count = verts.length / 2;

  // upload polygon vertices
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

  gl.drawArrays(gl.LINE_STRIP, 0, count);
};
