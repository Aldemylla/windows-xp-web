import { DragEvent, useContext, useRef } from "react";
import { DesktopContext } from "../../contexts/DesktopContext";

import iconShortcut from "../../../../assets/images/program-icons/shortcut.ico";

import { DesktopAppType, DesktopItemType } from "../../types";

import "./style.scss";

type DesktopItemProps = {
  item: DesktopItemType;
  selected: boolean;
  isShortcut?: boolean;
};

export default function DesktopItem({
  item,
  selected,
  isShortcut,
}: DesktopItemProps) {
  const { openedDesktopApps, setOpenedDesktopApps } =
    useContext(DesktopContext);
  const dragItem = useRef<HTMLDivElement>(null);

  function drag(ev: DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text", dragItem.current?.id || "");
  }

  function openDesktopApp() {
    const newItem: DesktopAppType = {
      id: item.id,
      title: item.title,
      icon: item.icon,
      state: "opened",
    };
    setOpenedDesktopApps([...openedDesktopApps, newItem]);
  }

  return (
    <div
      className='desktop-item'
      draggable
      ref={dragItem}
      onDragStart={drag}
      onDoubleClick={openDesktopApp}
      id={item.id}>
      <div className='desktop-item--icon'>
        <img src={item.icon} />
        {selected && <img src={item.icon} className='overlay' />}
        {isShortcut && <img src={iconShortcut} className='shortcut' />}
      </div>

      <p className={selected ? "selected" : ""}>{item.title}</p>
    </div>
  );
}
