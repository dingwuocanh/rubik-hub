// 1. KHO DỮ LIỆU FULL 119 CÔNG THỨC CFOP (41 F2L + 57 OLL + 21 PLL)
const FORMULAS_DATA = [
  // === NHÓM F2L (TRỌN BỘ 41 THẾ CHUẨN) ===
  { id: "f2l-01", cat: "F2L", code: "F2L #01", name: "Cặp cơ bản bên phải", algo: "U (R U' R')" },
  { id: "f2l-02", cat: "F2L", code: "F2L #02", name: "Cặp cơ bản mặt trước", algo: "U' (F' U F)" },
  { id: "f2l-03", cat: "F2L", code: "F2L #03", name: "Đưa trực tiếp mặt trước", algo: "F' U' F" },
  { id: "f2l-04", cat: "F2L", code: "F2L #04", name: "Đưa trực tiếp bên phải", algo: "R U R'" },
  { id: "f2l-05", cat: "F2L", code: "F2L #05", name: "Tách cặp sai hướng phải", algo: "(U' R U R') U2 (R U' R')" },
  { id: "f2l-06", cat: "F2L", code: "F2L #06", name: "Tách cặp sai hướng trước", algo: "(U F' U' F) U2 (F' U F)" },
  { id: "f2l-07", cat: "F2L", code: "F2L #07", name: "Kéo góc phải ra sau", algo: "U' (R U2 R') U2 (R U' R')" },
  { id: "f2l-08", cat: "F2L", code: "F2L #08", name: "Kéo góc trước sang trái", algo: "U (F' U2 F) U2 (F' U F)" },
  { id: "f2l-09", cat: "F2L", code: "F2L #09", name: "Cạnh đối diện mặt phải", algo: "U' R U' R' U (F' U' F)" },
  { id: "f2l-10", cat: "F2L", code: "F2L #10", name: "Cạnh đối diện mặt trước", algo: "U' (R U R') U (R U R')" },
  { id: "f2l-11", cat: "F2L", code: "F2L #11", name: "Dính cặp lệch màu (Phải)", algo: "U' (R U2 R') U (F' U' F)" },
  { id: "f2l-12", cat: "F2L", code: "F2L #12", name: "Dính cặp lệch màu (Trước)", algo: "(R U' R') U (R U' R') U2 (R U' R')" },
  { id: "f2l-13", cat: "F2L", code: "F2L #13", name: "Dính cặp ngược màu (Trước)", algo: "U (F' U F) U' (F' U' F)" },
  { id: "f2l-14", cat: "F2L", code: "F2L #14", name: "Dính cặp ngược màu (Phải)", algo: "U' (R U' R') U (R U R')" },
  { id: "f2l-15", cat: "F2L", code: "F2L #15", name: "Cạnh kề góc sai màu (Phải)", algo: "(R U R') U2 (R U' R') U (R U' R')" },
  { id: "f2l-16", cat: "F2L", code: "F2L #16", name: "Cạnh kề góc sai màu (Trước)", algo: "(F' U' F) U2 (F' U F) U' (F' U F)" },
  { id: "f2l-17", cat: "F2L", code: "F2L #17", name: "Trắng ngửa lên, cạnh UR", algo: "(R U2 R') U' (R U R')" },
  { id: "f2l-18", cat: "F2L", code: "F2L #18", name: "Trắng ngửa lên, cạnh UF", algo: "(F' U2 F) U (F' U' F)" },
  { id: "f2l-19", cat: "F2L", code: "F2L #19", name: "Trắng ngửa lên, cạnh UB", algo: "U (R U2 R') U (R U' R')" },
  { id: "f2l-20", cat: "F2L", code: "F2L #20", name: "Trắng ngửa lên, cạnh UL", algo: "U' (F' U2 F) U' (F' U F)" },
  { id: "f2l-21", cat: "F2L", code: "F2L #21", name: "Trắng ngửa lên, kéo xa phải", algo: "U2 (R U R') U (R U' R')" },
  { id: "f2l-22", cat: "F2L", code: "F2L #22", name: "Trắng ngửa lên, kéo xa trước", algo: "U2 (F' U' F) U' (F' U F)" },
  { id: "f2l-23", cat: "F2L", code: "F2L #23", name: "Trắng ngửa lên, dính cạnh UF", algo: "U (F' U' F) U' (R U R')" },
  { id: "f2l-24", cat: "F2L", code: "F2L #24", name: "Trắng ngửa lên, dính cạnh UR", algo: "U' (R U R') U (F' U' F)" },
  { id: "f2l-25", cat: "F2L", code: "F2L #25", name: "Góc đúng hướng, cạnh UF", algo: "U' (F' U F) U (R U' R')" },
  { id: "f2l-26", cat: "F2L", code: "F2L #26", name: "Góc đúng hướng, cạnh UR", algo: "U (R U' R') U' (F' U F)" },
  { id: "f2l-27", cat: "F2L", code: "F2L #27", name: "Góc lệch phải, cạnh UR", algo: "(R U' R') U (R U' R')" },
  { id: "f2l-28", cat: "F2L", code: "F2L #28", name: "Góc lệch trước, cạnh UF", algo: "(F' U F) U' (F' U F)" },
  { id: "f2l-29", cat: "F2L", code: "F2L #29", name: "Góc lệch trước, cạnh UR", algo: "(R' F R F') (R U' R')" },
  { id: "f2l-30", cat: "F2L", code: "F2L #30", name: "Góc lệch phải, cạnh UB", algo: "(R U R') U' (R U R')" },
  { id: "f2l-31", cat: "F2L", code: "F2L #31", name: "Trắng ngửa lên, cạnh lật trong khe", algo: "U' (R' F R F') (R U' R')" },
  { id: "f2l-32", cat: "F2L", code: "F2L #32", name: "Trắng ngửa lên, cạnh đúng trong khe", algo: "(R U R' U') (R U R' U') (R U R')" },
  { id: "f2l-33", cat: "F2L", code: "F2L #33", name: "Trắng hướng phải, cạnh đúng trong khe", algo: "U' (R U' R') U2 (R U' R')" },
  { id: "f2l-34", cat: "F2L", code: "F2L #34", name: "Trắng hướng trước, cạnh đúng trong khe", algo: "U (F' U F) U2 (F' U F)" },
  { id: "f2l-35", cat: "F2L", code: "F2L #35", name: "Trắng hướng phải, cạnh lật trong khe", algo: "U' (R U R') U (F' U' F)" },
  { id: "f2l-36", cat: "F2L", code: "F2L #36", name: "Trắng hướng trước, cạnh lật trong khe", algo: "U (F' U' F) U' (R U R')" },
  { id: "f2l-37", cat: "F2L", code: "F2L #37", name: "Góc đúng hướng, cạnh bị lật", algo: "(R U' R') U (F' U2 F) U (F' U' F)" },
  { id: "f2l-38", cat: "F2L", code: "F2L #38", name: "Cạnh đúng hướng, góc lệch phải", algo: "(R U' R') U' (R U R') U2 (R U' R')" },
  { id: "f2l-39", cat: "F2L", code: "F2L #39", name: "Cạnh đúng hướng, góc lệch trước", algo: "(R U' R') U (R U2 R') U (R U' R')" },
  { id: "f2l-40", cat: "F2L", code: "F2L #40", name: "Cả hai đều sai (Góc lệch phải)", algo: "(R U' R') (F' U2 F) (R U' R')" },
  { id: "f2l-41", cat: "F2L", code: "F2L #41", name: "Cả hai đều sai (Góc lệch trước)", algo: "(R U R') U' (R U' R') U2 (F' U' F)" },

  // === NHÓM OLL (TRỌN BỘ 57 THẾ CHUẨN) ===
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

  // === NHÓM PLL (TRỌN BỘ 21 THẾ CHUẨN) ===
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

// 2. BỘ MÔ PHỎNG & VẼ SƠ ĐỒ MẶT RUBIK TỰ ĐỘNG TỪ CÔNG THỨC
function buildCubeStateFromInverse(algo, category) {
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
      for (let c = 0; c < 3; c++) {
        cube[f][c][2 - r] = old[r][c];
      }
    }
  }

  function applyBasicMove(m) {
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

  function execToken(token) {
    const turns = token.includes("2") ? 2 : token.includes("'") ? 3 : 1;
    const base = token.replace(/['2]/g, "");
    const expandMap = {
      r: ["R", "M", "M", "M"],
      Rw: ["R", "M", "M", "M"],
      l: ["L", "M"],
      Lw: ["L", "M"],
      u: ["U", "E", "E", "E"],
      Uw: ["U", "E", "E", "E"],
      d: ["D", "E"],
      Dw: ["D", "E"],
      f: ["F", "S"],
      Fw: ["F", "S"],
      b: ["B", "S", "S", "S"],
      Bw: ["B", "S", "S", "S"],
      x: ["R", "M", "M", "M", "L", "L", "L"],
      y: ["U", "E", "E", "E", "D", "D", "D"],
      z: ["F", "S", "B", "B", "B"]
    };
    const seq = expandMap[base] || [base];
    for (let t = 0; t < turns; t++) {
      seq.forEach(applyBasicMove);
    }
  }

  const cleanTokens = algo
    .replace(/[()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const inverseTokens = cleanTokens.reverse().map((tok) => {
    if (tok.endsWith("'")) return tok.slice(0, -1);
    if (tok.endsWith("2")) return tok;
    return tok + "'";
  });

  inverseTokens.forEach(execToken);

  if (category === "F2L") {
    for (let i = 0; i < 4 && cube.D[1][1] !== "W"; i++) execToken("x");
    for (let i = 0; i < 4 && cube.D[1][1] !== "W"; i++) execToken("z");
    for (let i = 0; i < 4 && cube.F[1][1] !== "G"; i++) execToken("y");
  } else {
    for (let i = 0; i < 4 && cube.U[1][1] !== "Y"; i++) execToken("x");
    for (let i = 0; i < 4 && cube.U[1][1] !== "Y"; i++) execToken("z");
  }

  return cube;
}

// 3. TẠO HÌNH MINH HỌA SVG CHO TỪNG LOẠI (TÔ XÁM CÁC VIÊN KHÔNG LIÊN QUAN Ở F2L)
function generateCaseSVG(item) {
  const cube = buildCubeStateFromInverse(item.algo, item.cat);
  const palette = {
    Y: "#facc15",
    W: "#ffffff",
    G: "#10b981",
    B: "#3b82f6",
    R: "#ef4444",
    O: "#f97316",
    GRAY: "#4b5563"
  };

  if (item.cat === "OLL" || item.cat === "PLL") {
    const isOLL = item.cat === "OLL";
    const getColor = (code) => {
      if (isOLL) return code === "Y" ? palette.Y : "#374151";
      return palette[code];
    };

    let svg = `<svg viewBox="0 0 120 120" aria-hidden="true">`;

    for (let c = 0; c < 3; c++) {
      svg += `<rect x="${22 + c * 26}" y="8" width="24" height="8" rx="2" fill="${getColor(cube.B[0][2 - c])}"/>`;
      svg += `<rect x="${22 + c * 26}" y="104" width="24" height="8" rx="2" fill="${getColor(cube.F[0][c])}"/>`;
    }
    for (let r = 0; r < 3; r++) {
      svg += `<rect x="8" y="${22 + r * 26}" width="8" height="24" rx="2" fill="${getColor(cube.L[0][r])}"/>`;
      svg += `<rect x="104" y="${22 + r * 26}" width="8" height="24" rx="2" fill="${getColor(cube.R[0][2 - r])}"/>`;
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        svg += `<rect x="${22 + c * 26}" y="${22 + r * 26}" width="24" height="24" rx="3" fill="${getColor(cube.U[r][c])}"/>`;
      }
    }

    svg += `</svg>`;
    return svg;
  }

  const displayCube = {
    U: cube.U.map((row) => [...row]),
    F: cube.F.map((row) => [...row]),
    R: cube.R.map((row) => [...row])
  };

  const cubies = [
    [["U", 2, 2], ["F", 0, 2], ["R", 0, 0]],
    [["U", 2, 0], ["F", 0, 0], ["L", 0, 2]],
    [["U", 0, 2], ["B", 0, 0], ["R", 0, 2]],
    [["U", 0, 0], ["B", 0, 2], ["L", 0, 0]],
    [["D", 0, 2], ["F", 2, 2], ["R", 2, 0]],
    [["D", 0, 0], ["F", 2, 0], ["L", 2, 2]],
    [["D", 2, 2], ["B", 2, 0], ["R", 2, 2]],
    [["D", 2, 0], ["B", 2, 2], ["L", 2, 0]],
    [["U", 2, 1], ["F", 0, 1]],
    [["U", 1, 2], ["R", 0, 1]],
    [["U", 0, 1], ["B", 0, 1]],
    [["U", 1, 0], ["L", 0, 1]],
    [["F", 1, 2], ["R", 1, 0]],
    [["F", 1, 0], ["L", 1, 2]],
    [["B", 1, 0], ["R", 1, 2]],
    [["B", 1, 2], ["L", 1, 0]],
    [["D", 0, 1], ["F", 2, 1]],
    [["D", 1, 2], ["R", 2, 1]],
    [["D", 2, 1], ["B", 2, 1]],
    [["D", 1, 0], ["L", 2, 1]]
  ];

  cubies.forEach((stickers) => {
    const isLastLayerPiece = stickers.some(([f, r, c]) => cube[f][r][c] === "Y");
    if (isLastLayerPiece) {
      stickers.forEach(([f, r, c]) => {
        if (displayCube[f]) {
          displayCube[f][r][c] = "GRAY";
        }
      });
    }
  });

  let svg = `<svg viewBox="0 0 120 120" aria-hidden="true">`;

  const poly = (pts, fill) =>
    `<polygon points="${pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="#0d1117" stroke-width="1.8" stroke-linejoin="round"/>`;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const p = (rr, cc) => [
        60 + (cc / 3) * 40 - (rr / 3) * 40,
        14 + (cc / 3) * 23 + (rr / 3) * 23
      ];
      svg += poly([p(r, c), p(r, c + 1), p(r + 1, c + 1), p(r + 1, c)], palette[displayCube.U[r][c]]);
    }
  }

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const p = (rr, cc) => [
        20 + (cc / 3) * 40,
        37 + (cc / 3) * 23 + (rr / 3) * 46
      ];
      svg += poly([p(r, c), p(r, c + 1), p(r + 1, c + 1), p(r + 1, c)], palette[displayCube.F[r][c]]);
    }
  }

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const p = (rr, cc) => [
        60 + (cc / 3) * 40,
        60 - (cc / 3) * 23 + (rr / 3) * 46
      ];
      svg += poly([p(r, c), p(r, c + 1), p(r + 1, c + 1), p(r + 1, c)], palette[displayCube.R[r][c]]);
    }
  }

  svg += `</svg>`;
  return svg;
}

// 4. QUẢN LÝ TRẠNG THÁI HIỂN THỊ & LƯU TIẾN ĐỘ HỌC
const gridEl = document.getElementById("formula-grid");
const filterBtns = document.querySelectorAll(".filter-bar .btn");
const searchInput = document.getElementById("search-input");
const learnedCountEl = document.getElementById("learned-count");
const progressFillEl = document.getElementById("progress-fill");

let currentFilter = "all";
let learnedIds = new Set(JSON.parse(localStorage.getItem("qa_rubik_learned") || "[]"));

function updateCounters() {
  document.getElementById("count-all").textContent = FORMULAS_DATA.length;
  document.getElementById("count-F2L").textContent = FORMULAS_DATA.filter((f) => f.cat === "F2L").length;
  document.getElementById("count-OLL").textContent = FORMULAS_DATA.filter((f) => f.cat === "OLL").length;
  document.getElementById("count-PLL").textContent = FORMULAS_DATA.filter((f) => f.cat === "PLL").length;

  const learnedTotal = learnedIds.size;
  learnedCountEl.textContent = `${learnedTotal} / ${FORMULAS_DATA.length}`;
  const percent = Math.round((learnedTotal / FORMULAS_DATA.length) * 100);
  progressFillEl.style.width = `${percent}%`;
}

function renderFormulas() {
  const keyword = searchInput.value.toLowerCase().trim();

  const filtered = FORMULAS_DATA.filter((item) => {
    const isLearned = learnedIds.has(item.id);
    const matchTab =
      currentFilter === "all" ||
      (currentFilter === "learned" && isLearned) ||
      item.cat === currentFilter;

    const searchText = `${item.code} ${item.name} ${item.algo} ${item.cat}`.toLowerCase();
    const matchKeyword = searchText.includes(keyword);

    return matchTab && matchKeyword;
  });

  if (filtered.length === 0) {
    gridEl.innerHTML = `<div class="empty-state">Không tìm thấy công thức nào phù hợp với bộ lọc hiện tại.</div>`;
    return;
  }

  gridEl.innerHTML = filtered
    .map((item) => {
      const isLearned = learnedIds.has(item.id);
      const badgeClass = `badge-${item.cat.toLowerCase()}`;
      const rawAlgo = item.algo.replace(/[()]/g, "");

      return `
        <article class="card ${isLearned ? "is-learned" : ""}">
          <div class="card-top">
            <span class="badge ${badgeClass}">${item.code}</span>
            <div class="card-actions">
              ${item.cat !== "F2L" ? `<a href="trainer.html?case=${item.id}" class="icon-btn" style="text-decoration:none;" title="Luyện riêng thế này">⚡ Luyện</a>` : ""}
              <button class="icon-btn learn-btn ${isLearned ? "active" : ""}" data-id="${item.id}" title="Đánh dấu đã thuộc">
                ${isLearned ? "✓ Đã thuộc" : "+ Học"}
              </button>
              <button class="icon-btn copy-btn" data-algo="${rawAlgo}" title="Sao chép ký hiệu">
                Chép
              </button>
            </div>
          </div>

          <div class="cube-diagram">
            ${generateCaseSVG(item)}
          </div>

          <h2 class="case-name">${item.name}</h2>
          <p class="algorithm">${item.algo}</p>
        </article>
      `;
    })
    .join("");
}

// 5. BẮT SỰ KIỆN LỌC, TÌM KIẾM, SAO CHÉP VÀ ĐÁNH DẤU ĐÃ THUỘC
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderFormulas();
  });
});

searchInput.addEventListener("input", renderFormulas);

gridEl.addEventListener("click", (e) => {
  const copyBtn = e.target.closest(".copy-btn");
  if (copyBtn) {
    navigator.clipboard.writeText(copyBtn.dataset.algo);
    copyBtn.textContent = "Đã chép!";
    setTimeout(() => (copyBtn.textContent = "Chép"), 1300);
    return;
  }

  const learnBtn = e.target.closest(".learn-btn");
  if (learnBtn) {
    const id = learnBtn.dataset.id;
    if (learnedIds.has(id)) {
      learnedIds.delete(id);
    } else {
      learnedIds.add(id);
    }
    localStorage.setItem("qa_rubik_learned", JSON.stringify([...learnedIds]));
    updateCounters();
    renderFormulas();
  }
});

// Khởi chạy
updateCounters();
renderFormulas();