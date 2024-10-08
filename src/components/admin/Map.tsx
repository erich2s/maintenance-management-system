import "@amap/amap-jsapi-types";
import AMapLoader from "@heycar/amap-jsapi-loader";
import { useEffect, useRef, useState } from "react";
import "./MapStyle.css";
import { useWindowSize } from "react-use";
import useUncompletedReports from "@/hooks/useUncompletedReports";
import mapPin from "@/assets/map-pin.png";
import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import { Home } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
let isFirstLoad = true;

export default function Map() {
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
    (window as any)._AMapSecurityConfig = {
      securityJsCode: process.env.NEXT_PUBLIC_AMAP_JSCODE,
    };
    window.AMap = await AMapLoader.load({
      key: process.env.NEXT_PUBLIC_AMAP_KEY,
      version: "2.0",
    });
    const mapOptions: AMap.MapOptions = {
      skyColor: "#f9f6ee",
      viewMode: "3D",
      pitch: 45,
      center: [108.292, 22.8436],
    };

    window.map = new window.AMap.Map(mapRef.current!, mapOptions);
    window.map.setZoom(15.5, !isFirstLoad);
    isFirstLoad = false;
    (window as any).map.plugin(["AMap.ToolBar"], () => {
      // 添加 工具条 和 缩放控件
      window.map.addControl(
        new (window as any).AMap.ToolBar({
          liteStyle: true,
          position: {
            bottom: "20px",
            right: "32px",
          },
        }),
      );
    });
    window.map.setMapStyle("amap://styles/520502358523cd64bd082a98087e4c10");
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
        window.map && window.map.destroy();
        console.log("销毁地图实例");
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  // 加载点
  useEffect(() => {
    try {
      window.map.clearMap();
      locations.forEach((loc) => {
        const marker: AMap.Marker = new window.AMap.Marker({
          position: [loc.lon, loc.lat],
          anchor: "bottom-center",
          icon: mapPin.src,
        });
        marker.setLabel({
          offset: new window.AMap.Pixel(5, 0),
          direction: "right",
          content: `<div class="text-center  text-xs bg-white border rounded-md shadow-xl">
        <div class="w-full border-b py-[4px] font-bold">${loc.name}</div>
        <div class="p-1.5"><span class="text-primary">新的:${loc.pendingCount}</span> / <span class="text-yellow-700 ">施工中:${loc.acceptedCount}</span></div>
        </div>`,
        });
        marker.on("click", () => {
          window.map.setCenter([loc.lon, loc.lat]);
          window.map.setZoom(19.5);
          window.map.setPitch(55);
          window.map.setRotation(
            window.map.getRotation() - (window.map.getRotation() % 360) + 45,
          );
        });
        window.map.add(marker);
      });
    } catch (e) {
      // 装作看不见
      // console.log(e);
    }
  }, [locations, mapLoaded]);

  return (
    <>
      {mapLoaded && (
        <TooltipProvider delayDuration={350}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="absolute bottom-24    right-[32px] z-50 flex h-fit w-fit flex-col rounded-lg bg-white/90 p-1.5 text-black shadow hover:bg-gray-100 hover:text-black"
                onClick={() => {
                  window.map.setZoom(15.5);
                  window.map.setCenter([108.292, 22.8436]);
                  window.map.setPitch(45);
                  window.map.setRotation(
                    window.map.getRotation() - (window.map.getRotation() % 360),
                  );
                }}
              >
                <Home size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
              回到初始位置
              <Button variant={"outline"} size={"sm"} className="scale-[70%] ">
                H
              </Button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <div
        ref={mapRef}
        id="main-map"
        onKeyDown={(e) => {
          if (e.key === "h") {
            window.map.setZoom(15.5);
            window.map.setCenter([108.292, 22.8436]);
            window.map.setPitch(45);
            window.map.setRotation(
              window.map.getRotation() - (window.map.getRotation() % 360),
            );
          }
          if (e.key === "q") {
            window.map.setRotation(window.map.getRotation() - 45);
          }
          if (e.key === "e") {
            window.map.setRotation(window.map.getRotation() + 45);
          }
        }}
      ></div>
      {mapLoaded ? null : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}
