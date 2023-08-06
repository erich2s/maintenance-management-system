import AMapLoader from "@heycar/amap-jsapi-loader";
import { useEffect, useRef, useState } from "react";
import "./MapStyle.css";
import { useWindowSize } from "react-use";
import useUncompletedReports from "@/hooks/useUncompletedReports";
import { ReportItemType } from "../../../types/reportItemType";
import pin from "@/assets/pin.png";
import mapPin from "@/assets/map-pin.png";
import { Spinner } from "../Spinner";
interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
export interface MapConfigureInter {
  setViewMode: any;
  setMapStyle: any;
  clearMap: Fn;
  on: Fn;
  destroy?: Fn;
  clearEvents?: Fn;
  addControl?: Fn;
  setCenter?: Fn;
  getCenter?: Fn;
  setZoom?: Fn;
  getZoom?: Fn;
  setPitch?: Fn;
  getPitch?: Fn;
  plugin?: Fn;
  add?: Fn;
  addLayer?: Fn;
  getAMapManager?: Fn;
}

export default function Map() {
  (window as any)._AMapSecurityConfig = {
    securityJsCode: "3741a106252939f5dbc7076539dc79fb",
  };

  const mapRef = useRef<HTMLDivElement>(null);
  // NOTE:窗口大小从父组件传下来的时候，会有延迟，导致地图高度计算错误从而有离奇的bug，所以需要在子组件中获取窗口大小
  const { width, height } = useWindowSize();
  // 窗口大小变化时，重新设置地图高度
  useEffect(() => {
    // 减去header的高度
    mapRef.current!.style.height = height - 64 + "px";
  }, [width, height]);

  const [mapLoaded, setMapLoaded] = useState(false);
  const { locations } = useUncompletedReports();
  // 加载地图函数，在这里可以设置地图
  async function loadMap() {
    (window as any).AMap = await AMapLoader.load({
      key: "4f77082b3a2e028ff3c03d0fe2742b78",
      version: "2.0",
    });
    (window as any).map = new (window as any).AMap.Map(mapRef.current, {
      resizeEnable: true,
      skyColor: "#f9f6ee",
      viewMode: "3D",
      pitch: 45,
    });
    (window as any).map.setCenter([108.292, 22.8436]);
    (window as any).map.setZoom(15.5);
    (window as any).map.plugin(["AMap.ToolBar", "AMap.ControlBar"], () => {
      // 添加 工具条 和 缩放控件
      (window as any).map.addControl(
        new (window as any).AMap.ToolBar({
          liteStyle: true,
          position: {
            bottom: "100px",
            right: "32px",
          },
        }),
      );
      (window as any).map.addControl(
        new (window as any).AMap.ControlBar({ position: "RB" }),
      );
    });
    (window as any).map.setMapStyle(
      "amap://styles/520502358523cd64bd082a98087e4c10",
    );
    setMapLoaded(true);
    console.log("地图加载完成");
  }
  // 加载高德地图
  useEffect(() => {
    console.log("开始加载地图");
    loadMap();
    return () => {
      // 销毁地图实例
      try {
        (window as any).map && (window as any).map.destroy();
        console.log("销毁地图实例");
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  // 加载点
  useEffect(() => {
    try {
      (window as any).map.clearMap();
      locations.forEach((loc) => {
        const marker = new (window as any).AMap.Marker({
          position: [loc.lon, loc.lat],
          anchor: "bottom-center",
          icon: mapPin.src,
        });
        marker.setLabel({
          offset: new (window as any).AMap.Pixel(5, 0),
          direction: "right",
          content: `<div class="text-center  text-xs bg-white border rounded-md shadow-xl">
        <div class="w-full border-b py-[4px] font-bold">${loc.name}</div>
        <div class="p-1.5"><span class="text-primary ">新的:${
          loc.pendingCount || 0
        }</span> / <span class="text-yellow-700 ">施工中:${
          loc.acceptedCount || 0
        }</span></div>
        </div>`,
        });
        marker.on("click", () => {
          (window as any).map.setCenter([loc.lon, loc.lat]);
          (window as any).map.setZoom(19.5);
        });
        (window as any).map.add(marker);
      });
    } catch (e) {
      // 装作看不见
      console.log(e);
    }
  }, [locations, mapLoaded]);
  return (
    <div ref={mapRef}>
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}
