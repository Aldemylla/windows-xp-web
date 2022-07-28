import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { DesktopItemName, DesktopItemType } from "../types";

export type DesktopContextType = {
  gridFragsQuantity: number;
  desktopItems: DesktopItemType[];
  setDesktopItems: Dispatch<SetStateAction<DesktopItemType[]>>;
  selectedDesktopItem: DesktopItemName | "";
  setSelectedDesktopItem: Dispatch<SetStateAction<DesktopItemName | "">>;
};

const desktopContextDefault = {
  gridFragsQuantity: 0,
  desktopItems: [],
  setDesktopItems: () => {},
  selectedDesktopItem: "",
  setSelectedDesktopItem: () => {},
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

  const [selectedDesktopItem, setSelectedDesktopItem] = useState<
    DesktopItemName | ""
  >("");

  return (
    <DesktopContext.Provider
      value={{
        gridFragsQuantity,
        desktopItems,
        setDesktopItems,
        selectedDesktopItem,
        setSelectedDesktopItem,
      }}>
      {children}
    </DesktopContext.Provider>
  );
}
