"use client";
import AMapLoader from "@heycar/amap-jsapi-loader";
import { useEffect, useRef } from "react";
import "./MapStyle.css";
interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
export interface MapConfigureInter {
  setMapStyle: any;
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

export default function Map({ height }: { height: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  let map: MapConfigureInter;
  // 注入高德地图安全码
  //   useEffect(() => {
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.textContent = `window._AMapSecurityConfig = {securityJsCode:"3741a106252939f5dbc7076539dc79fb"}`;

  //     document.head.appendChild(script);
  //     return () => {
  //       document.head.removeChild(script);
  //     };
  //   }, []);
  // 加载高德地图
  useEffect(() => {
    AMapLoader.load({
      key: "4f77082b3a2e028ff3c03d0fe2742b78",
      version: "2.0",
      plugins: ["AMap.ToolBar", "AMap.MarkerCluster", "AMap.ControlBar"],
    })
      .then((AMap) => {
        map = new AMap.Map(mapRef.current, {
          mapstyle: "amap://styles/dark",
          zoom: 17,
          pitch: 50,
          viewMode: "3D",
          center: [108.288966, 22.85242],
          resizeEnable: true,
          // 地图模式
          expandZoomRange: true,
          skyColor: "#f9f6ee",
        });
        map.addControl!(new AMap.ToolBar({ position: "LT" }));
        map.addControl!(new AMap.ControlBar({ position: "LB" }));
      })
      .catch((e) => {
        console.log(e);
      });

    // 卸载地图
    return () => {
      map && map.destroy!();
    };
  }, []);

  //  窗口大小变化时，重新设置地图高度
  useEffect(() => {
    mapRef.current!.style.height = height + "px";
  }, [height]);

  return <div ref={mapRef}></div>;
}
