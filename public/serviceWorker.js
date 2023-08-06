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

self.addEventListener("push", function (event) {
  console.log("Push received: ", event);
  if (event.data) {
    // 判断event.data的类型
    const data = event.data.json();

    console.log("收到推送数据:", data);
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
      }),
    );
  }
});
self.addEventListener("notificationclick", function (event) {
  let url = "https://app.erichuang.art";
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (windowClients) {
        console.log(windowClients);
        for (let i = 0; i < windowClients.length; i++) {
          let client = windowClients[i];
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
