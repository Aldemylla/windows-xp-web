import { DragEvent, useContext, useEffect, useRef } from "react";
import { DesktopContext } from "../../contexts/DesktopContext";

import iconShortcut from "../../../../assets/images/program-icons/shortcut.ico";

import { DesktopAppType, DesktopIconType } from "../../types";

import "./style.scss";

type DesktopItemProps = {
  item: DesktopIconType;
  selected: boolean;
  isShortcut?: boolean;
};

export default function DesktopItem({
  item,
  selected,
  isShortcut,
}: DesktopItemProps) {
  const {
    setDraggingIcon,
    openedDesktopApps,
    setOpenedDesktopApps,
    setFocusedApp,
    desktopReducer,
    dispatchDesktopReducer,
  } = useContext(DesktopContext);
  const dragItem = useRef<HTMLDivElement>(null);

  function drag(ev: DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text", dragItem.current?.id || "");
    setDraggingIcon(true);
  }

  function openDesktopApp() {
    dispatchDesktopReducer({ type: "reset_selection" });

    const newItem: DesktopAppType = {
      id: item.id,
      title: item.title,
      icon: item.icon,
      state: "default",
      appId: `${Date.now()}`,
    };
    setOpenedDesktopApps([...openedDesktopApps, newItem]);
    setFocusedApp(newItem.appId);
  }

  useEffect(() => {
    let rect = dragItem.current?.getBoundingClientRect();

    const inSelectedList = desktopReducer.selectedIcons.includes(item.id);

    if (
      rect &&
      desktopReducer &&
      desktopReducer.startSelectPos &&
      desktopReducer.currentSelectPos
    ) {
      const currentPos = desktopReducer.currentSelectPos;
      const startPos = desktopReducer.startSelectPos;

      const selectionPosX = Math.min(startPos.x, currentPos.x);
      const selectionPosY = Math.min(startPos.y, currentPos.y);
      const selectionWidth = Math.abs(startPos.x - currentPos.x);
      const selectionHeight = Math.abs(startPos.y - currentPos.y);

      const { x, y, width, height } = rect;

      if (
        x - selectionPosX < selectionWidth &&
        selectionPosX - x < width &&
        y - selectionPosY < selectionHeight &&
        selectionPosY - y < height
      ) {
        if (!inSelectedList) {
          dispatchDesktopReducer({
            type: "add_selected_icon",
            payload: item.id,
          });
        }
      } else if (inSelectedList) {
        dispatchDesktopReducer({
          type: "del_selected_icon",
          payload: item.id,
        });
      }
    }
  }, [desktopReducer]);

  function selectItemHandler() {
    if (item && !selected) {
      dispatchDesktopReducer({
        type: "add_selected_icon",
        payload: item.id,
      });
    }
  }

  return (
    <div
      className='desktop-item'
      draggable
      ref={dragItem}
      onDragStart={drag}
      onDoubleClick={openDesktopApp}
      onClick={selectItemHandler}
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
