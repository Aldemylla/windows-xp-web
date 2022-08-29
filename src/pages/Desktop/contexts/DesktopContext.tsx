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
  DesktopIconId,
  DesktopIconType,
  DesktopAppType,
  DesktopReducerState,
  DesktopReducerAction,
  DesktopMouseCords,
} from "../types";

export type DesktopContextType = {
  desktopBreakdowns: number;
  desktopIcons: DesktopIconType[];
  setDesktopIcons: Dispatch<SetStateAction<DesktopIconType[]>>;
  draggingIcon: boolean;
  setDraggingIcon: Dispatch<SetStateAction<boolean>>;
  openedDesktopApps: DesktopAppType[];
  setOpenedDesktopApps: Dispatch<SetStateAction<DesktopAppType[]>>;
  desktopReducer: DesktopReducerState;
  dispatchDesktopReducer: Dispatch<DesktopReducerAction>;
  focusedApp: string;
  setFocusedApp: Dispatch<SetStateAction<string>>;
};

const desktopContextDefault = {
  desktopBreakdowns: 0,
  desktopItems: [],
  setDesktopItems: () => {},
  draggingIcon: false,
  setDraggingIcon: () => {},
  openedDesktopApps: [],
  setOpenedDesktopApps: () => {},
  desktopReducer: {},
  dispatchDesktopReducer: () => {},
  focusedApp: "",
  setFocusedApp: () => {},
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
  // Size and number of divisions of screen

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

  const desktopBreakdowns =
    Math.floor(screenSize.width / 80) *
    Math.floor((screenSize.height - 31) / 80);

  // States of icons and apps

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconType[]>([
    {
      id: "calculator",
      title: "Calculadora",
      icon: iconCalculator,
      iconIndex: 0,
    },
    {
      id: "trash",
      title: "Lixeira",
      icon: iconEmptyTrash,
      iconIndex: desktopBreakdowns - 1,
    },
  ]);

  const [draggingIcon, setDraggingIcon] = useState(false);

  const [openedDesktopApps, setOpenedDesktopApps] = useState<DesktopAppType[]>(
    []
  );
  const [focusedApp, setFocusedApp] = useState("");

  // Reducer

  const initialStateDesktopReducer = {
    selectedIcons: [] as DesktopIconId[],
    startSelectPos: null as DesktopMouseCords,
    currentSelectPos: null as DesktopMouseCords,
  };

  function reducerDesktop(
    state: DesktopReducerState,
    action: DesktopReducerAction
  ) {
    switch (action.type) {
      case "add_selected_icon":
        return {
          ...state,
          selectedIcons: state.currentSelectPos
            ? [...state.selectedIcons, action.payload]
            : [action.payload],
        };
      case "del_selected_icon":
        return {
          ...state,
          selectedIcons: state.selectedIcons.filter(
            (icon) => icon !== action.payload
          ),
        };
      case "start_select":
        return { ...state, startSelectPos: action.payload };
      case "update_pos":
        return { ...state, currentSelectPos: action.payload };
      case "end_select":
        return {
          ...initialStateDesktopReducer,
          selectedIcons: state.selectedIcons,
        };
      case "reset_selection":
        return initialStateDesktopReducer;

      default:
        throw new Error(`Unknown action type`);
    }
  }

  const [desktopReducer, dispatchDesktopReducer] = useReducer(
    reducerDesktop,
    initialStateDesktopReducer
  );

  return (
    <DesktopContext.Provider
      value={{
        desktopBreakdowns,
        desktopIcons,
        setDesktopIcons,
        draggingIcon,
        setDraggingIcon,
        openedDesktopApps,
        setOpenedDesktopApps,
        desktopReducer,
        dispatchDesktopReducer,
        focusedApp,
        setFocusedApp,
      }}>
      {children}
    </DesktopContext.Provider>
  );
}
