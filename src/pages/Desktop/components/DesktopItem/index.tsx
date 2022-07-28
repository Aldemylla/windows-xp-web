import { DragEvent, useRef } from "react";

import iconCalculator from "../../../../assets/images/program-icons/windows-calculator.jpg";
import iconEmptyTrash from "../../../../assets/images/program-icons/empty-trash.png";
import iconShortcut from "../../../../assets/images/program-icons/shortcut.ico";

import { DesktopItemName } from "../../types";

import "./style.scss";

type DesktopItemProps = {
  itemName: DesktopItemName;
  selected: boolean;
  isShortcut?: boolean;
};

export default function DesktopItem({
  itemName,
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
  const item = itemTypes[itemName];

  const dragItem = useRef<HTMLDivElement>(null);

  function drag(ev: DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text", dragItem.current?.id || "");
  }

  return (
    <div
      className='desktop-item'
      draggable
      ref={dragItem}
      onDragStart={drag}
      id={itemName}>
      <div className='desktop-item--icon'>
        <img src={item.icon} />
        {selected && <img src={item.icon} className='overlay' />}
        {isShortcut && <img src={iconShortcut} className='shortcut' />}
      </div>

      <p className={selected ? "selected" : ""}>{item.title}</p>
    </div>
  );
}
