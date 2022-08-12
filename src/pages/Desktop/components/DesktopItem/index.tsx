import { DragEvent, useContext, useEffect, useRef, useState } from "react";
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
  const { openedDesktopApps, setOpenedDesktopApps, selectIcons } =
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

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    let rect = dragItem.current?.getBoundingClientRect();

    if (rect && selectIcons && selectIcons.currentPos && selectIcons.startPos) {
      const currentPos = selectIcons.currentPos;
      const startPos = selectIcons.startPos;

      const sx = Math.min(startPos.x, currentPos.x);
      const sy = Math.min(startPos.y, currentPos.y);
      const sw = Math.abs(startPos.x - currentPos.x);
      const sh = Math.abs(startPos.y - currentPos.y);

      const { x, y, width, height } = rect;

      if (x - sx < sw && sx - x < width && y - sy < sh && sy - y < height) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }
  }, [selectIcons]);

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
        {(selected || isSelected) && (
          <img src={item.icon} className='overlay' />
        )}
        {isShortcut && <img src={iconShortcut} className='shortcut' />}
      </div>

      <p className={selected || isSelected ? "selected" : ""}>{item.title}</p>
    </div>
  );
}
