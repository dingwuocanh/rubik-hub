const CACHE_NAME = "qa-rubik-offline-v1";

// Danh sách toàn bộ file cốt lõi cần lưu để chạy khi mất mạng
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./trainer.html",
  "./timer.html",
  "./manifest.json",
  "./css/style.css",
  "./css/formulas.css",
  "./css/trainer.css",
  "./css/timer.css",
  "./js/formulas.js",
  "./js/custom-notes.js",
  "./js/trainer.js",
  "./js/timer.js",
  "./js/sync.js",
  "./images/logo.png"
];

// 1. Cài đặt & tải trước toàn bộ file vào bộ nhớ máy
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// 2. Dọn dẹp bộ nhớ đệm cũ khi nâng cấp phiên bản
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});


// 3. Có mạng thì tải bản mới & cập nhật cache; mất mạng thì mở từ cache
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    fetch(event.request)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkRes;
      })
      .catch(() =>
        // ignoreSearch: true giúp link dạng trainer.html?case=pll-t vẫn mở được khi offline
        caches.match(event.request, { ignoreSearch: true }).then((cached) => {
          return cached || new Response("", { status: 408 });
        })
      )
  );
});