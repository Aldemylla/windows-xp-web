export type DesktopItemName = "calculator" | "trash";

export type DesktopItemType = {
  item: DesktopItemName;
  index: number;
};

export type DesktopAppType = {
  item: DesktopItemName;
  state: "closed" | "opened" | "maximized" | "minimized" | "unfocused";
};
