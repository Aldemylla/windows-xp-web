export type ScreenSize = {
  width: number;
  height: number;
};

export type DesktopIconId = "calculator" | "trash";
export type DesktopIconTitle = "Calculadora" | "Lixeira";

export type DesktopIconType = {
  id: DesktopIconId;
  title: DesktopIconTitle;
  icon: string;
  iconIndex: number;
};

export type DesktopAppType = {
  id: DesktopIconId;
  title: DesktopIconTitle;
  icon: string;
  appId: string;
  state: "default" | "maximized" | "minimized";
};

// SELECT ICONS
export type DesktopMouseCords = { x: number; y: number } | null;
export type DesktopReducerState = {
  selectedIcons: DesktopIconId[];
  startSelectPos: DesktopMouseCords;
  currentSelectPos: DesktopMouseCords;
};

export type DesktopReducerAction =
  | { type: "add_selected_icon" | "del_selected_icon"; payload: DesktopIconId }
  | {
      type: "start_select" | "update_pos";
      payload: DesktopMouseCords;
    }
  | { type: "end_select" | "reset_selection" };
