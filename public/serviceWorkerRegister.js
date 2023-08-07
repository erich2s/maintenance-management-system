// serviceWorker只能在https和localhost下使用
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    // alert("serviceWorker");
    // 注册service worker
    const register = await navigator.serviceWorker.register(
      "/serviceWorker.js",
    );
    // 注册订阅
    const sub = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BDeQByhHcxy084_JFou3rHlqiSpFvPZhUWjQKb1QlU6TjXL8mJd3usKDsQDzEeZ1HJOuultQgtPRlGOqgrrLnQA",
      ),
    });
    window.sub = sub;
    console.log("Push registered");
    console.log("ServiceWorker registered in scope: ", register.scope);
  });
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
