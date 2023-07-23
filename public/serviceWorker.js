const MAINTENANCE_MANAGEMENT_SYSTEM_CACHE = "maintenance-management-system";

self.addEventListener("activate", function (event) {
  console.log("ServiceWorker activated.");
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(MAINTENANCE_MANAGEMENT_SYSTEM_CACHE).then(function (cache) {
      return cache.addAll([]);
    }),
  );
});

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response || fetch(event.request);
//     }),
//   );
// });
