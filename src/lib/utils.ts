import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(isoDateString?: string) {
  if (!isoDateString) return "";
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function urlBase64ToUint8Array(base64String: string) {
  console.log("base64String", base64String);
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
import { read, utils } from "xlsx";
export function xlsx2Json(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return reject("No data");
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // 转换各cell为字符串
      const json = utils.sheet_to_json(sheet).map((item: any) => {
        const newItem: any = {};
        for (const key in item) {
          newItem[key] = String(item[key]);
        }
        return newItem;
      });
      resolve(json);
    };
  });
}
