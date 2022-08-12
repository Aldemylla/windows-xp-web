export type DesktopItemId = "calculator" | "trash";
export type DesktopItemTitle = "Calculadora" | "Lixeira";

export type DesktopItemType = {
  id: DesktopItemId;
  title: DesktopItemTitle;
  icon: string;
  index: number;
};

export type DesktopAppType = {
  id: DesktopItemId;
  title: DesktopItemTitle;
  icon: string;
  state: "closed" | "opened" | "maximized" | "minimized" | "unfocused";
};

// SELECT ICONS
export type MouseCordsSelectIcons = { x: number; y: number } | null;
export type StateSelectIcons = {
  startPos: MouseCordsSelectIcons;
  currentPos: MouseCordsSelectIcons;
};

export type ActionSelectIcons =
  | {
      type: "start_select" | "update_pos";
      payload: MouseCordsSelectIcons;
    }
  | { type: "end_select" };
