import { DragEvent, useContext, useEffect, useRef, useState } from "react";

import DesktopItem from "../DesktopItem";

import {
  DesktopContext,
  DesktopContextType,
} from "../../contexts/DesktopContext";

import { DesktopIconId, DesktopIconType } from "../../types";

type DesktopGridFragProps = {
  gridIndex: number;
};

export default function DesktopGridFrag({ gridIndex }: DesktopGridFragProps) {
  const {
    setDraggingIcon,
    desktopIcons,
    setDesktopIcons,
    desktopReducer,
    dispatchDesktopReducer,
    setFocusedApp,
  } = useContext(DesktopContext) as DesktopContextType;

  function allowDrop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  const [objectDesktopItem, setObjectDesktopItem] = useState<DesktopIconType>();

  useEffect(() => {
    setObjectDesktopItem(
      desktopIcons.find((item) => item.iconIndex === gridIndex)
    );
  }, [desktopIcons]);

  const dragItem = useRef<HTMLDivElement>(null);

  function drop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    const draggableId = ev.dataTransfer.getData("text") as DesktopIconId;

    const dragItemObj = desktopIcons.filter(
      (item) => item.id === draggableId
    )[0];

    if (!objectDesktopItem && !!dragItemObj) {
      const newDesktopIcons = desktopIcons.filter(
        (item) => item.id !== draggableId
      );

      setDesktopIcons([
        ...newDesktopIcons,
        {
          id: draggableId,
          title: dragItemObj.title,
          icon: dragItemObj.icon,
          iconIndex: gridIndex,
        },
      ]);
    }

    setDraggingIcon(false);
    dispatchDesktopReducer({ type: "end_select" });
    ev.dataTransfer.clearData();
  }

  function resetSelection() {
    if (!objectDesktopItem) {
      dispatchDesktopReducer({ type: "reset_selection" });
      setFocusedApp("");
    }
  }

  return (
    <div
      id={`frag-${gridIndex}`}
      className='desktop-grid__frag'
      ref={dragItem}
      onDrop={drop}
      onDragOver={allowDrop}
      onMouseDown={resetSelection}>
      {objectDesktopItem && (
        <DesktopItem
          item={objectDesktopItem}
          selected={desktopReducer.selectedIcons.includes(objectDesktopItem.id)}
        />
      )}
    </div>
  );
}
