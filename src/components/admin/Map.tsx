import AMapLoader from "@heycar/amap-jsapi-loader";
// import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect, useRef } from "react";
import "./MapStyle.css";
import dynamic from "next/dynamic";

interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
export interface MapConfigureInter {
  setViewMode: any;
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

  // 加载高德地图
  useEffect(() => {
    console.log("加载地图");
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "3741a106252939f5dbc7076539dc79fb",
    };
    AMapLoader.load({
      key: "4f77082b3a2e028ff3c03d0fe2742b78",
      version: "2.0",
    })
      .then((AMap) => {
        //3D地图有bug，切换页面时会报错，暂时不用
        map = new AMap.Map(mapRef.current, {
          zoom: 17,
          center: [108.29, 22.85242],
          // pitch: 45,
          // viewMode: "3D",
          resizeEnable: true,
          skyColor: "#f9f6ee",
        });
        map.plugin!(["AMap.ToolBar", "AMap.ControlBar"], function () {
          // 添加 工具条 和 缩放控件
          map.addControl!(new AMap.ToolBar({ position: "LT" }));
          map.addControl!(new AMap.ControlBar({ position: "RB" }));
        });
        map.setMapStyle("amap://styles/520502358523cd64bd082a98087e4c10");
      })
      .catch((e) => {
        console.log("地图加载失败", e);
      });

    // 卸载地图
    return () => {
      if (map) {
        // 销毁地图实例
        map.destroy!() && map.clearEvents!("click");
        console.log("销毁地图实例");
      }
    };
  }, []);

  //  窗口大小变化时，重新设置地图高度
  useEffect(() => {
    mapRef.current!.style.height = height + "px";
  }, [height]);

  return <div ref={mapRef}></div>;
}
