(function initDataSync() {
  const STORAGE_KEYS = [
    "qa_rubik_learned",
    "qa_rubik_notes",
    "qa_rubik_sessions_v2",
    "qa_rubik_active_session",
    "qa_rubik_trainer_solves"
  ];

  // 1. Gắn nút Sao lưu / Khôi phục vào footer
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const syncBar = document.createElement("div");
  syncBar.style.cssText =
    "margin-top:10px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap;";
  syncBar.innerHTML = `
    <button type="button" id="qa-export-btn" style="background:#161c24;border:1px solid #2b3544;color:#34d399;padding:6px 12px;border-radius:7px;font-size:0.8rem;font-weight:600;cursor:pointer;">
      💾 Sao lưu dữ liệu (.json)
    </button>
    <button type="button" id="qa-import-btn" style="background:#161c24;border:1px solid #2b3544;color:#c9d1d9;padding:6px 12px;border-radius:7px;font-size:0.8rem;font-weight:600;cursor:pointer;">
      📂 Khôi phục từ file
    </button>
    <input type="file" id="qa-import-file" accept=".json,application/json" style="display:none;">
  `;
  footer.appendChild(syncBar);

  // 2. Xuất toàn bộ dữ liệu ra file JSON
  document.getElementById("qa-export-btn").addEventListener("click", (e) => {
    e.target.blur();
    const payload = {
      app: "Q&A RUBIK",
      exportedAt: new Date().toISOString(),
      data: {}
    };

    STORAGE_KEYS.forEach((key) => {
      const val = localStorage.getItem(key);
      if (val !== null) payload.data[key] = val;
    });

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `qa-rubik-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // 3. Nhập dữ liệu từ file JSON
  const fileInput = document.getElementById("qa-import-file");
  document.getElementById("qa-import-btn").addEventListener("click", (e) => {
    e.target.blur();
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (!parsed || parsed.app !== "Q&A RUBIK" || typeof parsed.data !== "object") {
          alert("File không đúng định dạng sao lưu của Q&A RUBIK!");
          return;
        }

        if (!confirm("Khôi phục sẽ ghi đè dữ liệu hiện tại trên trình duyệt này. Bạn chắc chắn chứ?")) {
          return;
        }

        STORAGE_KEYS.forEach((key) => {
          if (parsed.data[key] !== undefined) {
            localStorage.setItem(key, parsed.data[key]);
          }
        });

        alert("Khôi phục dữ liệu thành công! Trang sẽ tải lại để cập nhật.");
        window.location.reload();
      } catch (err) {
        alert("Lỗi đọc file sao lưu. Vui lòng kiểm tra lại file .json!");
      }
    };
    reader.readAsText(file);
    fileInput.value = "";
  });
})();

// Kích hoạt chế độ chạy ngoại tuyến (Offline PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

// Tự động tách nền trắng thành trong suốt cho Logo & Favicon
(function applyTransparentLogo() {
  const img = new Image();
  img.src = "images/logo.png";
  img.onload = () => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);

    try {
      const imgData = ctx.getImageData(0, 0, size, size);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const px = (i / 4) % size;
        const py = Math.floor(i / 4 / size);

        // Xóa watermark góc dưới phải nếu có
        if (px > size * 0.85 && py > size * 0.85 && r > 180 && g > 180 && b > 180) {
          d[i + 3] = 0;
          continue;
        }

        // Chuyển nền trắng tinh thành trong suốt mượt mà
        if (r > 235 && g > 235 && b > 235) {
          const avg = (r + g + b) / 3;
          d[i + 3] = Math.max(0, Math.round((255 - avg) * 12));
        }
      }
      ctx.putImageData(imgData, 0, 0);
      const cleanUrl = canvas.toDataURL("image/png");

      // Cập nhật cho cả icon trên tab và logo trên thanh menu
      document.querySelectorAll("link[rel='icon']").forEach((el) => (el.href = cleanUrl));
      document.querySelectorAll(".brand-logo").forEach((el) => (el.src = cleanUrl));
    } catch (e) {}
  };
})();