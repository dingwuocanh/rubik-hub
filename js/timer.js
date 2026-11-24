// 1. LẤY CÁC PHẦN TỬ HTML
const scrambleEl = document.getElementById("scramble");
const newScrambleBtn = document.getElementById("new-scramble-btn");
const clockArea = document.querySelector(".clock-area");
const timerDisplay = document.getElementById("timer-display");
const timerHint = document.getElementById("timer-hint");
const historyBody = document.getElementById("history-body");
const clearHistoryBtn = document.getElementById("clear-history");
const copyStatsBtn = document.getElementById("copy-stats-btn");
const importBtn = document.getElementById("import-btn");
const importFileInput = document.getElementById("import-file");
const exportBtn = document.getElementById("export-btn");

// Bộ môn & Quan sát 15s
const cubeTabs = document.querySelectorAll(".cube-tab");
const sidebarCubeLabel = document.getElementById("sidebar-cube-label");
const inspectionToggle = document.getElementById("inspection-toggle");
const inspectionStatus = document.getElementById("inspection-status");

// Các chỉ số thống kê
const curSingleEl = document.getElementById("cur-single");
const bestSingleEl = document.getElementById("best-single");
const curMo3El = document.getElementById("cur-mo3");
const bestMo3El = document.getElementById("best-mo3");
const curAo5El = document.getElementById("cur-ao5");
const bestAo5El = document.getElementById("best-ao5");
const curAo12El = document.getElementById("cur-ao12");
const bestAo12El = document.getElementById("best-ao12");
const curAo100El = document.getElementById("cur-ao100");
const bestAo100El = document.getElementById("best-ao100");
const liveAo5El = document.getElementById("live-ao5");
const liveAo12El = document.getElementById("live-ao12");
const solveCountEl = document.getElementById("solve-count");
const sessionMeanEl = document.getElementById("session-mean");

// Thanh phạt nhanh
const lastSolveLabel = document.getElementById("last-solve-label");
const quickBtns = document.querySelectorAll("[data-quick]");
const quickDelBtn = document.getElementById("quick-del-btn");

// Biểu đồ & Sơ đồ 2D
const trendChart = document.getElementById("trend-chart");
const cubeNetEl = document.getElementById("cube-net");

// Modal chi tiết
const modal = document.getElementById("solve-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalTime = document.getElementById("modal-time");
const modalScramble = document.getElementById("modal-scramble");
const deleteSolveBtn = document.getElementById("delete-solve-btn");
const penaltyBtns = document.querySelectorAll("[data-penalty]");

// 2. BIẾN TRẠNG THÁI & ÂM THANH WEB AUDIO API
let currentCube = "3x3";
let inspectionEnabled = false;
let state = "IDLE";
let holdTimeout = null;
let timerInterval = null;
let inspectionInterval = null;
let startTime = 0;
let inspectionStart = 0;
let inspectionPenalty = "OK";
let selectedSolveIndex = null;
let solves = [];
let audioCtx = null;

function playBeep(freq = 880, duration = 0.12) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {}
}

function loadSolves() {
  const key = `qa_rubik_solves_${currentCube}`;
  const legacy = currentCube === "3x3" ? localStorage.getItem("rubik_solves") : null;
  const raw = JSON.parse(localStorage.getItem(key) || legacy || "[]");
  solves = raw.map((item) =>
    typeof item === "number"
      ? { time: item, penalty: "OK", scramble: "Không lưu scramble" }
      : item
  );
}

// 3. TẠO SCRAMBLE CHO 2x2, 3x3, 4x4
function generateScramble() {
  let faces, modifiers, length;
  const axes = {
    R: 0, L: 0, Rw: 0, Lw: 0,
    U: 1, D: 1, Uw: 1, Dw: 1,
    F: 2, B: 2, Fw: 2, Bw: 2
  };

  if (currentCube === "2x2") {
    faces = ["R", "U", "F"];
    modifiers = ["", "'", "2"];
    length = 10;
  } else if (currentCube === "4x4") {
    faces = ["R", "L", "U", "D", "F", "B", "Rw", "Uw", "Fw"];
    modifiers = ["", "'", "2"];
    length = 40;
  } else {
    faces = ["R", "L", "U", "D", "F", "B"];
    modifiers = ["", "'", "2"];
    length = 20;
  }

  let scramble = [];
  let lastFace = "";
  let secondLastFace = "";

  while (scramble.length < length) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const isSame = face === lastFace;
    const isRedundant =
      currentCube !== "4x4" &&
      face === secondLastFace &&
      axes[face] === axes[lastFace];

    if (!isSame && !isRedundant) {
      const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble.push(face + mod);
      secondLastFace = lastFace;
      lastFace = face;
    }
  }

  const scrambleStr = scramble.join(" ");
  scrambleEl.textContent = scrambleStr;
  renderCubeNet(scrambleStr);
}

// 4. BỘ GIẢ LẬP TRẠNG THÁI RUBIK 2D
function renderCubeNet(scrambleStr) {
  const N = currentCube === "2x2" ? 2 : currentCube === "4x4" ? 4 : 3;
  const colors = {
    U: "#ffffff",
    R: "#ef4444",
    F: "#10b981",
    D: "#facc15",
    L: "#f97316",
    B: "#3b82f6"
  };

  const cube = {};
  ["U", "R", "F", "D", "L", "B"].forEach((f) => {
    cube[f] = Array.from({ length: N }, () => Array(N).fill(f));
  });

  function rotateFaceCW(face) {
    const old = cube[face].map((row) => [...row]);
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        cube[face][c][N - 1 - r] = old[r][c];
      }
    }
  }

  function turnLayer(face, d) {
    if (d === 0) rotateFaceCW(face);
    if (face === "U") {
      for (let i = 0; i < N; i++) {
        const tmp = cube.F[d][i];
        cube.F[d][i] = cube.R[d][i];
        cube.R[d][i] = cube.B[d][i];
        cube.B[d][i] = cube.L[d][i];
        cube.L[d][i] = tmp;
      }
    } else if (face === "D") {
      const r = N - 1 - d;
      for (let i = 0; i < N; i++) {
        const tmp = cube.F[r][i];
        cube.F[r][i] = cube.L[r][i];
        cube.L[r][i] = cube.B[r][i];
        cube.B[r][i] = cube.R[r][i];
        cube.R[r][i] = tmp;
      }
    } else if (face === "R") {
      const c = N - 1 - d;
      const bc = d;
      for (let i = 0; i < N; i++) {
        const tmp = cube.U[i][c];
        cube.U[i][c] = cube.F[i][c];
        cube.F[i][c] = cube.D[i][c];
        cube.D[i][c] = cube.B[N - 1 - i][bc];
        cube.B[N - 1 - i][bc] = tmp;
      }
    } else if (face === "L") {
      const c = d;
      const bc = N - 1 - d;
      for (let i = 0; i < N; i++) {
        const tmp = cube.U[i][c];
        cube.U[i][c] = cube.B[N - 1 - i][bc];
        cube.B[N - 1 - i][bc] = cube.D[i][c];
        cube.D[i][c] = cube.F[i][c];
        cube.F[i][c] = tmp;
      }
    } else if (face === "F") {
      const ur = N - 1 - d, rc = d, dr = d, lc = N - 1 - d;
      for (let i = 0; i < N; i++) {
        const tmp = cube.U[ur][i];
        cube.U[ur][i] = cube.L[N - 1 - i][lc];
        cube.L[N - 1 - i][lc] = cube.D[dr][N - 1 - i];
        cube.D[dr][N - 1 - i] = cube.R[i][rc];
        cube.R[i][rc] = tmp;
      }
    } else if (face === "B") {
      const ur = d, lc = d, dr = N - 1 - d, rc = N - 1 - d;
      for (let i = 0; i < N; i++) {
        const tmp = cube.U[ur][N - 1 - i];
        cube.U[ur][N - 1 - i] = cube.R[N - 1 - i][rc];
        cube.R[N - 1 - i][rc] = cube.D[dr][i];
        cube.D[dr][i] = cube.L[i][lc];
        cube.L[i][lc] = tmp;
      }
    }
  }

  scrambleStr.split(" ").forEach((move) => {
    if (!move) return;
    const baseFace = move[0];
    const isWide = move.includes("w");
    const turns = move.includes("2") ? 2 : move.includes("'") ? 3 : 1;
    for (let t = 0; t < turns; t++) {
      turnLayer(baseFace, 0);
      if (isWide) turnLayer(baseFace, 1);
    }
  });

  const layout = [
    [null, "U", null, null],
    ["L", "F", "R", "B"],
    [null, "D", null, null]
  ];

  cubeNetEl.innerHTML = "";
  layout.forEach((row) => {
    row.forEach((faceKey) => {
      if (!faceKey) {
        cubeNetEl.appendChild(document.createElement("div"));
        return;
      }
      const faceDiv = document.createElement("div");
      faceDiv.className = "net-face";
      faceDiv.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
      cube[faceKey].forEach((rArr) => {
        rArr.forEach((colorCode) => {
          const sticker = document.createElement("div");
          sticker.className = "net-sticker";
          sticker.style.backgroundColor = colors[colorCode];
          faceDiv.appendChild(sticker);
        });
      });
      cubeNetEl.appendChild(faceDiv);
    });
  });
}

// 5. XỬ LÝ GIỮ / THẢ & QUAN SÁT 15S (CÓ ÂM THANH 8S / 12S)
function clearAllClasses() {
  timerDisplay.classList.remove("holding", "ready", "inspecting", "inspect-warn");
}

function handleHoldStart() {
  clearTimeout(holdTimeout);
  if (state === "IDLE") {
    if (inspectionEnabled) {
      state = "HOLDING";
      timerDisplay.classList.add("holding");
    } else {
      state = "HOLDING";
      timerDisplay.classList.add("holding");
      holdTimeout = setTimeout(() => {
        if (state === "HOLDING") {
          state = "READY";
          clearAllClasses();
          timerDisplay.classList.add("ready");
        }
      }, 400);
    }
  } else if (state === "INSPECTION") {
    state = "INSPECT_HOLD";
    clearAllClasses();
    timerDisplay.classList.add("holding");
    holdTimeout = setTimeout(() => {
      if (state === "INSPECT_HOLD") {
        state = "INSPECT_READY";
        clearAllClasses();
        timerDisplay.classList.add("ready");
      }
    }, 400);
  }
}

function handleHoldEnd() {
  if (state === "HOLDING") {
    clearTimeout(holdTimeout);
    clearAllClasses();
    if (inspectionEnabled) {
      startInspection();
    } else {
      state = "IDLE";
    }
  } else if (state === "READY") {
    clearAllClasses();
    inspectionPenalty = "OK";
    startTimer();
  } else if (state === "INSPECT_HOLD") {
    clearTimeout(holdTimeout);
    clearAllClasses();
    timerDisplay.classList.add("inspecting");
    state = "INSPECTION";
  } else if (state === "INSPECT_READY") {
    clearInterval(inspectionInterval);
    clearAllClasses();
    startTimer();
  } else if (state === "STOPPED") {
    state = "IDLE";
  }
}

function startInspection() {
  clearInterval(inspectionInterval);
  state = "INSPECTION";
  inspectionStart = performance.now();
  inspectionPenalty = "OK";
  let beeped8 = false;
  let beeped12 = false;

  clearAllClasses();
  timerDisplay.classList.add("inspecting");
  timerDisplay.textContent = "15";
  timerHint.textContent = "Đang quan sát! Giữ Space (hoặc chạm giữ) 0.4s để xuất phát";
  playBeep(660, 0.08); // Tiếng báo bắt đầu quan sát

  inspectionInterval = setInterval(() => {
    const elapsed = (performance.now() - inspectionStart) / 1000;
    const remaining = Math.ceil(15 - elapsed);

    if (elapsed >= 8 && !beeped8) {
      beeped8 = true;
      playBeep(880, 0.12); // Cảnh báo mốc 8 giây
    }
    if (elapsed >= 12 && !beeped12) {
      beeped12 = true;
      playBeep(1046, 0.1); // Cảnh báo kép mốc 12 giây
      setTimeout(() => playBeep(1046, 0.1), 150);
    }

    if (elapsed >= 17) {
      inspectionPenalty = "DNF";
      timerDisplay.textContent = "DNF";
      timerDisplay.classList.add("holding");
    } else if (elapsed >= 15) {
      inspectionPenalty = "+2";
      timerDisplay.textContent = "+2";
      timerDisplay.classList.add("inspect-warn");
    } else {
      timerDisplay.textContent = remaining;
      if (remaining <= 7) timerDisplay.classList.add("inspect-warn");
    }
  }, 100);
}

// Sự kiện bàn phím
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("hidden")) return;

  // Chặn cuộn trang ngay lập tức với mọi tín hiệu phím Space (kể cả khi đè giữ lặp phím)
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
  if (e.code === "Space") {
    handleHoldEnd();
  }
});

// Sự kiện cảm ứng
clockArea.addEventListener(
  "touchstart",
  (e) => {
    if (state === "IDLE" || state === "INSPECTION") {
      e.preventDefault();
      handleHoldStart();
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchstart",
  (e) => {
    if (state === "RUNNING") {
      e.preventDefault();
      stopTimer();
      state = "STOPPED";
    }
  },
  { passive: false }
);

document.addEventListener("touchend", () => handleHoldEnd());

// 6. BẮT ĐẦU VÀ DỪNG ĐỒNG HỒ
function startTimer() {
  clearTimeout(holdTimeout);
  clearInterval(inspectionInterval);
  clearInterval(timerInterval);

  state = "RUNNING";
  startTime = performance.now();
  timerHint.textContent = "Nhấn phím bất kỳ hoặc chạm màn hình để dừng";
  timerInterval = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;
    timerDisplay.textContent = elapsed.toFixed(2);
  }, 10);
}

function stopTimer() {
  if (state !== "RUNNING") return;
  clearInterval(timerInterval);
  timerInterval = null;

  const finalTime = parseFloat(((performance.now() - startTime) / 1000).toFixed(2));
  const newSolve = {
    time: finalTime,
    penalty: inspectionPenalty,
    scramble: scrambleEl.textContent
  };

  timerDisplay.textContent = formatSolve(newSolve);
  timerHint.textContent = inspectionEnabled
    ? "Nhấn Space (hoặc chạm) để bắt đầu Quan sát 15s cho lượt tiếp theo"
    : "Giữ Space (hoặc chạm giữ vào số) 0.4s đến khi chuyển xanh, thả ra để chạy";

  solves.unshift(newSolve);
  saveAndRender();
  generateScramble();
}

// 7. TÍNH TOÁN CHUẨN WCA
function getEffectiveTime(solve) {
  if (solve.penalty === "DNF") return Infinity;
  return solve.penalty === "+2" ? solve.time + 2 : solve.time;
}

function formatSolve(solve) {
  if (solve.penalty === "DNF") return "DNF";
  if (solve.penalty === "+2") return (solve.time + 2).toFixed(2) + "+";
  return solve.time.toFixed(2);
}

function calcMo3(list) {
  if (list.length < 3) return null;
  const times = list.slice(0, 3).map(getEffectiveTime);
  if (times.includes(Infinity)) return Infinity;
  return (times[0] + times[1] + times[2]) / 3;
}

function calcAverage(list, count) {
  if (list.length < count) return null;
  const times = list.slice(0, count).map(getEffectiveTime);
  const dnfCount = times.filter((t) => t === Infinity).length;
  if (dnfCount >= 2) return Infinity;
  times.sort((a, b) => a - b);
  const trimmed = times.slice(1, count - 1);
  return trimmed.reduce((a, b) => a + b, 0) / (count - 2);
}

function formatStat(val) {
  if (val === null || val === undefined || Number.isNaN(val)) return "-";
  if (val === Infinity) return "DNF";
  return val.toFixed(2);
}

// 8. CẬP NHẬT BẢNG THÀNH TÍCH, THANH PHẠT NHANH & BIỂU ĐỒ SVG
function saveAndRender() {
  localStorage.setItem(`qa_rubik_solves_${currentCube}`, JSON.stringify(solves));

  let allSingles = [], allMo3 = [], allAo5 = [], allAo12 = [], allAo100 = [];

  const rowsData = solves.map((solve, idx) => {
    const subList = solves.slice(idx);
    const singleVal = getEffectiveTime(solve);
    const mo3Val = calcMo3(subList);
    const ao5Val = calcAverage(subList, 5);
    const ao12Val = calcAverage(subList, 12);
    const ao100Val = calcAverage(subList, 100);

    if (singleVal !== Infinity) allSingles.push(singleVal);
    if (mo3Val !== null && mo3Val !== Infinity) allMo3.push(mo3Val);
    if (ao5Val !== null && ao5Val !== Infinity) allAo5.push(ao5Val);
    if (ao12Val !== null && ao12Val !== Infinity) allAo12.push(ao12Val);
    if (ao100Val !== null && ao100Val !== Infinity) allAo100.push(ao100Val);

    return { solve, singleVal, mo3Val, ao5Val, ao12Val, ao100Val };
  });

  const bestSingle = allSingles.length ? Math.min(...allSingles) : null;
  const bestMo3 = allMo3.length ? Math.min(...allMo3) : null;
  const bestAo5 = allAo5.length ? Math.min(...allAo5) : null;
  const bestAo12 = allAo12.length ? Math.min(...allAo12) : null;
  const bestAo100 = allAo100.length ? Math.min(...allAo100) : null;

  const latest = rowsData[0];
  curSingleEl.textContent = latest ? formatSolve(latest.solve) : "-";
  bestSingleEl.textContent = formatStat(bestSingle);
  curMo3El.textContent = latest ? formatStat(latest.mo3Val) : "-";
  bestMo3El.textContent = formatStat(bestMo3);
  curAo5El.textContent = latest ? formatStat(latest.ao5Val) : "-";
  bestAo5El.textContent = formatStat(bestAo5);
  curAo12El.textContent = latest ? formatStat(latest.ao12Val) : "-";
  bestAo12El.textContent = formatStat(bestAo12);
  curAo100El.textContent = latest ? formatStat(latest.ao100Val) : "-";
  bestAo100El.textContent = formatStat(bestAo100);

  liveAo5El.textContent = latest ? formatStat(latest.ao5Val) : "-";
  liveAo12El.textContent = latest ? formatStat(latest.ao12Val) : "-";

  solveCountEl.textContent = `${allSingles.length}/${solves.length}`;
  sessionMeanEl.textContent = allSingles.length
    ? (allSingles.reduce((a, b) => a + b, 0) / allSingles.length).toFixed(2)
    : "-";

  if (solves.length > 0) {
    lastSolveLabel.textContent = `LẦN #${solves.length} • ${formatSolve(solves[0])}`;
    quickBtns.forEach((b) => {
      b.disabled = false;
      b.classList.toggle("active", b.dataset.quick === solves[0].penalty);
    });
    quickDelBtn.disabled = false;
  } else {
    lastSolveLabel.textContent = "Chưa có lượt giải";
    quickBtns.forEach((b) => {
      b.disabled = true;
      b.classList.remove("active");
    });
    quickDelBtn.disabled = true;
  }

  historyBody.innerHTML = "";
  rowsData.forEach((row, index) => {
    const tr = document.createElement("tr");
    const solveNum = solves.length - index;
    const isSinglePB = row.singleVal === bestSingle && bestSingle !== null;

    tr.innerHTML = `
      <td>${solveNum}</td>
      <td class="${isSinglePB ? "pb-text" : ""}">${formatSolve(row.solve)}</td>
      <td>${formatStat(row.ao5Val)}</td>
      <td>${formatStat(row.ao12Val)}</td>
    `;
    tr.addEventListener("click", () => openSolveModal(index, solveNum));
    historyBody.appendChild(tr);
  });

  renderTrendChart(rowsData);
}

// 9. VẼ BIỂU ĐỒ SVG XU HƯỚNG 50 LẦN GẦN NHẤT
function renderTrendChart(rowsData) {
  const recent = rowsData.slice(0, 50).reverse();
  const validValues = [];
  recent.forEach((r) => {
    if (r.singleVal !== Infinity) validValues.push(r.singleVal);
    if (r.ao5Val !== null && r.ao5Val !== Infinity) validValues.push(r.ao5Val);
  });

  if (validValues.length < 2) {
    trendChart.innerHTML = `<text x="250" y="60" fill="#484f58" font-size="12" text-anchor="middle" font-family="sans-serif">Giải ít nhất 2 lượt hợp lệ để hiển thị biểu đồ tiến độ</text>`;
    return;
  }

  const minVal = Math.min(...validValues);
  const maxVal = Math.max(...validValues);
  const range = maxVal - minVal || 1;
  const W = 500, H = 110, padX = 36, padY = 14;

  const getX = (i) => padX + (i / (recent.length - 1)) * (W - padX - 10);
  const getY = (val) => H - padY - ((val - minVal) / range) * (H - padY * 2);

  let singlePoints = [];
  let ao5Points = [];

  recent.forEach((r, i) => {
    if (r.singleVal !== Infinity) {
      singlePoints.push(`${getX(i).toFixed(1)},${getY(r.singleVal).toFixed(1)}`);
    }
    if (r.ao5Val !== null && r.ao5Val !== Infinity) {
      ao5Points.push(`${getX(i).toFixed(1)},${getY(r.ao5Val).toFixed(1)}`);
    }
  });

  const lastSingle = singlePoints[singlePoints.length - 1]?.split(",");

  trendChart.innerHTML = `
    <line x1="${padX}" y1="${padY}" x2="${W - 10}" y2="${padY}" stroke="#1c232d" stroke-dasharray="3"/>
    <line x1="${padX}" y1="${H - padY}" x2="${W - 10}" y2="${H - padY}" stroke="#1c232d" stroke-dasharray="3"/>
    <text x="2" y="${padY + 4}" fill="#6e7681" font-size="10" font-family="monospace">${maxVal.toFixed(1)}</text>
    <text x="2" y="${H - padY + 3}" fill="#6e7681" font-size="10" font-family="monospace">${minVal.toFixed(1)}</text>
    <polyline fill="none" stroke="#64748b" stroke-width="1.5" points="${singlePoints.join(" ")}"/>
    ${ao5Points.length > 1 ? `<polyline fill="none" stroke="#10b981" stroke-width="2.2" points="${ao5Points.join(" ")}"/>` : ""}
    ${lastSingle ? `<circle cx="${lastSingle[0]}" cy="${lastSingle[1]}" r="3.5" fill="#34d399"/>` : ""}
  `;
}

// 10. SỰ KIỆN CÁC NÚT ĐIỀU KHIỂN
cubeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tab.blur();
    if (state === "RUNNING" || state === "INSPECTION") return;
    cubeTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentCube = tab.dataset.cube;
    sidebarCubeLabel.textContent = `${currentCube}x${currentCube[0]}`;
    timerDisplay.textContent = "0.00";
    loadSolves();
    saveAndRender();
    generateScramble();
  });
});

inspectionToggle.addEventListener("click", () => {
  inspectionToggle.blur();
  clearInterval(inspectionInterval);
  clearTimeout(holdTimeout);
  clearAllClasses();
  state = "IDLE";
  timerDisplay.textContent = "0.00";

  inspectionEnabled = !inspectionEnabled;
  inspectionToggle.classList.toggle("active", inspectionEnabled);
  inspectionStatus.textContent = inspectionEnabled ? "BẬT" : "TẮT";
  timerHint.textContent = inspectionEnabled
    ? "Nhấn Space (hoặc chạm) để đếm ngược Quan sát 15s"
    : "Giữ Space (hoặc chạm giữ vào số) 0.4s đến khi chuyển xanh, thả ra để chạy";
});

quickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.blur();
    if (solves.length === 0) return;
    solves[0].penalty = btn.dataset.quick;
    timerDisplay.textContent = formatSolve(solves[0]);
    saveAndRender();
  });
});

quickDelBtn.addEventListener("click", () => {
  quickDelBtn.blur();
  if (solves.length === 0) return;
  solves.shift();
  timerDisplay.textContent = solves.length ? formatSolve(solves[0]) : "0.00";
  saveAndRender();
});

function openSolveModal(index, solveNum) {
  selectedSolveIndex = index;
  const solve = solves[index];
  modalTitle.textContent = `Chi tiết lượt #${solveNum}`;
  modalTime.textContent = formatSolve(solve);
  modalScramble.textContent = solve.scramble;
  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

penaltyBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (selectedSolveIndex === null) return;
    solves[selectedSolveIndex].penalty = btn.dataset.penalty;
    modalTime.textContent = formatSolve(solves[selectedSolveIndex]);
    if (selectedSolveIndex === 0) timerDisplay.textContent = formatSolve(solves[0]);
    saveAndRender();
  });
});

deleteSolveBtn.addEventListener("click", () => {
  if (selectedSolveIndex === null) return;
  solves.splice(selectedSolveIndex, 1);
  modal.classList.add("hidden");
  saveAndRender();
});

// Sao chép, Nhập & Xuất dữ liệu JSON
copyStatsBtn.addEventListener("click", () => {
  copyStatsBtn.blur();
  if (solves.length === 0) return;
  const text = `QA Rubik (${currentCube}) | Đơn tốt nhất: ${bestSingleEl.textContent} | Ao5 tốt nhất: ${bestAo5El.textContent} | Ao12 tốt nhất: ${bestAo12El.textContent}`;
  navigator.clipboard.writeText(text);
  copyStatsBtn.textContent = "Đã chép!";
  setTimeout(() => (copyStatsBtn.textContent = "Chép"), 1500);
});

importBtn.addEventListener("click", () => {
  importBtn.blur();
  importFileInput.click();
});

importFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target.result);
      if (!Array.isArray(importedData)) {
        throw new Error("Định dạng file không hợp lệ");
      }

      const validSolves = importedData
        .filter((item) => item && typeof item.time === "number")
        .map((item) => ({
          time: item.time,
          penalty: ["OK", "+2", "DNF"].includes(item.penalty) ? item.penalty : "OK",
          scramble: typeof item.scramble === "string" ? item.scramble : "Dữ liệu đã nhập"
        }));

      if (validSolves.length === 0) {
        alert("File không chứa dữ liệu thành tích hợp lệ!");
        return;
      }

      if (confirm(`Tìm thấy ${validSolves.length} lượt giải cho ${currentCube}. Bấm OK để gộp vào danh sách hiện tại (hoặc Hủy để bỏ qua).`)) {
        solves = [...validSolves, ...solves];
        saveAndRender();
        alert(`Đã nhập thành công ${validSolves.length} lượt giải!`);
      }
    } catch (err) {
      alert("Lỗi đọc file! Vui lòng chọn đúng file .json đã xuất từ QA Rubik.");
    } finally {
      importFileInput.value = "";
    }
  };
  reader.readAsText(file);
});

exportBtn.addEventListener("click", () => {
  exportBtn.blur();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(solves, null, 2));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = `qa-rubik-${currentCube}-backup.json`;
  a.click();
});

newScrambleBtn.addEventListener("click", () => {
  newScrambleBtn.blur();
  generateScramble();
});

clearHistoryBtn.addEventListener("click", () => {
  clearHistoryBtn.blur();
  if (solves.length === 0) return;
  if (confirm(`Xóa toàn bộ lịch sử giải ${currentCube}?`)) {
    solves = [];
    timerDisplay.textContent = "0.00";
    saveAndRender();
  }
});

// Khởi chạy
loadSolves();
saveAndRender();
generateScramble();