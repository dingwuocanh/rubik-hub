// 1. QUẢN LÝ ĐA PHIÊN GIẢI (SESSIONS) & TỰ ĐỘNG CHUYỂN DỮ LIỆU CŨ
const SESSIONS_KEY = "qa_rubik_sessions_v2";
const ACTIVE_SESSION_KEY = "qa_rubik_active_session";

let sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) || "null");

if (!Array.isArray(sessions) || sessions.length === 0) {
  const legacySolves = JSON.parse(localStorage.getItem("qa_rubik_solves") || "[]");
  sessions = [
    { id: "ses-3x3-main", name: "3x3 Chính", puzzle: "333", solves: legacySolves },
    { id: "ses-3x3-oh", name: "3x3 Một tay (OH)", puzzle: "333", solves: [] },
    { id: "ses-2x2", name: "2x2 Tốc độ", puzzle: "222", solves: [] },
    { id: "ses-4x4", name: "4x4", puzzle: "444", solves: [] }
  ];
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

let activeSessionId = localStorage.getItem(ACTIVE_SESSION_KEY) || sessions[0].id;
if (!sessions.some((s) => s.id === activeSessionId)) {
  activeSessionId = sessions[0].id;
}

function getActiveSession() {
  return sessions.find((s) => s.id === activeSessionId) || sessions[0];
}

function saveSessions() {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  localStorage.setItem(ACTIVE_SESSION_KEY, activeSessionId);
}

// 2. BỘ SINH SCRAMBLE CHUẨN CHO 2x2, 3x3, 4x4
function generateScramble(puzzle) {
  const configs = {
    "222": {
      faces: ["R", "U", "F"],
      axis: { R: 0, U: 1, F: 2 },
      len: 9
    },
    "333": {
      faces: ["R", "L", "U", "D", "F", "B"],
      axis: { R: 0, L: 0, U: 1, D: 1, F: 2, B: 2 },
      len: 20
    },
    "444": {
      faces: ["R", "L", "U", "D", "F", "B", "Rw", "Uw", "Fw"],
      axis: { R: 0, L: 0, Rw: 0, U: 1, D: 1, Uw: 1, F: 2, B: 2, Fw: 2 },
      len: 40
    }
  };

  const cfg = configs[puzzle] || configs["333"];
  const mods = ["", "'", "2"];
  const moves = [];
  let prevFace = "";
  let prevAxis = -1;

  while (moves.length < cfg.len) {
    const face = cfg.faces[Math.floor(Math.random() * cfg.faces.length)];
    const ax = cfg.axis[face];
    if (face === prevFace) continue;
    if (ax === prevAxis && moves.length >= 2 && cfg.axis[moves[moves.length - 2].replace(/['2]/g, "")] === ax) {
      continue;
    }
    const mod = mods[Math.floor(Math.random() * mods.length)];
    moves.push(face + mod);
    prevFace = face;
    prevAxis = ax;
  }

  return moves.join(" ");
}

// 3. ÂM THANH CẢNH BÁO WCA (8s & 12s)
function playBeep(freq = 880, duration = 0.14) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

// 4. DOM ELEMENTS & TRẠNG THÁI ĐỒNG HỒ
const sessionSelect = document.getElementById("session-select");
const newSessionBtn = document.getElementById("new-session-btn");
const renameSessionBtn = document.getElementById("rename-session-btn");
const deleteSessionBtn = document.getElementById("delete-session-btn");

const pzBtns = document.querySelectorAll(".pz-btn");
const wcaToggle = document.getElementById("wca-inspection-toggle");
const newScrambleBtn = document.getElementById("new-scramble-btn");
const scrambleTextEl = document.getElementById("scramble-text");

const clockZone = document.getElementById("clock-zone");
const inspectionBadge = document.getElementById("inspection-badge");
const timerDisplay = document.getElementById("timer-display");
const timerHint = document.getElementById("timer-hint");

const lastTimeInfo = document.getElementById("last-time-info");
const penBtns = document.querySelectorAll("[data-pen]");
const delLastBtn = document.getElementById("del-last-btn");

const statBest = document.getElementById("stat-best");
const statMean = document.getElementById("stat-mean");
const statAo5 = document.getElementById("stat-ao5");
const statAo12 = document.getElementById("stat-ao12");
const trendChartEl = document.getElementById("trend-chart");
const solveCountLabel = document.getElementById("solve-count-label");
const solveListBody = document.getElementById("solve-list-body");
const clearSessionBtn = document.getElementById("clear-session-btn");

let currentScramble = "";
let state = "IDLE"; // IDLE | INSPECTING | HOLDING | READY | RUNNING | STOPPED
let holdTimeout = null;
let timerInterval = null;
let inspectionInterval = null;
let startTime = 0;
let inspectionStart = 0;
let inspectionPenalty = "OK";
let beep8Played = false;
let beep12Played = false;

function refreshScramble() {
  const ses = getActiveSession();
  currentScramble = generateScramble(ses.puzzle);
  scrambleTextEl.textContent = currentScramble;
}

function renderSessionUI() {
  const ses = getActiveSession();
  sessionSelect.innerHTML = sessions
    .map((s) => `<option value="${s.id}" ${s.id === ses.id ? "selected" : ""}>${s.name} (${s.solves.length})</option>`)
    .join("");

  pzBtns.forEach((b) => b.classList.toggle("active", b.dataset.pz === ses.puzzle));
}

// Sự kiện quản lý Session
sessionSelect.addEventListener("change", () => {
  activeSessionId = sessionSelect.value;
  saveSessions();
  renderSessionUI();
  refreshScramble();
  renderStatsAndHistory();
  sessionSelect.blur();
});

newSessionBtn.addEventListener("click", () => {
  newSessionBtn.blur();
  const name = prompt("Nhập tên phiên giải mới (VD: 3x3 Luyện Cross):");
  if (!name || !name.trim()) return;
  const curPz = getActiveSession().puzzle;
  const newSes = {
    id: "ses-" + Date.now(),
    name: name.trim(),
    puzzle: curPz,
    solves: []
  };
  sessions.push(newSes);
  activeSessionId = newSes.id;
  saveSessions();
  renderSessionUI();
  refreshScramble();
  renderStatsAndHistory();
});

renameSessionBtn.addEventListener("click", () => {
  renameSessionBtn.blur();
  const ses = getActiveSession();
  const newName = prompt("Đổi tên phiên giải:", ses.name);
  if (!newName || !newName.trim()) return;
  ses.name = newName.trim();
  saveSessions();
  renderSessionUI();
});

deleteSessionBtn.addEventListener("click", () => {
  deleteSessionBtn.blur();
  if (sessions.length <= 1) {
    alert("Cần giữ lại ít nhất 1 phiên giải!");
    return;
  }
  const ses = getActiveSession();
  if (!confirm(`Xóa toàn bộ phiên "${ses.name}" và ${ses.solves.length} lượt giải bên trong?`)) return;
  sessions = sessions.filter((s) => s.id !== ses.id);
  activeSessionId = sessions[0].id;
  saveSessions();
  renderSessionUI();
  refreshScramble();
  renderStatsAndHistory();
});

pzBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.blur();
    const ses = getActiveSession();
    ses.puzzle = btn.dataset.pz;
    saveSessions();
    renderSessionUI();
    refreshScramble();
  });
});

newScrambleBtn.addEventListener("click", () => {
  newScrambleBtn.blur();
  refreshScramble();
});

// 5. LOGIC KIỂM TRA WCA 15s & BẤM GIỜ
function startInspection() {
  state = "INSPECTING";
  inspectionStart = performance.now();
  inspectionPenalty = "OK";
  beep8Played = false;
  beep12Played = false;

  inspectionBadge.classList.remove("hidden");
  timerDisplay.classList.add("inspecting");
  timerDisplay.textContent = "15";
  timerHint.textContent = "Đang quan sát... Giữ Space 0.4s rồi thả ra để bắt đầu giải";

  inspectionInterval = setInterval(() => {
    const elapsed = (performance.now() - inspectionStart) / 1000;
    if (elapsed >= 8 && !beep8Played) {
      beep8Played = true;
      playBeep(880, 0.15);
    }
    if (elapsed >= 12 && !beep12Played) {
      beep12Played = true;
      playBeep(1100, 0.12);
      setTimeout(() => playBeep(1100, 0.12), 160);
    }

    if (elapsed < 15) {
      inspectionPenalty = "OK";
      if (state !== "HOLDING" && state !== "READY") {
        timerDisplay.textContent = Math.ceil(15 - elapsed);
      }
    } else if (elapsed < 17) {
      inspectionPenalty = "+2";
      if (state !== "HOLDING" && state !== "READY") {
        timerDisplay.textContent = "+2";
      }
    } else {
      inspectionPenalty = "DNF";
      clearInterval(inspectionInterval);
      inspectionInterval = null;
      inspectionBadge.classList.add("hidden");
      timerDisplay.classList.remove("inspecting", "holding", "ready");
      recordSolve(0, "DNF");
      state = "IDLE";
    }
  }, 50);
}

function handleHoldStart() {
  clearTimeout(holdTimeout);
  if (state === "IDLE") {
    if (wcaToggle.checked) {
      // Nếu bật kiểm tra WCA, bấm Space lần đầu để bắt đầu đếm ngược 15s
      startInspection();
      return;
    }
    state = "HOLDING";
    timerDisplay.classList.add("holding");
    holdTimeout = setTimeout(() => {
      if (state === "HOLDING") {
        state = "READY";
        timerDisplay.classList.remove("holding");
        timerDisplay.classList.add("ready");
      }
    }, 400);
  } else if (state === "INSPECTING") {
    state = "HOLDING";
    timerDisplay.classList.remove("inspecting");
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
    state = inspectionInterval ? "INSPECTING" : "IDLE";
    if (state === "INSPECTING") timerDisplay.classList.add("inspecting");
  } else if (state === "READY") {
    if (inspectionInterval) {
      clearInterval(inspectionInterval);
      inspectionInterval = null;
    }
    inspectionBadge.classList.add("hidden");
    timerDisplay.classList.remove("holding", "ready", "inspecting");
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

  const finalSec = parseFloat(((performance.now() - startTime) / 1000).toFixed(2));
  const pen = wcaToggle.checked ? inspectionPenalty : "OK";
  inspectionPenalty = "OK";
  recordSolve(finalSec, pen);
}

function recordSolve(timeSec, penalty) {
  const ses = getActiveSession();
  const solve = {
    time: timeSec,
    penalty: penalty,
    scramble: currentScramble,
    date: new Date().toISOString()
  };

  ses.solves.unshift(solve);
  saveSessions();
  timerDisplay.textContent = formatTime(solve);
  timerHint.textContent = "Giữ phím Space (hoặc chạm giữ vào số) 0.4s để tiếp tục";
  refreshScramble();
  renderSessionUI();
  renderStatsAndHistory();
}

// 6. SỰ KIỆN BÀN PHÍM (CHẶN CUỘN SPACE + PHÍM TẮT CSTIMER)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault();
  }

  // Bộ phím tắt Alt + 2 / D / Z / N (chỉ chạy khi không đang bấm giờ)
  if (e.altKey && state === "IDLE") {
    const ses = getActiveSession();
    if (e.code === "Digit2" && ses.solves.length > 0) {
      e.preventDefault();
      ses.solves[0].penalty = ses.solves[0].penalty === "+2" ? "OK" : "+2";
      timerDisplay.textContent = formatTime(ses.solves[0]);
      saveSessions();
      renderStatsAndHistory();
      return;
    }
    if (e.code === "KeyD" && ses.solves.length > 0) {
      e.preventDefault();
      ses.solves[0].penalty = ses.solves[0].penalty === "DNF" ? "OK" : "DNF";
      timerDisplay.textContent = formatTime(ses.solves[0]);
      saveSessions();
      renderStatsAndHistory();
      return;
    }
    if (e.code === "KeyZ" && ses.solves.length > 0) {
      e.preventDefault();
      ses.solves.shift();
      timerDisplay.textContent = ses.solves.length ? formatTime(ses.solves[0]) : "0.00";
      saveSessions();
      renderSessionUI();
      renderStatsAndHistory();
      return;
    }
    if (e.code === "KeyN") {
      e.preventDefault();
      refreshScramble();
      return;
    }
  }

  if (e.repeat) return;

  if (state === "RUNNING") {
    stopTimer();
    state = "STOPPED";
    return;
  }

  if (e.code === "Space" || e.key === " ") {
    if (document.activeElement && ["BUTTON", "SELECT"].includes(document.activeElement.tagName)) {
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

// Cảm ứng trên điện thoại
clockZone.addEventListener("touchstart", (e) => {
  if (state === "IDLE" || state === "INSPECTING") {
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

// 7. THỐNG KÊ, BIỂU ĐỒ SVG & BẢNG LỊCH SỬ
function getEff(s) {
  if (s.penalty === "DNF") return Infinity;
  return s.penalty === "+2" ? s.time + 2 : s.time;
}

function formatTime(s) {
  if (s.penalty === "DNF") return "DNF";
  if (s.penalty === "+2") return (s.time + 2).toFixed(2) + "+";
  return s.time.toFixed(2);
}

function calcAoN(list, startIdx, n) {
  if (list.length - startIdx < n) return "-";
  const slice = list.slice(startIdx, startIdx + n).map(getEff);
  if (slice.filter((v) => v === Infinity).length >= 2) return "DNF";
  slice.sort((a, b) => a - b);
  const sum = slice.slice(1, n - 1).reduce((a, b) => a + b, 0);
  return (sum / (n - 2)).toFixed(2);
}

function renderTrendSVG(solves) {
  const valid = solves
    .slice(0, 30)
    .reverse()
    .map(getEff)
    .filter((v) => v !== Infinity);

  if (valid.length < 2) {
    trendChartEl.innerHTML = "Cần ít nhất 2 lượt hợp lệ để vẽ biểu đồ";
    return;
  }

  const w = 300;
  const h = 80;
  const pad = 10;
  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const range = max - min || 1;

  const pts = valid.map((val, idx) => {
    const x = pad + (idx / (valid.length - 1)) * (w - pad * 2);
    const y = h - pad - ((val - min) / range) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  trendChartEl.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <polyline fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${pts.join(" ")}" />
    </svg>
  `;
}

function renderStatsAndHistory() {
  const ses = getActiveSession();
  const list = ses.solves;
  const valid = list.map(getEff).filter((v) => v !== Infinity);

  statBest.textContent = valid.length ? Math.min(...valid).toFixed(2) : "-";
  statMean.textContent = valid.length ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2) : "-";
  statAo5.textContent = calcAoN(list, 0, 5);
  statAo12.textContent = calcAoN(list, 0, 12);
  solveCountLabel.textContent = `LỊCH SỬ (${valid.length}/${list.length})`;

  renderTrendSVG(list);

  if (list.length > 0) {
    const last = list[0];
    lastTimeInfo.textContent = `Lượt gần nhất: ${formatTime(last)}`;
    penBtns.forEach((b) => {
      b.disabled = false;
      b.classList.toggle("active", b.dataset.pen === last.penalty);
    });
    delLastBtn.disabled = false;
  } else {
    lastTimeInfo.textContent = "Chưa có lượt giải nào";
    penBtns.forEach((b) => {
      b.disabled = true;
      b.classList.remove("active");
    });
    delLastBtn.disabled = true;
  }

  solveListBody.innerHTML = list
    .map((s, idx) => `
      <tr>
        <td>${list.length - idx}</td>
        <td>${formatTime(s)}</td>
        <td>${calcAoN(list, idx, 5)}</td>
        <td><button type="button" class="row-del-btn" data-idx="${idx}" title="Xóa lượt này">✕</button></td>
      </tr>
    `)
    .join("");
}

// Nút phạt nhanh trên thanh công cụ
penBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.blur();
    const ses = getActiveSession();
    if (ses.solves.length === 0) return;
    ses.solves[0].penalty = btn.dataset.pen;
    timerDisplay.textContent = formatTime(ses.solves[0]);
    saveSessions();
    renderStatsAndHistory();
  });
});

delLastBtn.addEventListener("click", () => {
  delLastBtn.blur();
  const ses = getActiveSession();
  if (ses.solves.length === 0) return;
  ses.solves.shift();
  timerDisplay.textContent = ses.solves.length ? formatTime(ses.solves[0]) : "0.00";
  saveSessions();
  renderSessionUI();
  renderStatsAndHistory();
});

solveListBody.addEventListener("click", (e) => {
  if (!e.target.classList.contains("row-del-btn")) return;
  const idx = parseInt(e.target.dataset.idx, 10);
  const ses = getActiveSession();
  ses.solves.splice(idx, 1);
  timerDisplay.textContent = ses.solves.length ? formatTime(ses.solves[0]) : "0.00";
  saveSessions();
  renderSessionUI();
  renderStatsAndHistory();
});

clearSessionBtn.addEventListener("click", () => {
  clearSessionBtn.blur();
  const ses = getActiveSession();
  if (ses.solves.length === 0) return;
  if (confirm(`Xóa toàn bộ ${ses.solves.length} lượt giải trong phiên "${ses.name}"?`)) {
    ses.solves = [];
    timerDisplay.textContent = "0.00";
    saveSessions();
    renderSessionUI();
    renderStatsAndHistory();
  }
});

// Khởi chạy
renderSessionUI();
refreshScramble();
renderStatsAndHistory();