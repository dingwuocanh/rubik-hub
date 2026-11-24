(function initCustomNotes() {
  const NOTES_KEY = "qa_rubik_notes";
  let notesData = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
  let editingId = null;

  // 1. Tạo Modal nhập ghi chú & công thức phụ
  const modal = document.createElement("div");
  modal.id = "note-modal";
  modal.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.75);display:none;align-items:center;justify-content:center;z-index:999;padding:16px;";
  modal.innerHTML = `
    <div style="background:#11161d;border:1px solid #2b3544;border-radius:12px;width:100%;max-width:440px;padding:20px;display:flex;flex-direction:column;gap:14px;box-shadow:0 12px 32px rgba(0,0,0,0.6);">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h3 id="note-modal-title" style="color:#f0f6fc;font-size:1.05rem;margin:0;">Ghi chú trường hợp</h3>
        <button type="button" id="note-close-btn" style="background:transparent;border:none;color:#8b949e;font-size:1.3rem;cursor:pointer;">✕</button>
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:0.8rem;font-weight:700;color:#8b949e;">CÔNG THỨC PHỤ THUẬN TAY (TÙY CHỌN)</label>
        <input type="text" id="note-alt-algo" placeholder="VD: R U R' U' R' F R2 U' R' U' R U R' F'" style="background:#0d1117;border:1px solid #2b3544;color:#34d399;padding:9px 12px;border-radius:8px;font-family:monospace;font-size:0.9rem;">
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:0.8rem;font-weight:700;color:#8b949e;">MẸO NHẬN DIỆN NHANH</label>
        <textarea id="note-tip-text" rows="3" placeholder="VD: Đèn pha bên trái, khối 2x1 nằm ở mặt sau..." style="background:#0d1117;border:1px solid #2b3544;color:#f0f6fc;padding:9px 12px;border-radius:8px;font-size:0.88rem;resize:vertical;"></textarea>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:4px;">
        <button type="button" id="note-delete-btn" style="background:transparent;border:1px solid rgba(248,81,73,0.45);color:#f85149;padding:8px 12px;border-radius:7px;font-size:0.84rem;font-weight:600;cursor:pointer;">Xóa ghi chú</button>
        <div style="display:flex;gap:8px;">
          <button type="button" id="note-cancel-btn" style="background:#161c24;border:1px solid #2b3544;color:#c9d1d9;padding:8px 14px;border-radius:7px;font-size:0.84rem;cursor:pointer;">Hủy</button>
          <button type="button" id="note-save-btn" style="background:#10b981;border:none;color:#0d1117;padding:8px 16px;border-radius:7px;font-size:0.84rem;font-weight:700;cursor:pointer;">Lưu lại</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const titleEl = document.getElementById("note-modal-title");
  const altInput = document.getElementById("note-alt-algo");
  const tipInput = document.getElementById("note-tip-text");
  const delBtn = document.getElementById("note-delete-btn");

  function openModal(id, caseTitle) {
    editingId = id;
    const existing = notesData[id] || { alt: "", tip: "" };
    titleEl.textContent = `Ghi chú • ${caseTitle}`;
    altInput.value = existing.alt || "";
    tipInput.value = existing.tip || "";
    delBtn.style.display = existing.alt || existing.tip ? "inline-block" : "none";
    modal.style.display = "flex";
    altInput.focus();
  }

  function closeModal() {
    modal.style.display = "none";
    editingId = null;
  }

  document.getElementById("note-close-btn").onclick = closeModal;
  document.getElementById("note-cancel-btn").onclick = closeModal;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.getElementById("note-save-btn").addEventListener("click", () => {
    if (!editingId) return;
    const alt = altInput.value.trim();
    const tip = tipInput.value.trim();
    if (!alt && !tip) {
      delete notesData[editingId];
    } else {
      notesData[editingId] = { alt, tip };
    }
    localStorage.setItem(NOTES_KEY, JSON.stringify(notesData));
    closeModal();
    enhanceAllCards();
  });

  delBtn.addEventListener("click", () => {
    if (!editingId) return;
    delete notesData[editingId];
    localStorage.setItem(NOTES_KEY, JSON.stringify(notesData));
    closeModal();
    enhanceAllCards();
  });

  // 2. Gắn nút & hiển thị ghi chú lên từng thẻ công thức
  function enhanceAllCards() {
    const cards = document.querySelectorAll(".formula-card");
    cards.forEach((card) => {
      const learnBtn = card.querySelector(".learn-btn");
      const actions = card.querySelector(".card-actions");
      if (!learnBtn || !actions) return;

      const id = learnBtn.dataset.id;
      const caseTitle = card.querySelector("h3")?.textContent || id;
      const saved = notesData[id];

      // Gắn nút "✎ Ghi chú" nếu chưa có
      let noteBtn = actions.querySelector(".custom-note-btn");
      if (!noteBtn) {
        noteBtn = document.createElement("button");
        noteBtn.type = "button";
        noteBtn.className = "icon-btn custom-note-btn";
        noteBtn.title = "Thêm công thức phụ & mẹo nhận diện";
        actions.insertBefore(noteBtn, learnBtn);
      }

      noteBtn.textContent = saved ? "✎ Đã ghi chú" : "✎ Ghi chú";
      noteBtn.classList.toggle("has-note", Boolean(saved));
      noteBtn.onclick = () => openModal(id, caseTitle);

      // Hiển thị nội dung ghi chú bên dưới thẻ
      let box = card.querySelector(".custom-note-box");
      if (!saved) {
        if (box) box.remove();
        return;
      }

      if (!box) {
        box = document.createElement("div");
        box.className = "custom-note-box";
        card.appendChild(box);
      }

      box.innerHTML = `
        ${saved.alt ? `<div class="note-row"><span class="note-badge">CT Phụ</span><code>${saved.alt}</code></div>` : ""}
        ${saved.tip ? `<div class="note-row"><span class="note-badge tip">Mẹo</span><span>${saved.tip}</span></div>` : ""}
      `;
    });
  }

  // Theo dõi khi danh sách công thức render hoặc lọc lại
  const observer = new MutationObserver(() => enhanceAllCards());
  observer.observe(document.body, { childList: true, subtree: true });
  enhanceAllCards();
})();