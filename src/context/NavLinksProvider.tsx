"use client";
import { Home, PlusCircle, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

interface Link {
  href: string;
  label: string;
  icon: ReactNode;
  iconSelected?: ReactNode;
}

interface LinksContextValue {
  links: Link[];
  currentLink?: Link;
  setCurrentLink?: (link: Link) => void;
}

export const NavLinksContext = createContext<LinksContextValue>(
  {} as LinksContextValue,
);

export const NavLinksProvider = ({ children }: { children: ReactNode }) => {
  // 在这里配置路由链接供导航栏使用
  const links: Link[] = [
    {
      href: "/client",
      label: "首页",
      icon: <Home size={26} />,
      iconSelected: <Home size={26} strokeWidth={2.5} />,
    },
    {
      // 其实这个add的href没用，因为add是一个modal，不是一个页面
      href: "/client/add",
      label: "Add",
      icon: <PlusCircle size={30} strokeWidth={1.8} />,
    },
    {
      href: "/client/info",
      label: "个人信息",
      icon: <User2 size={26} />,
      iconSelected: <User2 size={26} strokeWidth={2.5} />,
    },
    {
      href: "/admin",
      label: "首页",
      icon: <Home size={20} />,
    },
    {
      href: "/admin/test",
      label: "测试",
      icon: <User2 size={20} />,
    },
  ];
  const [currentLink, setCurrentLink] = useState<Link>(links[0]);
  const path = usePathname();
  let currentLinkFound = false;
  useEffect(() => {
    links.forEach((link) => {
      if (link.href === path && !currentLinkFound) {
        setCurrentLink!(link);
        currentLinkFound = true;
      }
    });
  }, [path]);
  return (
    <NavLinksContext.Provider value={{ links, currentLink, setCurrentLink }}>
      {children}
    </NavLinksContext.Provider>
  );
};
