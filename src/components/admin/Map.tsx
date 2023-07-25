import AMapLoader from "@heycar/amap-jsapi-loader";
import { useEffect, useRef, useState } from "react";
import "./MapStyle.css";
import { Spinner } from "../Spinner";
import { useWindowSize } from "react-use";
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

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  let map: MapConfigureInter;
  // NOTE:窗口大小从父组件传下来的时候，会有延迟，导致地图高度计算错误从而有离奇的bug，所以需要在子组件中获取窗口大小
  const { width, height } = useWindowSize();
  // 窗口大小变化时，重新设置地图高度
  useEffect(() => {
    // 减去header的高度
    mapRef.current!.style.height = height - 64 + "px";
  }, [width, height]);

  const [mapLoading, setMapLoading] = useState(true);
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
          resizeEnable: true,
          skyColor: "#f9f6ee",
          viewMode: "3D",
          pitch: 45,
        });
        map.setCenter!([108.2892, 22.85242]);
        map.setZoom!(17);
        map.plugin!(["AMap.ToolBar", "AMap.ControlBar"], () => {
          // 添加 工具条 和 缩放控件
          map.addControl!(
            new AMap.ToolBar({
              liteStyle: true,
              position: {
                bottom: "100px",
                right: "32px",
              },
            }),
          );
          map.addControl!(new AMap.ControlBar({ position: "RB" }));
        });
        map.setMapStyle("amap://styles/520502358523cd64bd082a98087e4c10");
      })
      .catch((e) => {
        console.log("地图加载失败", e);
      })
      .finally(() => {
        setMapLoading(false);
        console.log("地图加载完成");
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

  return (
    <>
      <div ref={mapRef}>
        {mapLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
