// cube

function makeCube() {
  const positions = new Float32Array([
    -1, -1, -1,  // 0
    1, -1, -1,  // 1
    1, 1, -1,  // 2
    -1, 1, -1,  // 3
    -1, -1, 1,  // 4
    1, -1, 1,  // 5
    1, 1, 1,  // 6
    -1, 1, 1   // 7
  ]);

  const colors = new Float32Array([
    1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1
  ]);


  const indices = new Uint16Array([
    // Front
    4, 5, 6, 4, 6, 7,
    // Back
    1, 0, 3, 1, 3, 2,
    // Top
    3, 7, 6, 3, 6, 2,
    // Bottom
    0, 1, 5, 0, 5, 4,
    // Right
    1, 2, 6, 1, 6, 5,
    // Left
    0, 4, 7, 0, 7, 3,
  ]);
  
  return {
    positions,
    colors,
    indices
  };
}


function makeSphere(r, vSteps, uSteps) {
  let positions = [];
  let colors = [];
  let indices = [];

  for (let i = 0; i <= vSteps; i++) {
    const v = i * Math.PI / vSteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);
      const x = cosu * sinv;
      const y = cosv;
      const z = sinu * sinv;

      positions.push(r * x, r * y, r * z);

      colors.push(
        Math.abs(x),
        Math.abs(y),
        Math.abs(z)
      );
    }
  }

  for (let i = 0; i < vSteps; i++) {
    for (let j = 0; j < uSteps; j++) {
      const k1 = (i * (uSteps + 1)) + j;
      const k2 = k1 + uSteps + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}

function makeTorus(R, r, vSteps, uSteps) {
  let positions = [];
  let colors = [];
  let indices = [];

  for (let i = 0; i <= vSteps; i++) {
    const v = i * 2 * Math.PI / vSteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);
      const x = (R + r*cosv)*cosu;
      const y = (R + r*cosv)*sinu;
      const z = r*sinv;

      positions.push(x, y, z);

      colors.push(
        Math.abs(x),
        Math.abs(y),
        Math.abs(z)
      );
    }
  }

  for (let i = 0; i < vSteps; i++) {
    for (let j = 0; j < uSteps; j++) {
      const k1 = (i * (uSteps + 1)) + j;
      const k2 = k1 + uSteps + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}

let cube = makeCube();

let sphere = makeSphere(1, 20, 20);

let torus = makeTorus(1, 0.5, 20, 20);

let positions = cube.positions;
let colors = cube.colors;
let indices = cube.indices;