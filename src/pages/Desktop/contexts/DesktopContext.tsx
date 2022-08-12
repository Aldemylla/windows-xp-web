import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";

import iconCalculator from "../../../assets/images/program-icons/windows-calculator.png";
import iconEmptyTrash from "../../../assets/images/program-icons/empty-trash.png";

import {
  DesktopItemId,
  DesktopItemType,
  DesktopAppType,
  StateSelectIcons,
  ActionSelectIcons,
  MouseCordsSelectIcons,
} from "../types";

export type DesktopContextType = {
  gridFragsQuantity: number;
  desktopItems: DesktopItemType[];
  setDesktopItems: Dispatch<SetStateAction<DesktopItemType[]>>;
  selectedDesktopItem: DesktopItemId | "";
  setSelectedDesktopItem: Dispatch<SetStateAction<DesktopItemId | "">>;
  openedDesktopApps: DesktopAppType[];
  setOpenedDesktopApps: Dispatch<SetStateAction<DesktopAppType[]>>;
  selectIcons: StateSelectIcons;
  dispatchSelectIcons: Dispatch<ActionSelectIcons>;
};

const desktopContextDefault = {
  gridFragsQuantity: 0,
  desktopItems: [],
  setDesktopItems: () => {},
  selectedDesktopItem: "",
  setSelectedDesktopItem: () => {},
  openedDesktopApps: [],
  setOpenedDesktopApps: () => {},
  selectIcons: {},
  dispatchSelectIcons: () => {},
};

export const DesktopContext = createContext<DesktopContextType>(
  // @ts-ignore: Incompatible type error
  desktopContextDefault
);

export default function DesktopContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const initialStateSelectIcons = {
    startPos: null as MouseCordsSelectIcons,
    currentPos: null as MouseCordsSelectIcons,
  };
  function reducerSelectIcons(
    state: StateSelectIcons,
    action: ActionSelectIcons
  ) {
    switch (action.type) {
      case "start_select":
        return { ...state, startPos: action.payload };
      case "update_pos":
        return { ...state, currentPos: action.payload };
      case "end_select":
        return initialStateSelectIcons;

      default:
        throw new Error(`Unknown action type`);
    }
  }
  const [selectIcons, dispatchSelectIcons] = useReducer(
    reducerSelectIcons,
    initialStateSelectIcons
  );

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
        selectIcons,
        dispatchSelectIcons,
      }}>
      {children}
    </DesktopContext.Provider>
  );
}
