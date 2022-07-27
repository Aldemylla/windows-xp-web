import { DragEvent, useRef } from "react";

import iconCalculator from "../../../../assets/images/program-icons/windows-calculator.jpg";
import iconEmptyTrash from "../../../../assets/images/program-icons/empty-trash.png";
import iconShortcut from "../../../../assets/images/program-icons/shortcut.ico";

import { DesktopItemName } from "../../types";

import "./style.scss";

type DesktopItemProps = {
  itemType: DesktopItemName;
  isShortcut?: boolean;
};

export default function DesktopItem({
  itemType,
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

  const itemSelected = false;

  const item = itemTypes[itemType];

  const dragItem = useRef<HTMLDivElement>(null);

  function drag(ev: DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text", dragItem.current?.id || "");
  }

  return (
    <div
      className='desktop-item'
      draggable
      onDragStart={drag}
      ref={dragItem}
      id={itemType}>
      <div className='desktop-item--icon'>
        <img src={item.icon} />
        {itemSelected && <img src={item.icon} className='overlay' />}
        {isShortcut && <img src={iconShortcut} className='shortcut' />}
      </div>

      <p className={itemSelected ? "selected" : ""}>{item.title}</p>
    </div>
  );
}
