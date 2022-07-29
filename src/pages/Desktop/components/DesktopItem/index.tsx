import { DragEvent, useContext, useRef } from "react";
import { DesktopContext } from "../../contexts/DesktopContext";

import iconCalculator from "../../../../assets/images/program-icons/windows-calculator.jpg";
import iconEmptyTrash from "../../../../assets/images/program-icons/empty-trash.png";
import iconShortcut from "../../../../assets/images/program-icons/shortcut.ico";

import { DesktopAppType, DesktopItemType } from "../../types";

import "./style.scss";

type DesktopItemProps = {
  itemObj: DesktopItemType;
  selected: boolean;
  isShortcut?: boolean;
};

export default function DesktopItem({
  itemObj,
  selected,
  isShortcut,
}: DesktopItemProps) {
  const itemTypes = {
    calculator: {
      icon: iconCalculator,
      title: "Calculadora",
    },
    trash: {
      icon: iconEmptyTrash,
      title: "Lixeira",
    },
  };
  const item = itemTypes[itemObj.item];

  const { openedDesktopApps, setOpenedDesktopApps } =
    useContext(DesktopContext);
  const dragItem = useRef<HTMLDivElement>(null);

  function drag(ev: DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text", dragItem.current?.id || "");
  }

  function openDesktopApp() {
    const newItem: DesktopAppType = {
      item: itemObj.item,
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
      id={itemObj.item}>
      <div className='desktop-item--icon'>
        <img src={item.icon} />
        {selected && <img src={item.icon} className='overlay' />}
        {isShortcut && <img src={iconShortcut} className='shortcut' />}
      </div>

      <p className={selected ? "selected" : ""}>{item.title}</p>
    </div>
  );
}
