// 1. KHO DỮ LIỆU 57 OLL + 21 PLL ĐỂ LUYỆN PHẢN XẠ
const TRAINER_CASES = [
  // === 57 OLL ===
  { id: "oll-01", cat: "OLL", code: "OLL #01", name: "Chấm Đơn (Dot #1)", algo: "(R U2) (R2 F R F') U2 (R' F R F')" },
  { id: "oll-02", cat: "OLL", code: "OLL #02", name: "Chấm Đôi (Dot #2)", algo: "F (R U R' U') F' f (R U R' U') f'" },
  { id: "oll-03", cat: "OLL", code: "OLL #03", name: "Chấm Góc Trái (Dot #3)", algo: "f (R U R' U') f' U' F (R U R' U') F'" },
  { id: "oll-04", cat: "OLL", code: "OLL #04", name: "Chấm Góc Phải (Dot #4)", algo: "f (R U R' U') f' U F (R U R' U') F'" },
  { id: "oll-05", cat: "OLL", code: "OLL #05", name: "Ô Vuông Nhỏ Phải", algo: "(r' U2) (R U R' U r)" },
  { id: "oll-06", cat: "OLL", code: "OLL #06", name: "Ô Vuông Nhỏ Trái", algo: "(r U2) (R' U' R U' r')" },
  { id: "oll-07", cat: "OLL", code: "OLL #07", name: "Tia Chớp Rộng Phải", algo: "(r U R' U) (R U2 r')" },
  { id: "oll-08", cat: "OLL", code: "OLL #08", name: "Tia Chớp Rộng Trái", algo: "(r' U' R U') (R' U2 r)" },
  { id: "oll-09", cat: "OLL", code: "OLL #09", name: "Con Diều Phải (Kite)", algo: "(R U R' U') R' F (R2 U R' U') F'" },
  { id: "oll-10", cat: "OLL", code: "OLL #10", name: "Con Diều Trái (Kite)", algo: "(R U R' U) (R' F R F') (R U2 R')" },
  { id: "oll-11", cat: "OLL", code: "OLL #11", name: "Tia Chớp Nhỏ Phải", algo: "r U R' U (R' F R F') R U2 r'" },
  { id: "oll-12", cat: "OLL", code: "OLL #12", name: "Tia Chớp Nhỏ Trái", algo: "M' (R' U' R U') (R' U2 R) U' M" },
  { id: "oll-13", cat: "OLL", code: "OLL #13", name: "Quân Mã Phải (Knight)", algo: "F U R U' R2 F' R U (R U' R')" },
  { id: "oll-14", cat: "OLL", code: "OLL #14", name: "Quân Mã Trái (Knight)", algo: "R' F R U R' F' R (F U' F')" },
  { id: "oll-15", cat: "OLL", code: "OLL #15", name: "Quân Mã Đèn Phải", algo: "(r' U' r) (R' U' R U) (r' U r)" },
  { id: "oll-16", cat: "OLL", code: "OLL #16", name: "Quân Mã Đèn Trái", algo: "(r U r') (R U R' U') (r U' r')" },
  { id: "oll-17", cat: "OLL", code: "OLL #17", name: "Chấm Chéo (Diagonal)", algo: "(R U R' U) (R' F R F') U2 (R' F R F')" },
  { id: "oll-18", cat: "OLL", code: "OLL #18", name: "Vương Miện Chấm (Crown)", algo: "R U2 R2 F R F' U2 M' U R U' r'" },
  { id: "oll-19", cat: "OLL", code: "OLL #19", name: "Con Bọ Chấm (Bunny)", algo: "M U (R U R' U') M' (R' F R F')" },
  { id: "oll-20", cat: "OLL", code: "OLL #20", name: "Chữ X (4 Cạnh Lật)", algo: "(r U R' U') M2 (U R U' R') U' M'" },
  { id: "oll-21", cat: "OLL", code: "OLL #21", name: "Cross H (Chữ Thập Đối)", algo: "R U2 R' U' (R U R' U') R U' R'" },
  { id: "oll-22", cat: "OLL", code: "OLL #22", name: "Cross Pi (Xe Tăng)", algo: "R U2 (R2 U' R2 U' R2) U2 R" },
  { id: "oll-23", cat: "OLL", code: "OLL #23", name: "Headlights (Đèn Pha)", algo: "R2 D (R' U2 R) D' (R' U2 R')" },
  { id: "oll-24", cat: "OLL", code: "OLL #24", name: "Chameleon (Tắc Kè)", algo: "(r U R' U') (r' F R F')" },
  { id: "oll-25", cat: "OLL", code: "OLL #25", name: "Bowtie (Nơ Bướm)", algo: "F' (r U R' U') (r' F R)" },
  { id: "oll-26", cat: "OLL", code: "OLL #26", name: "Anti-Sune (Con Cá Trái)", algo: "R U2 R' U' R U' R'" },
  { id: "oll-27", cat: "OLL", code: "OLL #27", name: "Sune (Con Cá Phải)", algo: "R U R' U R U2 R'" },
  { id: "oll-28", cat: "OLL", code: "OLL #28", name: "Mũi Tên Nhỏ (Stealth)", algo: "(r U R' U') M (U R U' R')" },
  { id: "oll-29", cat: "OLL", code: "OLL #29", name: "Dáng Khó Phải #1", algo: "(R U R' U') (R U' R') (F' U' F) (R U R')" },
  { id: "oll-30", cat: "OLL", code: "OLL #30", name: "Dáng Khó Trái #2", algo: "F U (R U2 R' U') (R U2 R' U') F'" },
  { id: "oll-31", cat: "OLL", code: "OLL #31", name: "Chữ P Ngược Phải", algo: "R' U' F (U R U' R') F' R" },
  { id: "oll-32", cat: "OLL", code: "OLL #32", name: "Chữ P Ngược Trái", algo: "L U F' (U' L' U L) F L'" },
  { id: "oll-33", cat: "OLL", code: "OLL #33", name: "Chữ T Đèn Cạnh", algo: "(R U R' U') (R' F R F')" },
  { id: "oll-34", cat: "OLL", code: "OLL #34", name: "Chữ C Đèn Cạnh", algo: "(R U R2 U') (R' F) (R U R U') F'" },
  { id: "oll-35", cat: "OLL", code: "OLL #35", name: "Con Cá Đôi (Fish Salad)", algo: "(R U2) (R2 F R F') (R U2 R')" },
  { id: "oll-36", cat: "OLL", code: "OLL #36", name: "Chữ W Trái (Wario)", algo: "(L' U' L U') (L' U L U) (L F' L' F)" },
  { id: "oll-37", cat: "OLL", code: "OLL #37", name: "Con Cá Đèn (Mounted Fish)", algo: "F (R U' R' U') (R U R') F'" },
  { id: "oll-38", cat: "OLL", code: "OLL #38", name: "Chữ W Phải (Mario)", algo: "(R U R' U) (R U' R' U') (R' F R F')" },
  { id: "oll-39", cat: "OLL", code: "OLL #39", name: "Tia Chớp Lớn Trái", algo: "L F' (L' U' L U) F U' L'" },
  { id: "oll-40", cat: "OLL", code: "OLL #40", name: "Tia Chớp Lớn Phải", algo: "R' F (R U R' U') F' U R" },
  { id: "oll-41", cat: "OLL", code: "OLL #41", name: "Dáng Khó Đèn Phải", algo: "(R U R' U R U2 R') F (R U R' U') F'" },
  { id: "oll-42", cat: "OLL", code: "OLL #42", name: "Dáng Khó Đèn Trái", algo: "(R' U' R U' R' U2 R) F (R U R' U') F'" },
  { id: "oll-43", cat: "OLL", code: "OLL #43", name: "Chữ P Trái", algo: "f' (L' U' L U) f" },
  { id: "oll-44", cat: "OLL", code: "OLL #44", name: "Chữ P Phải", algo: "f (R U R' U') f'" },
  { id: "oll-45", cat: "OLL", code: "OLL #45", name: "Chữ T Cơ Bản", algo: "F (R U R' U') F'" },
  { id: "oll-46", cat: "OLL", code: "OLL #46", name: "Chữ C Đèn Đầu", algo: "R' U' (R' F R F') U R" },
  { id: "oll-47", cat: "OLL", code: "OLL #47", name: "Góc L Nhỏ Trái", algo: "F' (L' U' L U) (L' U' L U) F" },
  { id: "oll-48", cat: "OLL", code: "OLL #48", name: "Góc L Nhỏ Phải", algo: "F (R U R' U') (R U R' U') F'" },
  { id: "oll-49", cat: "OLL", code: "OLL #49", name: "Góc L Thanh Phải", algo: "r U' r2 U r2 U r2 U' r" },
  { id: "oll-50", cat: "OLL", code: "OLL #50", name: "Góc L Thanh Trái", algo: "r' U r2 U' r2 U' r2 U r'" },
  { id: "oll-51", cat: "OLL", code: "OLL #51", name: "Đường Thẳng (Nắp Chai)", algo: "f (R U R' U') (R U R' U') f'" },
  { id: "oll-52", cat: "OLL", code: "OLL #52", name: "Đường Thẳng Cạnh R", algo: "(R U R' U R U' B) U' B' R'" },
  { id: "oll-53", cat: "OLL", code: "OLL #53", name: "Góc L Đèn Trái", algo: "(r' U' R U') (R' U R U') R' U2 r" },
  { id: "oll-54", cat: "OLL", code: "OLL #54", name: "Góc L Đèn Phải", algo: "(r U R' U) (R U' R' U) R U2 r'" },
  { id: "oll-55", cat: "OLL", code: "OLL #55", name: "Đường Cao Tốc (Highway)", algo: "(R' F R U) (R U' R2 F') R2 U' R' (U R U R')" },
  { id: "oll-56", cat: "OLL", code: "OLL #56", name: "Đường Thẳng Đèn Đôi", algo: "(r' U' r) (U' R' U R) (U' R' U R) (r' U r)" },
  { id: "oll-57", cat: "OLL", code: "OLL #57", name: "Chữ H Nhỏ (Mummy)", algo: "(R U R' U') M' (U R U' r')" },

  // === 21 PLL ===
  { id: "pll-ua", cat: "PLL", code: "PLL #01", name: "Ua-Perm (Hoán 3 cạnh ngược)", algo: "(R U' R U) R U (R U' R' U') R2" },
  { id: "pll-ub", cat: "PLL", code: "PLL #02", name: "Ub-Perm (Hoán 3 cạnh thuận)", algo: "R2 U (R U R' U') R' U' (R' U R')" },
  { id: "pll-h", cat: "PLL", code: "PLL #03", name: "H-Perm (Chữ Thập Đối)", algo: "M2 U M2 U2 M2 U M2" },
  { id: "pll-z", cat: "PLL", code: "PLL #04", name: "Z-Perm (Đổi 2 cặp cạnh kề)", algo: "M' U (M2 U M2) U (M' U2 M2)" },
  { id: "pll-aa", cat: "PLL", code: "PLL #05", name: "Aa-Perm (Hoán 3 góc thuận)", algo: "x (R' U R') D2 (R U' R') D2 R2 x'" },
  { id: "pll-ab", cat: "PLL", code: "PLL #06", name: "Ab-Perm (Hoán 3 góc ngược)", algo: "x R2 D2 (R U R') D2 (R U' R) x'" },
  { id: "pll-e", cat: "PLL", code: "PLL #07", name: "E-Perm (Đổi 2 cặp góc)", algo: "x' (R U' R' D) (R U R' D') (R U R' D) (R U' R' D') x" },
  { id: "pll-t", cat: "PLL", code: "PLL #08", name: "T-Perm (Chữ T)", algo: "(R U R' U') R' F R2 U' R' U' (R U R' F')" },
  { id: "pll-jb", cat: "PLL", code: "PLL #09", name: "Jb-Perm (Chữ J Phải)", algo: "(R U R' F') (R U R' U') R' F R2 U' R'" },
  { id: "pll-ja", cat: "PLL", code: "PLL #10", name: "Ja-Perm (Chữ J Trái)", algo: "(R' U L' U2) (R U' R' U2 R) L" },
  { id: "pll-rb", cat: "PLL", code: "PLL #11", name: "Rb-Perm (Chữ R Phải)", algo: "(R' U2 R U2) R' F (R U R' U') R' F' R2" },
  { id: "pll-ra", cat: "PLL", code: "PLL #12", name: "Ra-Perm (Chữ R Trái)", algo: "(R U' R' U') (R U R D) (R' U' R D') (R' U2 R')" },
  { id: "pll-f", cat: "PLL", code: "PLL #13", name: "F-Perm (Chữ F)", algo: "(R' U' F') (R U R' U') R' F R2 U' R' U' (R U R' U R)" },
  { id: "pll-v", cat: "PLL", code: "PLL #14", name: "V-Perm (Chữ V)", algo: "(R' U R' U') y (R' F' R2 U') (R' U R' F) R F" },
  { id: "pll-y", cat: "PLL", code: "PLL #15", name: "Y-Perm (Chữ Y)", algo: "F (R U' R' U') (R U R' F') (R U R' U') (R' F R F')" },
  { id: "pll-na", cat: "PLL", code: "PLL #16", name: "Na-Perm (Chữ N Phải)", algo: "(R U R' U) (R U R' F') (R U R' U') R' F R2 U' R' U2 (R U' R')" },
  { id: "pll-nb", cat: "PLL", code: "PLL #17", name: "Nb-Perm (Chữ N Trái)", algo: "(R' U R U') (R' F' U' F) (R U R' F) R' F' (R U' R)" },
  { id: "pll-ga", cat: "PLL", code: "PLL #18", name: "Ga-Perm", algo: "R2 U (R' U R' U') (R U' R2) D U' (R' U R D')" },
  { id: "pll-gb", cat: "PLL", code: "PLL #19", name: "Gb-Perm", algo: "(F' U' F) (R2 u R' U) (R U' R u') R2" },
  { id: "pll-gc", cat: "PLL", code: "PLL #20", name: "Gc-Perm", algo: "R2 U' (R U' R U) (R' U R2) D' U (R U' R' D)" },
  { id: "pll-gd", cat: "PLL", code: "PLL #21", name: "Gd-Perm", algo: "(D' R U R' U') D (R2 U' R U') (R' U R' U) R2" }
];

// 2. BỘ VẼ SƠ ĐỒ SVG GÓC NHÌN TỪ TRÊN XUỐNG CHO OLL / PLL
function generateTopSVG(item) {
  const cube = {
    U: Array.from({ length: 3 }, () => Array(3).fill("Y")),
    D: Array.from({ length: 3 }, () => Array(3).fill("W")),
    F: Array.from({ length: 3 }, () => Array(3).fill("G")),
    B: Array.from({ length: 3 }, () => Array(3).fill("B")),
    R: Array.from({ length: 3 }, () => Array(3).fill("R")),
    L: Array.from({ length: 3 }, () => Array(3).fill("O"))
  };

  function rotCW(f) {
    const old = cube[f].map((r) => [...r]);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) cube[f][c][2 - r] = old[r][c];
    }
  }

  function applyBasic(m) {
    if (m === "U") {
      rotCW("U");
      const t = [...cube.F[0]];
      cube.F[0] = [...cube.R[0]];
      cube.R[0] = [...cube.B[0]];
      cube.B[0] = [...cube.L[0]];
      cube.L[0] = t;
    } else if (m === "D") {
      rotCW("D");
      const t = [...cube.F[2]];
      cube.F[2] = [...cube.L[2]];
      cube.L[2] = [...cube.B[2]];
      cube.B[2] = [...cube.R[2]];
      cube.R[2] = t;
    } else if (m === "R") {
      rotCW("R");
      for (let i = 0; i < 3; i++) {
        const t = cube.U[i][2];
        cube.U[i][2] = cube.F[i][2];
        cube.F[i][2] = cube.D[i][2];
        cube.D[i][2] = cube.B[2 - i][0];
        cube.B[2 - i][0] = t;
      }
    } else if (m === "L") {
      rotCW("L");
      for (let i = 0; i < 3; i++) {
        const t = cube.U[i][0];
        cube.U[i][0] = cube.B[2 - i][2];
        cube.B[2 - i][2] = cube.D[i][0];
        cube.D[i][0] = cube.F[i][0];
        cube.F[i][0] = t;
      }
    } else if (m === "F") {
      rotCW("F");
      for (let i = 0; i < 3; i++) {
        const t = cube.U[2][i];
        cube.U[2][i] = cube.L[2 - i][2];
        cube.L[2 - i][2] = cube.D[0][2 - i];
        cube.D[0][2 - i] = cube.R[i][0];
        cube.R[i][0] = t;
      }
    } else if (m === "B") {
      rotCW("B");
      for (let i = 0; i < 3; i++) {
        const t = cube.U[0][2 - i];
        cube.U[0][2 - i] = cube.R[2 - i][2];
        cube.R[2 - i][2] = cube.D[2][i];
        cube.D[2][i] = cube.L[i][0];
        cube.L[i][0] = t;
      }
    } else if (m === "M") {
      for (let i = 0; i < 3; i++) {
        const t = cube.U[i][1];
        cube.U[i][1] = cube.B[2 - i][1];
        cube.B[2 - i][1] = cube.D[i][1];
        cube.D[i][1] = cube.F[i][1];
        cube.F[i][1] = t;
      }
    } else if (m === "E") {
      const t = [...cube.F[1]];
      cube.F[1] = [...cube.L[1]];
      cube.L[1] = [...cube.B[1]];
      cube.B[1] = [...cube.R[1]];
      cube.R[1] = t;
    } else if (m === "S") {
      for (let i = 0; i < 3; i++) {
        const t = cube.U[1][i];
        cube.U[1][i] = cube.L[2 - i][1];
        cube.L[2 - i][1] = cube.D[1][2 - i];
        cube.D[1][2 - i] = cube.R[i][1];
        cube.R[i][1] = t;
      }
    }
  }

  function execTok(tok) {
    const turns = tok.includes("2") ? 2 : tok.includes("'") ? 3 : 1;
    const base = tok.replace(/['2]/g, "");
    const map = {
      r: ["R", "M", "M", "M"], l: ["L", "M"], u: ["U", "E", "E", "E"],
      d: ["D", "E"], f: ["F", "S"], b: ["B", "S", "S", "S"],
      x: ["R", "M", "M", "M", "L", "L", "L"],
      y: ["U", "E", "E", "E", "D", "D", "D"],
      z: ["F", "S", "B", "B", "B"]
    };
    const seq = map[base] || [base];
    for (let t = 0; t < turns; t++) seq.forEach(applyBasic);
  }

  const inv = item.algo
    .replace(/[()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .reverse()
    .map((t) => (t.endsWith("'") ? t.slice(0, -1) : t.endsWith("2") ? t : t + "'"));

  inv.forEach(execTok);
  for (let i = 0; i < 4 && cube.U[1][1] !== "Y"; i++) execTok("x");
  for (let i = 0; i < 4 && cube.U[1][1] !== "Y"; i++) execTok("z");

  const palette = { Y: "#facc15", G: "#10b981", B: "#3b82f6", R: "#ef4444", O: "#f97316" };
  const isOLL = item.cat === "OLL";
  const getCol = (c) => (isOLL ? (c === "Y" ? "#facc15" : "#374151") : palette[c]);

  let svg = `<svg viewBox="0 0 120 120" aria-hidden="true">`;
  for (let c = 0; c < 3; c++) {
    svg += `<rect x="${22 + c * 26}" y="8" width="24" height="8" rx="2" fill="${getCol(cube.B[0][2 - c])}"/>`;
    svg += `<rect x="${22 + c * 26}" y="104" width="24" height="8" rx="2" fill="${getCol(cube.F[0][c])}"/>`;
  }
  for (let r = 0; r < 3; r++) {
    svg += `<rect x="8" y="${22 + r * 26}" width="8" height="24" rx="2" fill="${getCol(cube.L[0][r])}"/>`;
    svg += `<rect x="104" y="${22 + r * 26}" width="8" height="24" rx="2" fill="${getCol(cube.R[0][2 - r])}"/>`;
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      svg += `<rect x="${22 + c * 26}" y="${22 + r * 26}" width="24" height="24" rx="3" fill="${getCol(cube.U[r][c])}"/>`;
    }
  }
  svg += `</svg>`;
  return svg;
}

// 3. SINH CHUỖI TRÁO TẠO THẾ KÈM GÓC XOAY U NGẪU NHIÊN (CHỐNG HỌC VẸT)
function simplifyMoves(tokens) {
  const stack = [];
  tokens.forEach((tok) => {
    const face = tok.replace(/['2]/g, "");
    const turn = tok.includes("2") ? 2 : tok.includes("'") ? 3 : 1;

    if (stack.length > 0 && stack[stack.length - 1].face === face) {
      const merged = (stack[stack.length - 1].turn + turn) % 4;
      if (merged === 0) {
        stack.pop();
      } else {
        stack[stack.length - 1].turn = merged;
      }
    } else {
      stack.push({ face, turn });
    }
  });

  return stack.map((item) => {
    const suffix = item.turn === 2 ? "2" : item.turn === 3 ? "'" : "";
    return item.face + suffix;
  });
}

function generateSetupScramble(algo) {
  const uChoices = ["", "U", "U'", "U2"];
  const preU = uChoices[Math.floor(Math.random() * uChoices.length)];
  const postU = uChoices[Math.floor(Math.random() * uChoices.length)];

  const rawTokens = algo
    .replace(/[()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const inverseTokens = rawTokens.reverse().map((tok) => {
    if (tok.endsWith("'")) return tok.slice(0, -1);
    if (tok.endsWith("2")) return tok;
    return tok + "'";
  });

  const combined = [];
  if (preU) combined.push(preU);
  combined.push(...inverseTokens);
  if (postU) combined.push(postU);

  return simplifyMoves(combined).join(" ");
}

// 4. QUẢN LÝ TRẠNG THÁI CHỌN THẾ & GIAO DIỆN
const caseListEl = document.getElementById("case-list");
const selectedCountEl = document.getElementById("selected-count");
const presetBtns = document.querySelectorAll(".preset-btn");
const miniTabs = document.querySelectorAll(".mini-tab");
const caseSearchInput = document.getElementById("case-search");

const setupScrambleEl = document.getElementById("setup-scramble");
const hintToggleBtn = document.getElementById("hint-toggle-btn");
const nextCaseBtn = document.getElementById("next-case-btn");
const revealBox = document.getElementById("reveal-box");
const revealSvg = document.getElementById("reveal-svg");
const revealTag = document.getElementById("reveal-tag");
const revealTitle = document.getElementById("reveal-title");
const revealAlgo = document.getElementById("reveal-algo");

let activeCatFilter = "ALL";
let selectedIds = new Set(TRAINER_CASES.filter((c) => c.cat === "PLL").map((c) => c.id));
let currentCase = null;
let hintVisible = false;

// Kiểm tra nếu người dùng bấm nút "⚡ Luyện" từ trang Công thức (?case=...)
const urlParams = new URLSearchParams(window.location.search);
const singleCaseParam = urlParams.get("case");
if (singleCaseParam && TRAINER_CASES.some((c) => c.id === singleCaseParam)) {
  selectedIds = new Set([singleCaseParam]);
  presetBtns.forEach((b) => b.classList.remove("active"));
}

function renderCaseSelector() {
  const keyword = caseSearchInput.value.toLowerCase().trim();
  const filtered = TRAINER_CASES.filter((item) => {
    const matchCat = activeCatFilter === "ALL" || item.cat === activeCatFilter;
    const matchKey = `${item.code} ${item.name} ${item.algo}`.toLowerCase().includes(keyword);
    return matchCat && matchKey;
  });

  selectedCountEl.textContent = `Đã chọn: ${selectedIds.size}`;

  caseListEl.innerHTML = filtered
    .map((item) => {
      const isChecked = selectedIds.has(item.id);
      return `
        <label class="case-item ${isChecked ? "checked" : ""}">
          <input type="checkbox" class="case-check" value="${item.id}" ${isChecked ? "checked" : ""}>
          <div class="case-mini-svg">${generateTopSVG(item)}</div>
          <div class="case-item-info">
            <div class="case-item-title">${item.code} • ${item.name}</div>
            <div class="case-item-sub">${item.algo}</div>
          </div>
        </label>
      `;
    })
    .join("");
}

function pickNextCase() {
  const pool = TRAINER_CASES.filter((c) => selectedIds.has(c.id));
  if (pool.length === 0) {
    currentCase = null;
    setupScrambleEl.textContent = "Vui lòng chọn ít nhất 1 thế ở cột bên trái để bắt đầu!";
    revealBox.classList.add("hidden");
    return;
  }

  // Tránh lặp lại đúng thế vừa giải nếu danh sách chọn có từ 2 thế trở lên
  let candidates = pool;
  if (pool.length > 1 && currentCase) {
    candidates = pool.filter((c) => c.id !== currentCase.id);
  }

  currentCase = candidates[Math.floor(Math.random() * candidates.length)];
  setupScrambleEl.textContent = generateSetupScramble(currentCase.algo);

  // Ẩn đáp án khi sang lượt mới
  hintVisible = false;
  hintToggleBtn.textContent = "👁 Hiện gợi ý";
  revealBox.classList.add("hidden");
  updateRevealContent("GỢI Ý THẾ HIỆN TẠI");
}

function updateRevealContent(tagText) {
  if (!currentCase) return;
  revealTag.textContent = tagText;
  revealSvg.innerHTML = generateTopSVG(currentCase);
  revealTitle.textContent = `${currentCase.code} • ${currentCase.name}`;
  revealAlgo.textContent = currentCase.algo;
}

// Sự kiện chọn từng thế
caseListEl.addEventListener("change", (e) => {
  if (!e.target.classList.contains("case-check")) return;
  const id = e.target.value;
  if (e.target.checked) selectedIds.add(id);
  else selectedIds.delete(id);

  presetBtns.forEach((b) => b.classList.remove("active"));
  renderCaseSelector();
  if (!currentCase || !selectedIds.has(currentCase.id)) {
    pickNextCase();
  }
});

// Sự kiện các nút chọn nhanh (Preset)
presetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.blur();
    presetBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const preset = btn.dataset.preset;
    const learnedSet = new Set(JSON.parse(localStorage.getItem("qa_rubik_learned") || "[]"));

    if (preset === "pll-all") {
      selectedIds = new Set(TRAINER_CASES.filter((c) => c.cat === "PLL").map((c) => c.id));
    } else if (preset === "oll-all") {
      selectedIds = new Set(TRAINER_CASES.filter((c) => c.cat === "OLL").map((c) => c.id));
    } else if (preset === "2look-oll") {
      const twoLookOll = ["oll-21", "oll-22", "oll-23", "oll-24", "oll-25", "oll-26", "oll-27"];
      selectedIds = new Set(twoLookOll);
    } else if (preset === "2look-pll") {
      const twoLookPll = ["pll-aa", "pll-ab", "pll-e", "pll-ua", "pll-ub", "pll-h", "pll-z"];
      selectedIds = new Set(twoLookPll);
    } else if (preset === "unlearned") {
      selectedIds = new Set(TRAINER_CASES.filter((c) => !learnedSet.has(c.id)).map((c) => c.id));
    } else if (preset === "none") {
      selectedIds.clear();
    }

    renderCaseSelector();
    pickNextCase();
  });
});

miniTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    miniTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    activeCatFilter = tab.dataset.cat;
    renderCaseSelector();
  });
});

caseSearchInput.addEventListener("input", renderCaseSelector);

hintToggleBtn.addEventListener("click", () => {
  hintToggleBtn.blur();
  if (!currentCase) return;
  hintVisible = !hintVisible;
  if (hintVisible) {
    updateRevealContent("GỢI Ý THẾ HIỆN TẠI");
    revealBox.classList.remove("hidden");
    hintToggleBtn.textContent = "🙈 Ẩn gợi ý";
  } else {
    revealBox.classList.add("hidden");
    hintToggleBtn.textContent = "👁 Hiện gợi ý";
  }
});

nextCaseBtn.addEventListener("click", () => {
  nextCaseBtn.blur();
  pickNextCase();
});

// 5. ĐỒNG HỒ BẤM GIỜ LUYỆN THẾ & LƯU THÀNH TÍCH RIÊNG TỪNG THẾ
const clockArea = document.querySelector(".clock-area");
const timerDisplay = document.getElementById("timer-display");
const timerHint = document.getElementById("timer-hint");
const lastSolveLabel = document.getElementById("last-solve-label");
const quickBtns = document.querySelectorAll("[data-quick]");
const quickDelBtn = document.getElementById("quick-del-btn");

const trCountEl = document.getElementById("tr-count");
const trMeanEl = document.getElementById("tr-mean");
const trAo5El = document.getElementById("tr-ao5");
const trAo12El = document.getElementById("tr-ao12");
const recentSolvesBody = document.getElementById("recent-solves-body");
const caseRankingBody = document.getElementById("case-ranking-body");
const clearTrainerBtn = document.getElementById("clear-trainer-btn");

let trainerSolves = JSON.parse(localStorage.getItem("qa_rubik_trainer_solves") || "[]");
let state = "IDLE";
let holdTimeout = null;
let timerInterval = null;
let startTime = 0;

function handleHoldStart() {
  if (!currentCase) return;
  clearTimeout(holdTimeout);
  if (state === "IDLE") {
    state = "HOLDING";
    timerDisplay.classList.add("holding");
    holdTimeout = setTimeout(() => {
      if (state === "HOLDING") {
        state = "READY";
        timerDisplay.classList.remove("holding");
        timerDisplay.classList.add("ready");
      }
    }, 400);
  }
}

function handleHoldEnd() {
  if (state === "HOLDING") {
    clearTimeout(holdTimeout);
    timerDisplay.classList.remove("holding", "ready");
    state = "IDLE";
  } else if (state === "READY") {
    timerDisplay.classList.remove("holding", "ready");
    startTimer();
  } else if (state === "STOPPED") {
    state = "IDLE";
  }
}

function startTimer() {
  state = "RUNNING";
  startTime = performance.now();
  timerHint.textContent = "Nhấn phím bất kỳ hoặc chạm màn hình để dừng";
  timerInterval = setInterval(() => {
    timerDisplay.textContent = ((performance.now() - startTime) / 1000).toFixed(2);
  }, 10);
}

function stopTimer() {
  if (state !== "RUNNING") return;
  clearInterval(timerInterval);
  timerInterval = null;

  const finalTime = parseFloat(((performance.now() - startTime) / 1000).toFixed(2));
  const record = {
    caseId: currentCase.id,
    code: currentCase.code,
    name: currentCase.name,
    time: finalTime,
    penalty: "OK"
  };

  trainerSolves.unshift(record);
  timerDisplay.textContent = formatTime(record);
  timerHint.textContent = "Xoay theo chuỗi tráo mới bên trên, giữ Space 0.4s để tiếp tục";

  // Hiện đáp án của thế vừa giải xong, sau đó chuẩn bị lượt mới
  const solvedCase = currentCase;
  saveAndRenderStats();
  pickNextCase();

  // Giữ khung đáp án hiển thị kết quả của thế vừa hoàn thành
  revealTag.textContent = `✓ VỪA LUYỆN XONG (${formatTime(record)}s)`;
  revealSvg.innerHTML = generateTopSVG(solvedCase);
  revealTitle.textContent = `${solvedCase.code} • ${solvedCase.name}`;
  revealAlgo.textContent = solvedCase.algo;
  revealBox.classList.remove("hidden");
}

// Bàn phím & Cảm ứng (Đã chặn cuộn Space tuyệt đối)
document.addEventListener("keydown", (e) => {
  if (document.activeElement === caseSearchInput) return;
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault();
  }
  if (e.repeat) return;

  if (state === "RUNNING") {
    stopTimer();
    state = "STOPPED";
    return;
  }

  if (e.code === "Space" || e.key === " ") {
    if (document.activeElement && document.activeElement.tagName === "BUTTON") {
      document.activeElement.blur();
    }
    handleHoldStart();
  }
});

document.addEventListener("keyup", (e) => {
  if (state === "STOPPED") {
    state = "IDLE";
    return;
  }
  if (e.code === "Space" || e.key === " ") {
    handleHoldEnd();
  }
});

clockArea.addEventListener("touchstart", (e) => {
  if (state === "IDLE") {
    e.preventDefault();
    handleHoldStart();
  }
}, { passive: false });

document.addEventListener("touchstart", (e) => {
  if (state === "RUNNING") {
    e.preventDefault();
    stopTimer();
    state = "STOPPED";
  }
}, { passive: false });

document.addEventListener("touchend", () => handleHoldEnd());

// 6. TÍNH TOÁN & HIỂN THỊ THỐNG KÊ THEO TỪNG THẾ
function getEff(s) {
  if (s.penalty === "DNF") return Infinity;
  return s.penalty === "+2" ? s.time + 2 : s.time;
}

function formatTime(s) {
  if (s.penalty === "DNF") return "DNF";
  if (s.penalty === "+2") return (s.time + 2).toFixed(2) + "+";
  return s.time.toFixed(2);
}

function calcAvg(list, n) {
  if (list.length < n) return "-";
  const arr = list.slice(0, n).map(getEff);
  if (arr.filter((v) => v === Infinity).length >= 2) return "DNF";
  arr.sort((a, b) => a - b);
  const sum = arr.slice(1, n - 1).reduce((a, b) => a + b, 0);
  return (sum / (n - 2)).toFixed(2);
}

function saveAndRenderStats() {
  localStorage.setItem("qa_rubik_trainer_solves", JSON.stringify(trainerSolves));

  const valid = trainerSolves.map(getEff).filter((v) => v !== Infinity);
  trCountEl.textContent = `${valid.length}/${trainerSolves.length}`;
  trMeanEl.textContent = valid.length ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2) : "-";
  trAo5El.textContent = calcAvg(trainerSolves, 5);
  trAo12El.textContent = calcAvg(trainerSolves, 12);

  if (trainerSolves.length > 0) {
    const last = trainerSolves[0];
    lastSolveLabel.textContent = `${last.code} • ${formatTime(last)}`;
    quickBtns.forEach((b) => {
      b.disabled = false;
      b.classList.toggle("active", b.dataset.quick === last.penalty);
    });
    quickDelBtn.disabled = false;
  } else {
    lastSolveLabel.textContent = "Chưa có lượt luyện nào";
    quickBtns.forEach((b) => {
      b.disabled = true;
      b.classList.remove("active");
    });
    quickDelBtn.disabled = true;
  }

  // Lịch sử 20 lượt gần nhất
  recentSolvesBody.innerHTML = trainerSolves
    .slice(0, 20)
    .map((s, idx) => `
      <tr>
        <td>${trainerSolves.length - idx}</td>
        <td>${s.code}</td>
        <td>${formatTime(s)}</td>
      </tr>
    `)
    .join("");

  // Bảng xếp hạng từng thế từ chậm đến nhanh để tìm điểm yếu
  const grouped = {};
  trainerSolves.forEach((s) => {
    const eff = getEff(s);
    if (eff === Infinity) return;
    if (!grouped[s.caseId]) {
      grouped[s.caseId] = { code: s.code, name: s.name, times: [] };
    }
    grouped[s.caseId].times.push(eff);
  });

  const ranking = Object.values(grouped)
    .map((g) => ({
      code: g.code,
      name: g.name,
      count: g.times.length,
      mean: g.times.reduce((a, b) => a + b, 0) / g.times.length,
      best: Math.min(...g.times)
    }))
    .sort((a, b) => b.mean - a.mean); // Sắp xếp thế chậm nhất lên đầu

  if (ranking.length === 0) {
    caseRankingBody.innerHTML = `<tr><td colspan="4" style="color:#6e7681;text-align:center;">Chưa có dữ liệu thống kê từng thế</td></tr>`;
  } else {
    caseRankingBody.innerHTML = ranking
      .map((r) => `
        <tr>
          <td>${r.code}</td>
          <td>${r.count}</td>
          <td style="color:#facc15;">${r.mean.toFixed(2)}s</td>
          <td style="color:#34d399;">${r.best.toFixed(2)}s</td>
        </tr>
      `)
      .join("");
  }
}

quickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.blur();
    if (trainerSolves.length === 0) return;
    trainerSolves[0].penalty = btn.dataset.quick;
    timerDisplay.textContent = formatTime(trainerSolves[0]);
    saveAndRenderStats();
  });
});

quickDelBtn.addEventListener("click", () => {
  quickDelBtn.blur();
  if (trainerSolves.length === 0) return;
  trainerSolves.shift();
  timerDisplay.textContent = trainerSolves.length ? formatTime(trainerSolves[0]) : "0.00";
  saveAndRenderStats();
});

clearTrainerBtn.addEventListener("click", () => {
  clearTrainerBtn.blur();
  if (trainerSolves.length === 0) return;
  if (confirm("Xóa toàn bộ lịch sử Ôn công thức?")) {
    trainerSolves = [];
    timerDisplay.textContent = "0.00";
    saveAndRenderStats();
  }
});

// Khởi chạy
renderCaseSelector();
pickNextCase();
saveAndRenderStats();