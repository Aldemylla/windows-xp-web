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
