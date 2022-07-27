import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { DesktopItemType } from "../types";

export type DesktopContextType = {
  gridFragsQuantity: number;
  desktopItems: DesktopItemType[];
  setDesktopItems: Dispatch<SetStateAction<DesktopItemType[]>>;
};

const desktopContextDefault = {
  gridFragsQuantity: 0,
  desktopItems: [],
  setDesktopItems: () => {},
};

export const DesktopContext = createContext<DesktopContextType>(
  desktopContextDefault
);

export default function DesktopContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [screenSize, setScreeSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const setDimension = () => {
    setScreeSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const gridFragsQuantity =
    Math.floor(screenSize.width / 80) *
    Math.floor((screenSize.height - 31) / 80);

  const [desktopItems, setDesktopItems] = useState<DesktopItemType[]>([
    {
      item: "calculator",
      index: 0,
    },
    {
      item: "trash",
      index: gridFragsQuantity - 1,
    },
  ]);

  return (
    <DesktopContext.Provider
      value={{ gridFragsQuantity, desktopItems, setDesktopItems }}>
      {children}
    </DesktopContext.Provider>
  );
}
