"use client";
import { Home, PlusCircle, User2 } from "lucide-react";
import { ReactNode, createContext, useState } from "react";

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
  const links = [
    {
      href: "/client",
      label: "首页",
      icon: <Home size={26} />,
      iconSelected: <Home size={26} strokeWidth={2.5} />,
    },
    {
      href: "/client",
      label: "Add",
      icon: <PlusCircle size={30} strokeWidth={1.8} />,
    },
    {
      href: "/client/info",
      label: "个人信息",
      icon: <User2 size={26} />,
      iconSelected: <User2 size={26} strokeWidth={2.5} />,
    },
  ];
  const [currentLink, setCurrentLink] = useState<Link>(links[0]);
  return (
    <NavLinksContext.Provider value={{ links, currentLink, setCurrentLink }}>
      {children}
    </NavLinksContext.Provider>
  );
};
