import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import iconCalculator from "../../../assets/images/program-icons/windows-calculator.png";
import iconEmptyTrash from "../../../assets/images/program-icons/empty-trash.png";

import { DesktopItemId, DesktopItemType, DesktopAppType } from "../types";

export type DesktopContextType = {
  gridFragsQuantity: number;
  desktopItems: DesktopItemType[];
  setDesktopItems: Dispatch<SetStateAction<DesktopItemType[]>>;
  selectedDesktopItem: DesktopItemId | "";
  setSelectedDesktopItem: Dispatch<SetStateAction<DesktopItemId | "">>;
  openedDesktopApps: DesktopAppType[];
  setOpenedDesktopApps: Dispatch<SetStateAction<DesktopAppType[]>>;
};

const desktopContextDefault = {
  gridFragsQuantity: 0,
  desktopItems: [],
  setDesktopItems: () => {},
  selectedDesktopItem: "",
  setSelectedDesktopItem: () => {},
  openedDesktopApps: [],
  setOpenedDesktopApps: () => {},
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
      id: "calculator",
      title: "Calculadora",
      icon: iconCalculator,
      index: 0,
    },
    {
      id: "trash",
      title: "Lixeira",
      icon: iconEmptyTrash,
      index: gridFragsQuantity - 1,
    },
  ]);

  const [selectedDesktopItem, setSelectedDesktopItem] = useState<
    DesktopItemId | ""
  >("");

  const [openedDesktopApps, setOpenedDesktopApps] = useState<DesktopAppType[]>(
    []
  );

  return (
    <DesktopContext.Provider
      value={{
        gridFragsQuantity,
        desktopItems,
        setDesktopItems,
        selectedDesktopItem,
        setSelectedDesktopItem,
        openedDesktopApps,
        setOpenedDesktopApps,
      }}>
      {children}
    </DesktopContext.Provider>
  );
}
